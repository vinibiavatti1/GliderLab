import { Tool } from "./tool.js"

/** @implements {Tool} */
export class SelectionTool extends Tool {
    static STATE_COPY = 0
    static STATE_PASTE = 1

    /** @type {App} */
    #app

    #mousePressed = false

    /** @type {number?} */
    #mouseSrcRow = null

    /** @type {number?} */
    #mouseSrcCol = null

    /** @type {number?} */
    #mouseDstRow = null

    /** @type {number?} */
    #mouseDstCol = null

    /** @type {number?} */
    #mousePasteLocationRow = null

    /** @type {number?} */
    #mousePasteLocationCol = null

    /** @type {number[][]} */
    #data = []

    #currentState = SelectionTool.STATE_COPY

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
        if (this.#currentState === SelectionTool.STATE_COPY) {
            this.#mousePressed = true
            this.#mouseSrcRow = row
            this.#mouseSrcCol = col
        } else {
            for (let row = 0; row < this.#data.length; row++) {
                for (let col = 0; col < this.#data[0].length; col++) {
                    const value = this.#data[row][col]
                    if (value === 0) {
                        continue
                    }
                    this.#app.automata.simulationGrid.setValue(this.#mousePasteLocationRow + row, this.#mousePasteLocationCol + col, value)
                }
            }
        }
    }

    /**
     * @param {number} row 
     * @param {number} col 
     */
    onMouseRightPressed(row, col) {
        this.reset()
    }

    /**
     * @param {number} row 
     * @param {number} col 
     */
    onMouseMove(row, col) {
        if (this.#currentState === SelectionTool.STATE_COPY) {
            if (this.#mousePressed) {
                this.#mouseDstRow = row
                this.#mouseDstCol = col
            }
        } else {
            this.#mousePasteLocationRow = row
            this.#mousePasteLocationCol = col
        }
    }

    /**
     * @param {number} row 
     * @param {number} col 
     */
    onMouseReleased(row, col) {
        if (this.#currentState !== SelectionTool.STATE_COPY) {
            return
        }

        this.#mousePressed = false
        if (this.#mouseSrcRow === null || this.#mouseSrcCol === null) {
            return
        }
        this.#mouseDstRow = row
        this.#mouseDstCol = col
        this.#storeData(this.#mouseSrcRow, this.#mouseSrcCol, this.#mouseDstRow, this.#mouseDstCol);

        this.#mouseSrcRow = null
        this.#mouseSrcCol = null
        this.#mouseDstRow = null
        this.#mouseDstCol = null
        this.#mousePressed = false
        this.#mousePasteLocationRow = row
        this.#mousePasteLocationCol = col
        this.#currentState = SelectionTool.STATE_PASTE
    }

    onMouseLeave() { }

    /**
     * @param {CanvasRenderingContext2D} displayBufferContext
     */
    renderPreview(displayBufferContext) {
        if (this.#currentState === SelectionTool.STATE_COPY) {
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
                    col * this.#app.tileSize,
                    row * this.#app.tileSize,
                    this.#app.tileSize,
                    this.#app.tileSize
                );
            }
        } else {
            if (this.#mousePasteLocationRow === null || this.#mousePasteLocationCol === null) {
                return
            }
            for (let row = 0; row < this.#data.length; row++) {
                for (let col = 0; col < this.#data[0].length; col++) {
                    const value = this.#data[row][col]
                    if (value === 0) {
                        continue
                    }
                    displayBufferContext.fillStyle = this.#app.automata.getvalueColor(this.#data[row][col])
                    displayBufferContext.fillRect(
                        (this.#mousePasteLocationCol + col) * this.#app.tileSize,
                        (this.#mousePasteLocationRow + row) * this.#app.tileSize,
                        this.#app.tileSize,
                        this.#app.tileSize
                    );
                }
            }
        }
    }

    reset() {
        this.#data = []
        this.#currentState = SelectionTool.STATE_COPY
        this.#mousePasteLocationRow = null
        this.#mousePasteLocationCol = null
    }

    /**
     * @param {number} srcCol 
     * @param {number} srcRow 
     * @param {number} dstCol 
     * @param {number} dstRow 
     * @returns {number[][]}
     */
    #storeData(srcRow, srcCol, dstRow, dstCol) {
        if (dstRow >= this.#app.automata.simulationGrid.rows) {
            dstRow = this.#app.automata.simulationGrid.rows - 1
        }
        if (dstCol >= this.#app.automata.simulationGrid.cols) {
            dstCol = this.#app.automata.simulationGrid.cols - 1
        }
        for (let row = srcRow; row <= dstRow; row++) {
            const line = []
            for (let col = srcCol; col <= dstCol; col++) {
                line.push(this.#app.automata.simulationGrid.data[row][col])
            }
            this.#data.push(line)
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