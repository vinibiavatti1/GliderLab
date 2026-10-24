import { Automata } from "../automata.js"
import { SimulationGrid } from "../simulation-grid.js"
import { ElementarRule } from "./elementar-rule.js"

/** @implements {Automata} */
export class Elementar extends Automata {
    static DEAD = 0
    static ALIVE = 1
    static DEAD_COLOR = 'rgb(0, 0, 0)'
    static ALIVE_COLOR = 'rgb(255, 255, 255)'

    /** @type {ElementarRule} */
    #rule

    /** @type {SimulationGrid} */
    #simulationGrid

    #generationCount = 0n

    /**
     * @param {number} rows 
     * @param {number} cols 
     * @param {ElementarRule} rule
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
            return Elementar.ALIVE_COLOR
        }
        return Elementar.DEAD_COLOR
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

    get simulationGrid() {
        return this.#simulationGrid
    }

    get name() {
        return `Elementar (${this.#rule.number})`
    }

    get generationCount() {
        return this.#generationCount
    }

    get populationCount() {
        return null
    }

    get representativeColor() {
        return Elementar.ALIVE_COLOR
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
            if (value === Elementar.ALIVE) {
                this.#simulationGrid.setValue(row, col, Elementar.ALIVE)
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
}