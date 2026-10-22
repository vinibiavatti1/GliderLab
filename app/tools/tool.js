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
     * @abstract
     * @param {number} row 
     * @param {number} col 
     */
    onMousePressed(row, col) {
        throw new AppError('Not implemented')
    }

    /**
     * @abstract
     * @param {number} row 
     * @param {number} col 
     */
    onMouseMove(row, col) {
        throw new AppError('Not implemented')
    }

    /**
     * @abstract
     * @param {number} row 
     * @param {number} col 
     */
    onMouseReleased(row, col) {
        throw new AppError('Not implemented')
    }

    onMouseLeave() {
        throw new AppError('Not implemented')
    }

    /**
     * @abstract
     * @param {CanvasRenderingContext2D} displayBufferContext
     */
    renderPreview(displayBufferContext) {
        throw new AppError('Not implemented')
    }

    get app() {
        return this.#app
    }
}