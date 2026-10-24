import { App } from "./app.js"

export class Display {
    static GRID_STRIP = 25
    static GRID_STRIP_COLOR = 'rgba(255, 255, 255, .2)'
    static GRID_COLOR = 'rgba(255, 255, 255, .1)'
    static CURSOR_COLOR = 'rgba(255, 255, 255, .4)'
    static RENDER_DELAY = 60

    /** @type {App} */
    #app

    /** @type {HTMLElement} */
    #display = document.getElementById('canvas')

    /** @type {HTMLElement} */
    #displayBuffer = document.createElement('canvas')

    /** @type {CanvasRenderingContext2D} */
    #displayContext

    /** @type {CanvasRenderingContext2D} */
    #displayBufferContext

    /** @type {number} */
    #width

    /** @type {number} */
    #height

    /** @type {number?} */
    #currentMouseRow = null

    /** @type {number?} */
    #currentMouseCol = null

    #statusLabel = document.getElementById('app-status')
    #mouseLeave = true
    #showGrid = true

    /**
     * @param {App} app
     */
    constructor(app) {
        this.#app = app
        this.#displayContext = this.#display.getContext('2d')
        this.#displayBufferContext = this.#displayBuffer.getContext('2d')
        this.resize(this.#app.rows, this.#app.cols, this.#app.tileSize)
        this.#startRenderInterval()
        this.#setupListeners()
    }

    /**
     * @param {number} rows 
     * @param {number} cols 
     */
    resize(rows, cols) {
        this.#width = cols * this.#app.tileSize
        this.#height = rows * this.#app.tileSize
        this.#display.setAttribute('width', this.#width)
        this.#display.setAttribute('height', this.#height)
        this.#displayBuffer.setAttribute('width', this.#width)
        this.#displayBuffer.setAttribute('height', this.#height)
    }

    #startRenderInterval() {
        setInterval(() => {
            this.#render()
        }, Display.RENDER_DELAY)
    }

    #render() {
        this.#clear()
        this.#renderAutomata()
        this.#renderGrid()
        this.#renderStatus()
        this.#renderCursor()
        this.#renderTool()
        this.#flush()
    }

    #flush() {
        this.#displayContext.drawImage(this.#displayBuffer, 0, 0)
    }

    #clear() {
        this.#displayBufferContext.clearRect(0, 0, this.#width, this.#height)
        this.#displayContext.clearRect(0, 0, this.#width, this.#height)
    }

    #renderTool() {
        if (!this.#app.currentTool) {
            return
        }
        this.#displayBufferContext.fillStyle = Display.CURSOR_COLOR
        this.#app.currentTool.renderPreview(this.#displayBufferContext)
    }

    #renderGrid() {
        if (!this.#showGrid) {
            return
        }
        for (let col = 0; col <= this.#width; col += this.#app.tileSize) {
            this.#displayBufferContext.strokeStyle = col % Display.GRID_STRIP == 0 ? Display.GRID_STRIP_COLOR : Display.GRID_COLOR
            this.#displayBufferContext.beginPath()
            this.#displayBufferContext.moveTo(col, 0)
            this.#displayBufferContext.lineTo(col, this.#height)
            this.#displayBufferContext.stroke()
        }
        for (let row = 0; row <= this.#height; row += this.#app.tileSize) {
            this.#displayBufferContext.strokeStyle = row % Display.GRID_STRIP == 0 ? Display.GRID_STRIP_COLOR : Display.GRID_COLOR
            this.#displayBufferContext.beginPath()
            this.#displayBufferContext.moveTo(0, row)
            this.#displayBufferContext.lineTo(this.#width, row)
            this.#displayBufferContext.stroke()
        }
    }

    #renderAutomata() {
        if (!this.#app.automata) {
            return
        }
        this.#app.automata.render(this.#displayBufferContext, this.#app.tileSize)
    }

    #renderCursor() {
        if (this.#currentMouseRow === null || this.#currentMouseCol === null) {
            return
        }
        if (this.#mouseLeave) {
            return
        }

        this.#displayBufferContext.fillStyle = Display.CURSOR_COLOR
        this.#displayBufferContext.fillRect(this.#currentMouseCol, this.#currentMouseRow, this.#app.tileSize, this.#app.tileSize)
    }

    #renderStatus() {
        if (!this.#app.automata) {
            return
        }
        let text = ''
        text += `Automata: ${this.#app.automata.name} | `
        text += `State: ${this.#app.currentStateName} | `
        text += `Generation: ${this.#app.automata.generationCount}`
        const additionalStatusInfo = this.#app.automata.additionalStatusInfo
        if (additionalStatusInfo !== null) {
            text += ' | ' + additionalStatusInfo
        }
        this.#statusLabel.innerHTML = text
    }

    /**
     * @param {number} pos
     * @returns {number}
     */
    snapToGrid(pos) {
        return pos - (pos % this.#app.tileSize)
    }

    /**
     * @param {MouseEvent} evt 
     */
    #handleMouseMove(evt) {
        this.#mouseLeave = false
        this.#currentMouseRow = this.snapToGrid(evt.offsetY)
        this.#currentMouseCol = this.snapToGrid(evt.offsetX)
        const row = this.#app.translateCoordinateToGrid(evt.offsetY)
        const col = this.#app.translateCoordinateToGrid(evt.offsetX)
        this.#app.currentTool.onMouseMove(row, col)
    }

    /**
     * @param {MouseEvent} evt 
     */
    #handleMouseDown(evt) {
        const row = this.#app.translateCoordinateToGrid(evt.offsetY)
        const col = this.#app.translateCoordinateToGrid(evt.offsetX)
        this.#app.currentTool.onMousePressed(row, col)
    }

    /**
     * @param {MouseEvent} evt 
     */
    #handleMouseUp(evt) {
        const row = this.#app.translateCoordinateToGrid(evt.offsetY)
        const col = this.#app.translateCoordinateToGrid(evt.offsetX)
        this.#app.currentTool.onMouseReleased(row, col)
    }

    #handleMouseLeave() {
        this.#mouseLeave = true
        this.#app.currentTool.onMouseLeave()
    }

    #setupListeners() {
        this.#display.addEventListener('mousemove', evt => this.#handleMouseMove(evt))
        this.#display.addEventListener('mousedown', evt => this.#handleMouseDown(evt))
        this.#display.addEventListener('mouseup', evt => this.#handleMouseUp(evt))
        this.#display.addEventListener('mouseleave', () => this.#handleMouseLeave())
    }

    get showGrid() {
        return this.#showGrid
    }

    set showGrid(show) {
        this.#showGrid = show
    }
}