import { Automata } from "../automata.js"
import { SimulationGrid } from "../simulation-grid.js"
import { ElementaryRule } from "./elementary-rule.js"

/** @implements {Automata} */
export class Elementary extends Automata {
    static DEAD = 0
    static ALIVE = 1
    static DEAD_COLOR = 'rgb(0, 0, 0)'
    static ALIVE_COLOR = 'rgb(255, 255, 255)'

    /** @type {ElementaryRule} */
    #rule

    /** @type {SimulationGrid} */
    #simulationGrid

    #generationCount = 0n

    /**
     * @param {number} rows 
     * @param {number} cols 
     * @param {ElementaryRule} rule
     */
    constructor(rows, cols, rule) {
        super()
        this.#simulationGrid = new SimulationGrid(rows, cols)
        this.#rule = rule
    }

    nextGeneration() {
        if (!this.#rule) {
            throw new AppError('Rule not set')
        }
        if (this.#generationCount === 0n) {
            this.#simulationGrid.storeInitialData()
        }
        this.#processGeneration()
        this.#generationCount++
    }

    resetGeneration() {
        this.#generationCount = 0n
        this.#simulationGrid.restoreInitialData()
    }

    setValue(row, col, value) {
        this.#simulationGrid.setValue(row, col, value)
    }

    getValue(row, col) {
        return this.#simulationGrid.getValue(row, col)
    }

    getValueColor(row, col) {
        const value = this.#simulationGrid.getValue(row, col)
        if (value === 1) {
            return Elementary.ALIVE_COLOR
        }
        return Elementary.DEAD_COLOR
    }

    clear() {
        this.#simulationGrid.clear()
    }

    resize(rows, cols) {
        this.#simulationGrid.resize(rows, cols)
    }

    render(context, tileSize) {
        for (let row = 0; row < this.#simulationGrid.rows; row++) {
            for (let col = 0; col < this.#simulationGrid.cols; col++) {
                const color = this.getValueColor(row, col)
                context.fillStyle = color
                context.fillRect(col * tileSize, row * tileSize, tileSize, tileSize)
            }
        }
    }

    restoreSnapshot(rows, cols, dataSnapshot) {
        this.#simulationGrid.restoreSnapshot(rows, cols, dataSnapshot)
    }

    requestPause() {
        return this.#generationCount == this.#simulationGrid.rows
    }

    supportsSnapshots() {
        return true
    }

    #processGeneration() {
        if (!this.#rule) {
            throw new AppError('Rule not set')
        }
        const row = parseInt(this.#generationCount) + 1
        if (row >= this.rows) {
            return
        }
        for (let col = 0; col < this.#simulationGrid.cols; col++) {
            const [left, middle, right] = this.#getTopCells(row, col)
            const value = this.#rule.evaluate(left, middle, right)
            if (value === Elementary.ALIVE) {
                this.#simulationGrid.setValue(row, col, Elementary.ALIVE)
            }
        }
    }

    /**
     * @param {number} row 
     * @param {number} col 
     * @returns {[number, number, number]}
     */
    #getTopCells(row, col) {
        const left = this.getValue(row - 1, col - 1)
        const middle = this.getValue(row - 1, col + 0)
        const right = this.getValue(row - 1, col + 1)
        return [left ?? 0, middle ?? 0, right ?? 0]
    }

    get simulationGrid() {
        return this.#simulationGrid
    }

    get name() {
        return `Elementary (${this.#rule.number})`
    }

    get generationCount() {
        return this.#generationCount
    }

    get representativeColor() {
        return Elementary.ALIVE_COLOR
    }

    get defaultValue() {
        return Elementary.ALIVE
    }

    get additionalStatusInfo() {
        return null
    }
}