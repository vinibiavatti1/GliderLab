import { App } from "./app.js"
import { GameOfLife } from "./automata/game-of-life/game-of-life.js"

export class Display {
    /** @type {App} */
    #app

    /** @type {HTMLElement} */
    #display = document.getElementById('canvas')

    /** @type {HTMLElement} */
    #displayBuffer = document.createElement('canvas')

    /** @type {CanvasRenderingContext2D} */
    #displayContext = this.#display.getContext('2d')

    /** @type {CanvasRenderingContext2D} */
    #displayBufferContext = this.#displayBuffer.getContext('2d')

    /** @type {number} */
    #width

    /** @type {number} */
    #height

    /** @type {number?} */
    #currentMouseRow = null

    /** @type {number?} */
    #currentMouseCol = null

    #renderDelay = 60
    #gridStep = 25
    #gridColor = 'rgba(255, 255, 255, .2)'
    #gridStepColor = 'rgba(255, 255, 255, .4)'
    #cursorColor = 'rgba(255, 255, 255, .5)'
    #statusLabel = document.getElementById('app-status')
    #mouseLeave = true

    /**
     * @param {App} app
     */
    constructor(app) {
        this.#app = app
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
        }, this.#renderDelay)
    }

    #render() {
        this.#clear()
        this.#renderAutomata()
        this.#renderGrid()
        this.#renderStatus()
        this.#renderCursor()
        if (this.#app.currentTool) {
            this.#displayBufferContext.fillStyle = this.#cursorColor
            this.#app.currentTool.renderPreview(this.#displayBufferContext)
        }
        this.#flush()
    }

    #flush() {
        this.#displayContext.drawImage(this.#displayBuffer, 0, 0)
    }

    #clear() {
        this.#displayBufferContext.clearRect(0, 0, this.#width, this.#height)
    }

    #renderGrid() {
        for (let col = 0; col <= this.#width; col += this.#app.tileSize) {
            this.#displayBufferContext.strokeStyle = col % this.#gridStep == 0 ? this.#gridStepColor : this.#gridColor
            this.#displayBufferContext.beginPath()
            this.#displayBufferContext.moveTo(col, 0)
            this.#displayBufferContext.lineTo(col, this.#height)
            this.#displayBufferContext.stroke()
        }
        for (let row = 0; row <= this.#height; row += this.#app.tileSize) {
            this.#displayBufferContext.strokeStyle = row % this.#gridStep == 0 ? this.#gridStepColor : this.#gridColor
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
        const data = this.#app.automata.data
        for (let row = 0; row < this.#app.rows; row++) {
            for (let col = 0; col < this.#app.cols; col++) {
                const value = data[row][col]
                const color = this.#app.getValueColor(value)
                this.#displayBufferContext.fillStyle = color
                this.#displayBufferContext.fillRect(
                    col * this.#app.tileSize, row * this.#app.tileSize,
                    this.#app.tileSize, this.#app.tileSize
                )
            }
        }
    }

    #renderCursor() {
        if (this.#currentMouseRow === null || this.#currentMouseCol === null) {
            return
        }
        if (this.#mouseLeave) {
            return
        }
        this.#displayBufferContext.fillStyle = this.#cursorColor
        this.#displayBufferContext.fillRect(this.#currentMouseCol, this.#currentMouseRow, this.#app.tileSize, this.#app.tileSize)
    }

    #renderStatus() {
        let text = ''
        text += `Automata: ${this.#app.automata.name} | `
        text += `State: ${this.#app.currentStateName} | `
        text += `Generation: ${this.#app.automata.generationCount}`
        if (this.#app.automata instanceof GameOfLife) {
            text += ` | Population: ${this.#app.automata.population}`
        }
        this.#statusLabel.innerHTML = text
    }

    /**
     * @param {number} pos
     * @returns 
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
}