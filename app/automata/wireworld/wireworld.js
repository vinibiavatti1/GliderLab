import { Automata } from "../automata.js"
import { SimulationGrid } from "../simulation-grid.js"

/** @implements {Automata} */
export class WireWorld extends Automata {
    static EMPTY = 0
    static CONDUCTOR = 1
    static ELECTRON_HEAD = 2
    static ELECTRON_TAIL = 3
    static EMPTY_COLOR = 'rgb(0, 0, 0)'
    static CONDUCTOR_COLOR = 'rgb(255, 128, 0)'
    static ELECTRON_HEAD_COLOR = 'rgb(255, 255, 255)'
    static ELECTRON_TAIL_COLOR = 'rgb(0, 128, 255)'

    /** @type {SimulationGrid} */
    #simulationGrid

    #generationCount = 0n

    /** @type {Map<string, number[]>} */
    #coordsToProcess = new Map()

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
        this.#syncProcessCoordsWithData()
    }

    setValue(row, col, value) {
        if (value !== WireWorld.ELECTRON_HEAD && this.#generationCount !== 0n) {
            return
        }
        const key = this.#toKey(row, col)
        if (value === WireWorld.ELECTRON_HEAD) {
            const currentValue = this.#simulationGrid.getValue(row, col)
            if (currentValue !== WireWorld.CONDUCTOR) {
                return
            }
        }
        this.#coordsToProcess.set(key, [row, col])
        this.#simulationGrid.setValue(row, col, value)
    }

    getValue(row, col) {
        return this.#simulationGrid.getValue(row, col)
    }

    getCoordinatesColor(row, col) {
        return this.getvalueColor(this.#simulationGrid.getValue(row, col))
    }

    getvalueColor(value) {
        switch (value) {
            case WireWorld.CONDUCTOR: return WireWorld.CONDUCTOR_COLOR
            case WireWorld.ELECTRON_HEAD: return WireWorld.ELECTRON_HEAD_COLOR
            case WireWorld.ELECTRON_TAIL: return WireWorld.ELECTRON_TAIL_COLOR
            default: return WireWorld.EMPTY_COLOR
        }
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

    loadData(rows, cols, dataSnapshot) {
        this.#simulationGrid.loadData(rows, cols, dataSnapshot)
        this.#syncProcessCoordsWithData()
    }

    requestPause() {
        return false
    }

    supportsSnapshots() {
        return true
    }

    #processGeneration() {
        const keysToDelete = []
        for (const [key, element] of this.#coordsToProcess) {
            const row = element[0]
            const col = element[1]
            const value = this.#simulationGrid.getValue(row, col)
            let newValue = WireWorld.EMPTY
            switch (value) {
                case WireWorld.EMPTY: {
                    keysToDelete.push(key)
                    break
                }
                case WireWorld.CONDUCTOR: {
                    const count = this.#countSurroundingCells(row, col, WireWorld.ELECTRON_HEAD)
                    if (count === 1 || count === 2) {
                        newValue = WireWorld.ELECTRON_HEAD
                    } else {
                        newValue = WireWorld.CONDUCTOR
                    }
                    break
                }
                case WireWorld.ELECTRON_HEAD: {
                    newValue = WireWorld.ELECTRON_TAIL
                    break
                }
                case WireWorld.ELECTRON_TAIL: {
                    newValue = WireWorld.CONDUCTOR
                    break
                }
            }
            this.#simulationGrid.setValueInBuffer(row, col, newValue)
            this.#coordsToProcess.set(key, [row, col])
        }
        this.#simulationGrid.flush()
        keysToDelete.forEach(key => this.#coordsToProcess.delete(key))
    }

    /**
     * @param {number} row 
     * @param {number} col 
     * @param {number} value 
     * @returns {number}
     */
    #countSurroundingCells(row, col, value) {
        let count = 0
        count += this.#simulationGrid.getValue(row - 1, col - 1) === value ? 1 : 0
        count += this.#simulationGrid.getValue(row - 1, col + 0) === value ? 1 : 0
        count += this.#simulationGrid.getValue(row - 1, col + 1) === value ? 1 : 0
        count += this.#simulationGrid.getValue(row + 0, col - 1) === value ? 1 : 0
        count += this.#simulationGrid.getValue(row + 0, col + 1) === value ? 1 : 0
        count += this.#simulationGrid.getValue(row + 1, col - 1) === value ? 1 : 0
        count += this.#simulationGrid.getValue(row + 1, col + 0) === value ? 1 : 0
        count += this.#simulationGrid.getValue(row + 1, col + 1) === value ? 1 : 0
        return count
    }

    /**
     * @param {number} row 
     * @param {number} col 
     * @returns {string}
     */
    #toKey(row, col) {
        return `${row}-${col}`
    }

    #syncProcessCoordsWithData() {
        this.#coordsToProcess = new Map()
        for (let row = 0; row < this.#simulationGrid.rows; row++) {
            for (let col = 0; col < this.#simulationGrid.cols; col++) {
                const value = this.#simulationGrid.getValue(row, col)
                if (value === WireWorld.CONDUCTOR || value === WireWorld.ELECTRON_HEAD) {
                    const key = this.#toKey(row, col)
                    this.#coordsToProcess.set(key, [row, col])
                }
            }
        }
    }

    get simulationGrid() {
        return this.#simulationGrid
    }

    get name() {
        return 'Wireworld'
    }

    get generationCount() {
        return this.#generationCount
    }

    get representativeColor() {
        return WireWorld.CONDUCTOR_COLOR
    }

    get defaultValue() {
        return WireWorld.CONDUCTOR
    }

    get additionalStatusInfo() {
        return null
    }
}