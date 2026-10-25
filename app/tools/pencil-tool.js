import { Tool } from "./tool.js"

/** @implements {Tool} */
export class PencilTool extends Tool {
    /** @type {App} */
    #app

    #mousePressed = false

    /**
     * @param {App} app 
     */
    constructor(app) {
        super()
        this.#app = app
    }

    /**
     * @param {number} row 
     * @param {number} col 
     */
    onMouseLeftPressed(row, col) {
        this.#app.saveSnapshot()
        this.#mousePressed = true
    }

    /**
     * @param {number} row 
     * @param {number} col 
     */
    onMouseRightPressed(row, col) { }

    /**
     * @param {number} row 
     * @param {number} col 
     */
    onMouseMove(row, col) {
        if (!this.#mousePressed) {
            return
        }
        this.#app.automata.setValue(row, col, this.#app.currentCellValue)
    }

    /**
     * @param {number} row 
     * @param {number} col 
     */
    onMouseReleased(row, col) {
        this.#mousePressed = false
        this.#app.automata.setValue(row, col, this.#app.currentCellValue)
    }

    onMouseLeave() {
        this.#mousePressed = false
    }

    /**
     * @param {CanvasRenderingContext2D} displayBufferContext
     */
    renderPreview(displayBufferContext) { }
}