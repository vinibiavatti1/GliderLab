import { Tool } from "./tool.js"

/** @implements {Tool} */
export class RectFillTool extends Tool {
    #mousePressed = false

    /** @type {number?} */
    #mouseSrcRow = null

    /** @type {number?} */
    #mouseSrcCol = null

    /** @type {number?} */
    #mouseDstRow = null

    /** @type {number?} */
    #mouseDstCol = null

    /**
     * @param {App} app 
     */
    constructor(app) {
        super(app)
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
        this.app.saveSnapshot()
        const cells = this.#getRectFillCells(this.#mouseSrcRow, this.#mouseSrcCol, this.#mouseDstRow, this.#mouseDstCol);
        for (const [col, row] of cells) {
            this.app.automata.setValue(row, col, this.app.currentCellValue)
        }
        this.#mouseSrcRow = null
        this.#mouseSrcCol = null
        this.#mouseDstRow = null
        this.#mouseDstCol = null
    }

    onMouseLeave() {

    }

    /**
     * @param {CanvasRenderingContext2D} displayBufferContext
     */
    renderPreview(displayBufferContext) {
        if (!this.#mousePressed) {
            return
        }
        if (this.#mouseSrcRow === null || this.#mouseSrcCol === null) {
            return
        }
        if (this.#mouseDstRow === null || this.#mouseDstCol === null) {
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