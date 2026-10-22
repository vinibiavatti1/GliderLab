import { Tool } from "./tool"

/** @implements {Tool} */
export class PencilTool extends Tool {
    #mousePressed = false

    /**
     * @param {App} app 
     * @param {Editor} editor 
     */
    constructor(app, editor) {
        super(app, editor)
    }

    /**
     * @param {number} row 
     * @param {number} col 
     */
    onMousePressed(row, col) {
        this.#mousePressed = true
    }

    /**
     * @param {number} row 
     * @param {number} col 
     */
    onMouseMove(row, col) {
        if (!this.#mousePressed) {
            return
        }
        const automataRow = this.app.translateCoordinateToAutomata(row)
        const automataCol = this.app.translateCoordinateToAutomata(col)
        this.app.automata.setValue(automataRow, automataCol, 1)
    }

    /**
     * @param {number} row 
     * @param {number} col 
     */
    onMouseReleased(row, col) {
        this.#mousePressed = false
    }

    /**
     * @param {CanvasRenderingContext2D} displayBufferContext
     */
    renderPreview(displayBufferContext) {

    }
}