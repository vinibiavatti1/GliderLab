import { Tool } from "./tool"

/** @implements {Tool} */
export class RectFillTool extends Tool {
    #mousePressed = true
    #mouseSrcRow = 0
    #mouseSrcCol = 0
    #mouseDstRow = 0
    #mouseDstCol = 0

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
        this.#mouseSrcRow = row
        this.#mouseSrcCol = col
    }

    /**
     * @param {number} row 
     * @param {number} col 
     */
    onMouseMove(row, col) {
        if (!this.#mousePressed) {
            return
        }
        this.#mouseDstRow = row
        this.#mouseDstCol = col
    }

    /**
     * @param {number} row 
     * @param {number} col 
     */
    onMouseReleased(row, col) {
        this.#mousePressed = false
        const srcRow = this.app.translateCoordinateToAutomata(this.#mouseSrcRow)
        const srcCol = this.app.translateCoordinateToAutomata(this.#mouseSrcCol)
        const dstRow = this.app.translateCoordinateToAutomata(this.#mouseDstRow)
        const dstCol = this.app.translateCoordinateToAutomata(this.#mouseDstCol)
        const cells = this.#getRectFillCells(srcCol, srcRow, dstCol, dstRow);
        for (const [col, row] of cells) {
            this.app.automata.setValue(row, col, 1)
        }
    }

    /**
     * @param {CanvasRenderingContext2D} displayBufferContext
     */
    renderPreview(displayBufferContext) {
        if (!this.#mousePressed) {
            return
        }
        const cells = this.#getRectFillCells(this.#mouseSrcRow, this.#mouseSrcCol, this.#mouseDstRow, this.#mouseDstCol);
        for (const [col, row] of cells) {
            displayBufferContext.fillRect(
                col * this.app.tileSize,
                row * this.app.tileSize,
                this.app.tileSize,
                this.app.tileSize
            );
        }
    }

    /**
     * @param {number} srcCol 
     * @param {number} srcRow 
     * @param {number} dstCol 
     * @param {number} dstRow 
     * @returns {number[][]}
     */
    #getRectFillCells(srcRow, srcCol, dstRow, dstCol) {
        const points = [];
        const minCol = Math.min(srcCol, dstCol);
        const maxCol = Math.max(srcCol, dstCol);
        const minRow = Math.min(srcRow, dstRow);
        const maxRow = Math.max(srcRow, dstRow);
        for (let row = minRow; row <= maxRow; row++) {
            for (let col = minCol; col <= maxCol; col++) {
                points.push([col, row]);
            }
        }
        return points;
    }
}