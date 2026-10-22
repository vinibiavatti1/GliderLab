import { Tool } from "./tool.js";

/** @implements {Tool} */
export class BucketTool extends Tool {
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
        const value = this.app.automata.getValue(row, col)
        if (value !== 0) {
            return
        }

        // Floodfill Algorithm
        const stack = [[row, col]]
        const visited = new Set()
        while (stack.length != 0) {
            const [r, c] = stack.pop()

            if (r < 0 || r >= this.app.rows || c < 0 || c >= this.app.cols) {
                continue
            }

            const key = `${r},${c}`
            if (visited.has(key)) {
                continue
            }

            const currentValue = this.app.automata.getValue(r, c)
            if (currentValue !== 0) {
                continue
            }

            visited.add(key)
            this.app.automata.setValue(r, c, this.app.currentCellValue)

            stack.push([r - 1, c])
            stack.push([r + 1, c])
            stack.push([r, c - 1])
            stack.push([r, c + 1])
        }
    }

    /**
     * @param {number} row 
     * @param {number} col 
     */
    onMouseMove(row, col) {

    }

    /**
     * @param {number} row 
     * @param {number} col 
     */
    onMouseReleased(row, col) {

    }

    onMouseLeave() {

    }

    /**
     * @param {CanvasRenderingContext2D} displayBufferContext
     */
    renderPreview(displayBufferContext) {

    }
}