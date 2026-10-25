import { AppError } from "../app-error.js"

export class Tool {
    /**
     * @abstract
     * @param {number} row 
     * @param {number} col 
     */
    onMouseLeftPressed(row, col) {
        throw new AppError('not implemented')
    }

    /**
     * @abstract
     * @param {number} row 
     * @param {number} col 
     */
    onMouseRightPressed(row, col) {
        throw new AppError('not implemented')
    }

    /**
     * @abstract
     * @param {number} row 
     * @param {number} col 
     */
    onMouseMove(row, col) {
        throw new AppError('not implemented')
    }

    /**
     * @abstract
     * @param {number} row 
     * @param {number} col 
     */
    onMouseReleased(row, col) {
        throw new AppError('not implemented')
    }

    /**
     * @abstract
     */
    onMouseLeave() {
        throw new AppError('not implemented')
    }

    /**
     * @abstract
     * @param {CanvasRenderingContext2D} displayBufferContext
     */
    renderPreview(displayBufferContext) {
        throw new AppError('not implemented')
    }
}