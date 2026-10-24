import { Constants } from "../../constants.js"
import { AbstractAutomata } from "../abstract-automata.js"
import { SimulationGrid } from "../simulation-grid.js"
import { GameOfLifeRule } from "./game-of-life-rule.js"

/** @implements {AbstractAutomata} */
export class GameOfLife extends AbstractAutomata {
    static DEAD = 0
    static ALIVE = 1

    /** @type {GameOfLifeRule} */
    #rule

    /** @type {SimulationGrid} */
    #simulationGrid

    #populationCount = 0
    #generationCount = 0n

    /**
     * @param {number} rows 
     * @param {number} cols 
     * @param {GameOfLifeRule} rule
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
        if (value === null) {
            return Constants.DEFAULT_EMPTY_COLOR
        }
        if (value < this.#rule.colors.length) {
            return this.#rule.colors[value]
        }
        if (value === 0) {
            return Constants.DEFAULT_EMPTY_COLOR
        }
        return Constants.DEFAULT_COLOR
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

    get simulationGrid() {
        return this.#simulationGrid
    }

    get name() {
        return `${this.#rule.name} (${this.#rule.notation})`
    }

    get generationCount() {
        return this.#generationCount
    }

    get populationCount() {
        return this.#populationCount
    }

    #processGeneration() {
        this.#populationCount = 0
        for (let row = 0; row < this.#simulationGrid.rows; row++) {
            for (let col = 0; col < this.#simulationGrid.cols; col++) {
                const count = this.#countSurroundingCells(row, col, GameOfLife.ALIVE)
                if (this.#rule.born.includes(count)) {
                    this.#simulationGrid.setValueInBuffer(row, col, GameOfLife.ALIVE)
                    this.#populationCount++
                } else if (this.#rule.survive.includes(count)) {
                    const currentValue = this.#simulationGrid.getValue(row, col)
                    this.#simulationGrid.setValueInBuffer(row, col, currentValue)
                    if (currentValue === GameOfLife.ALIVE) {
                        this.#populationCount++
                    }
                } else {
                    this.#simulationGrid.setValueInBuffer(row, col, GameOfLife.DEAD)
                }
            }
        }
        this.#simulationGrid.flush()
    }

    /**
     * @param {number} row 
     * @param {number} col 
     * @param {number} state 
     * @returns {number}
     */
    #countSurroundingCells(row, col, state) {
        let count = 0
        count += this.#simulationGrid.getValueWrapped(row - 1, col - 1) === state ? 1 : 0
        count += this.#simulationGrid.getValueWrapped(row - 1, col + 0) === state ? 1 : 0
        count += this.#simulationGrid.getValueWrapped(row - 1, col + 1) === state ? 1 : 0
        count += this.#simulationGrid.getValueWrapped(row + 0, col - 1) === state ? 1 : 0
        count += this.#simulationGrid.getValueWrapped(row + 0, col + 1) === state ? 1 : 0
        count += this.#simulationGrid.getValueWrapped(row + 1, col - 1) === state ? 1 : 0
        count += this.#simulationGrid.getValueWrapped(row + 1, col + 0) === state ? 1 : 0
        count += this.#simulationGrid.getValueWrapped(row + 1, col + 1) === state ? 1 : 0
        return count
    }
}