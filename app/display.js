import { App } from "./app.js"

export class Display {

    /** @type {App} */
    #app

    #canvas = document.getElementById('canvas')
    #buffer = document.createElement('canvas')
    #statusLabel = document.getElementById('app-status')

    /** @type {CanvasRenderingContext2D} */
    #canvasContext = this.#canvas.getContext('2d')

    /** @type {CanvasRenderingContext2D} */
    #bufferContext = this.#buffer.getContext('2d')

    /** @type {number} */
    #width

    /** @type {number} */
    #height

    #renderDelay = 60
    #gridStep = 25
    #gridColor = 'rgba(255, 255, 255, .2)'
    #gridStepColor = 'rgba(255, 255, 255, .4)'



    /**
     * @param {App} app
     * @param {number} rows 
     * @param {number} cols 
     */
    constructor(app) {
        this.#app = app
        this.resize(this.#app.rows, this.#app.cols)
        this.#startRenderInterval()
    }

    /**
     * @param {number} rows 
     * @param {number} cols 
     * @param {number} tileSize 
     */
    resize(rows, cols, tileSize) {
        this.#width = cols * tileSize
        this.#height = rows * tileSize
        this.#canvas.setAttribute('width', this.#width)
        this.#canvas.setAttribute('height', this.#height)
        this.#buffer.setAttribute('width', this.#width)
        this.#buffer.setAttribute('height', this.#height)
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
        this.#flush()
    }

    #flush() {
        this.#canvasContext.drawImage(this.#buffer, 0, 0)
    }

    #clear() {
        this.#bufferContext.clearRect(0, 0, this.#width, this.#height)
    }

    #renderGrid() {
        for (let col = 0; col < this.#width; col += this.#app.tileSize) {
            this.#bufferContext.strokeStyle = col % this.#gridStep == 0 ? this.#gridStepColor : this.#gridColor
            this.#bufferContext.beginPath()
            this.#bufferContext.moveTo(col, 0)
            this.#bufferContext.lineTo(col, this.#height)
            this.#bufferContext.stroke()
        }
        for (let row = 0; row < this.#height; row += this.#app.tileSize) {
            this.#bufferContext.strokeStyle = row % this.#gridStep == 0 ? this.#gridStepColor : this.#gridColor
            this.#bufferContext.beginPath()
            this.#bufferContext.moveTo(0, row)
            this.#bufferContext.lineTo(this.#width, row)
            this.#bufferContext.stroke()
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
                this.#bufferContext.fillStyle = color
                this.#bufferContext.fillRect(
                    col * this.#app.tileSize, row * this.#app.tileSize,
                    this.#app.tileSize, this.#app.tileSize
                )
            }
        }
    }

    #renderCursor() {

    }

    #renderStatus() {
        let text = ''
        text += `Automata: ${this.#app.automata.rule?.name} (${this.#app.automata.rule?.notation}) | `
        text += `State: ${this.#app.editor.currentStateName} | `
        text += `Generation ${this.#app.automata.generationCount}`
        this.#statusLabel.innerHTML = text
    }
}