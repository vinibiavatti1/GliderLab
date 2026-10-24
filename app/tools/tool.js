import { App } from "../app.js"
import { AppError } from "../app-error.js"

export class Tool {
    /** @type {App} */
    #app

    /**
     * @param {App} app 
     */
    constructor(app) {
        this.#app = app
    }

    /**
     * @virtual
     * @param {number} row 
     * @param {number} col 
     */
    onMousePressed(row, col) {
    }

    /**
     * @virtual
     * @param {number} row 
     * @param {number} col 
     */
    onMouseMove(row, col) {
    }

    /**
     * @virtual
     * @param {number} row 
     * @param {number} col 
     */
    onMouseReleased(row, col) {
    }

    /**
     * @virtual
     */
    onMouseLeave() {
    }

    /**
     * @virtual
     * @param {CanvasRenderingContext2D} displayBufferContext
     */
    renderPreview(displayBufferContext) {
    }

    get app() {
        return this.#app
    }
}