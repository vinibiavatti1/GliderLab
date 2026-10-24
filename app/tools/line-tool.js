import { Tool } from "./tool.js"

/** @implements {Tool} */
export class LineTool extends Tool {
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
        if (this.#mouseSrcRow === null || this.#mouseSrcCol === null) {
            return
        }
        this.#mouseDstRow = row
        this.#mouseDstCol = col
        this.app.saveSnapshot()
        const cells = this.#getBresenhamLine(this.#mouseSrcRow, this.#mouseSrcCol, this.#mouseDstRow, this.#mouseDstCol);
        for (const [c, r] of cells) {
            this.app.automata.setValue(r, c, this.app.currentCellValue)
        }
        this.#mouseSrcRow = null
        this.#mouseSrcCol = null
        this.#mouseDstRow = null
        this.#mouseDstCol = null
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
        const cells = this.#getBresenhamLine(this.#mouseSrcRow, this.#mouseSrcCol, this.#mouseDstRow, this.#mouseDstCol);
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
     * Bresenham's Line Algorithm
     * @param {number} srcCol 
     * @param {number} srcRow 
     * @param {number} dstCol 
     * @param {number} dstRow 
     * @returns {number[][]}
     */
    #getBresenhamLine(srcRow, srcCol, dstRow, dstCol) {
        const points = [];
        const dx = Math.abs(dstCol - srcCol);
        const dy = Math.abs(dstRow - srcRow);
        const sx = (srcCol < dstCol) ? 1 : -1;
        const sy = (srcRow < dstRow) ? 1 : -1;
        let err = dx - dy;
        let x = srcCol;
        let y = srcRow;
        while (true) {
            points.push([x, y]);
            if (x === dstCol && y === dstRow) break;
            const e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x += sx;
            }
            if (e2 < dx) {
                err += dx;
                y += sy;
            }
        }
        return points;
    }
}