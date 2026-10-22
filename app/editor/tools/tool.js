import { App } from "../../app"
import { AppError } from "../../app-error"
import { Editor } from "../editor"

export class Tool {
    /** @type {App} */
    #app

    /** @type {Editor} */
    #editor

    /**
     * @param {App} app 
     * @param {Editor} editor 
     */
    constructor(app, editor) {
        this.#app = app
        this.#editor = editor
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

    get editor() {
        return this.#editor
    }
}