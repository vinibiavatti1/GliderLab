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
        this.#floodFill(row, col)
    }

    /**
     * Floodfill Algorithm
     * @param {number} row 
     * @param {number} col 
     * @returns {boolean}
     */
    #floodFill(row, col) {
        const stack = [[row, col]]
        const visited = new Set()
        let saved = false
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

            if (!saved) {
                saved = true
                this.app.saveSnapshot()
            }
            this.app.automata.setValue(r, c, this.app.currentCellValue)

            stack.push([r - 1, c])
            stack.push([r + 1, c])
            stack.push([r, c - 1])
            stack.push([r, c + 1])
        }
    }
}