import { Automata } from "../automata.js"
import { SimulationGrid } from "../simulation-grid.js"

/** @implements {Automata} */
export class Entombed extends Automata {
    static EMPTY = 0
    static WALL = 1
    static EMPTY_COLOR = 'rgb(0, 0, 0)'
    static WALL_COLOR = 'rgb(187, 187, 53)'

    // Entombed Mystery Table
    static MYSTERY_TABLE = {
        '00000': { name: 'Wall  ', getValue: () => Entombed.WALL },
        '00001': { name: 'Wall  ', getValue: () => Entombed.WALL },
        '00010': { name: 'Wall  ', getValue: () => Entombed.WALL },
        '00011': { name: 'Random', getValue: () => Entombed.random() },
        '00100': { name: 'Empty ', getValue: () => Entombed.EMPTY },
        '00101': { name: 'Empty ', getValue: () => Entombed.EMPTY },
        '00110': { name: 'Random', getValue: () => Entombed.random() },
        '00111': { name: 'Random', getValue: () => Entombed.random() },
        '01000': { name: 'Wall  ', getValue: () => Entombed.WALL },
        '01001': { name: 'Wall  ', getValue: () => Entombed.WALL },
        '01010': { name: 'Wall  ', getValue: () => Entombed.WALL },
        '01011': { name: 'Wall  ', getValue: () => Entombed.WALL },
        '01100': { name: 'Random', getValue: () => Entombed.random() },
        '01101': { name: 'Empty ', getValue: () => Entombed.EMPTY },
        '01110': { name: 'Empty ', getValue: () => Entombed.EMPTY },
        '01111': { name: 'Empty ', getValue: () => Entombed.EMPTY },
        '10000': { name: 'Wall  ', getValue: () => Entombed.WALL },
        '10001': { name: 'Wall  ', getValue: () => Entombed.WALL },
        '10010': { name: 'Wall  ', getValue: () => Entombed.WALL },
        '10011': { name: 'Random', getValue: () => Entombed.random() },
        '10100': { name: 'Empty ', getValue: () => Entombed.EMPTY },
        '10101': { name: 'Empty ', getValue: () => Entombed.EMPTY },
        '10110': { name: 'Empty ', getValue: () => Entombed.EMPTY },
        '10111': { name: 'Empty ', getValue: () => Entombed.EMPTY },
        '11000': { name: 'Random', getValue: () => Entombed.random() },
        '11001': { name: 'Empty ', getValue: () => Entombed.EMPTY },
        '11010': { name: 'Wall  ', getValue: () => Entombed.WALL },
        '11011': { name: 'Random', getValue: () => Entombed.random() },
        '11100': { name: 'Random', getValue: () => Entombed.random() },
        '11101': { name: 'Empty ', getValue: () => Entombed.EMPTY },
        '11110': { name: 'Empty ', getValue: () => Entombed.EMPTY },
        '11111': { name: 'Empty ', getValue: () => Entombed.EMPTY },
    }

    /**
     * @returns {number}
     */
    static random() {
        return Math.random() < 0.5 ? Entombed.WALL : Entombed.EMPTY
    }

    /** @type {SimulationGrid} */
    #simulationGrid

    #generationCount = 0n

    /**
     * @param {number} rows 
     * @param {number} cols 
     */
    constructor(rows, cols) {
        super()
        this.#simulationGrid = new SimulationGrid(rows, cols)
    }

    nextGeneration() {
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

    getCoordinatesColor(row, col) {
        const value = this.#simulationGrid.getValue(row, col)
        return this.getvalueColor(value)
    }

    getvalueColor(value) {
        if (value === 1) {
            return Entombed.WALL_COLOR
        }
        return Entombed.EMPTY_COLOR
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
                const color = this.getCoordinatesColor(row, col)
                context.fillStyle = color
                context.fillRect(col * tileSize, row * tileSize, tileSize, tileSize)
            }
        }
    }

    loadData(rows, cols, data) {
        this.#simulationGrid.loadData(rows, cols, data)
    }

    requestPause() {
        return this.#generationCount == this.#simulationGrid.rows
    }

    supportsSnapshots() {
        return true
    }

    #processGeneration() {
        const row = parseInt(this.#generationCount)
        if (row >= this.rows) {
            return
        }
        for (let col = 0; col < this.#simulationGrid.cols; col++) {
            if (col < 2) {
                this.#simulationGrid.setValue(row, col, Entombed.WALL)
                continue
            }
            if (col >= this.#simulationGrid.cols - 2) {
                this.#simulationGrid.setValue(row, col, Entombed.WALL)
                continue
            }
            const [leftLeft, left, topLeft, topMiddle, topRight] = this.#getCells(row, col)
            const key = `${leftLeft}${left}${topLeft}${topMiddle}${topRight}`
            const value = Entombed.MYSTERY_TABLE[key].getValue()
            this.#simulationGrid.setValue(row, col, value)
        }
    }

    /**
     * @param {number} row 
     * @param {number} col 
     * @returns {[number, number, number]}
     */
    #getCells(row, col) {
        const leftLeft = this.getValue(row, col - 2)
        const left = this.getValue(row, col - 1)
        const topLeft = this.getValue(row - 1, col - 1)
        const topMiddle = this.getValue(row - 1, col + 0)
        const topRight = this.getValue(row - 1, col + 1)
        return [leftLeft ?? 0, left ?? 0, topLeft ?? 0, topMiddle ?? 0, topRight ?? 0]
    }

    get simulationGrid() {
        return this.#simulationGrid
    }

    get name() {
        return 'Entombed'
    }

    get generationCount() {
        return this.#generationCount
    }

    get representativeColor() {
        return Entombed.WALL_COLOR
    }

    get defaultValue() {
        return Entombed.WALL
    }

    get additionalStatusInfo() {
        return null
    }
}