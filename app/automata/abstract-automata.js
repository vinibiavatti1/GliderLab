import { AppError } from '../app-error.js'

class AutomataError extends Error { }


export class AbstractAutomata {
    /** @type {string} */
    #name

    /** @type {number[][]} */
    #data = []

    /** @type {number[][]} */
    #buffer = []

    /** @type {number[][]} */
    #initialData = []

    #generationCount = 0n
    #rows = 0
    #cols = 0

    /**
     * @param {string} name
     * @param {number} rows 
     * @param {number} cols 
     */
    constructor(name, rows, cols) {
        if (rows < 0 || cols < 0) {
            throw new AppError(`Invalid rows/cols: ${rows}/${cols}`)
        }
        this.#name = name
        this.#rows = rows
        this.#cols = cols
        this.#recreateData()
    }

    /**
     * @abstract
     */
    processGeneration() {
        throw new AppError('Not implemented')
    }

    nextGeneration() {
        if (this.#generationCount === 0n) {
            this.#storeInitialData()
        }
        this.processGeneration()
        this.#generationCount++
    }

    resetGeneration() {
        this.#generationCount = 0n
        this.#data = structuredClone(this.#initialData)
    }

    flush() {
        this.#data = structuredClone(this.#buffer)
    }

    /**
     * @param {number} row 
     * @param {number} col 
     * @param {number} value 
     * @returns {boolean}
     */
    setValue(row, col, value) {
        if (this.#areCoordsInvalid(row, col)) {
            return false
        }
        this.#data[row][col] = value
        return true
    }

    /**
     * @param {number} row 
     * @param {number} col 
     * @returns {number?}
     */
    getValue(row, col) {
        if (this.#areCoordsInvalid(row, col)) {
            return null
        }
        return this.#data[row][col]
    }

    /**
     * @param {number} row 
     * @param {number} col 
     * @returns {number?}
     */
    getValueNormalized(row, col) {
        [row, col] = this.#normalizeCoords(row, col)
        return this.#data[row][col]
    }

    /**
     * @returns {void}
     */
    clear() {
        for (let row = 0; row < this.#rows; row++) {
            for (let col = 0; col < this.#cols; col++) {
                this.#data[row][col] = 0
                this.#buffer[row][col] = 0
            }
        }
    }

    /**
     * @param {number} rows 
     * @param {number} cols 
     * @returns {void}
     */
    resize(rows, cols) {
        if (rows < 0 || cols < 0) {
            throw new AutomataError(`Invalid rows/cols: ${rows}/${cols}`)
        }
        const newData = []
        for (let row = 0; row < rows; row++) {
            const line = []
            for (let col = 0; col < cols; col++) {
                if (row < this.#rows && col < this.#cols) {
                    line.push(this.#data[row][col])
                } else {
                    line.push(0)
                }
            }
            newData.push(line)
        }
        this.#rows = rows
        this.#cols = cols
        this.#data = newData
        this.#buffer = structuredClone(this.#data)
        this.#initialData = structuredClone(this.#data)
    }

    isGenerationZero() {
        return generationCount === 0n
    }

    /**
     * @param {number} row 
     * @param {number} col 
     * @param {number} state 
     * @returns {number}
     */
    countSurroundingCells(row, col, state) {
        let count = 0
        count += this.getValueNormalized(row - 1, col - 1) === state ? 1 : 0
        count += this.getValueNormalized(row - 1, col + 0) === state ? 1 : 0
        count += this.getValueNormalized(row - 1, col + 1) === state ? 1 : 0
        count += this.getValueNormalized(row + 0, col - 1) === state ? 1 : 0
        count += this.getValueNormalized(row + 0, col + 1) === state ? 1 : 0
        count += this.getValueNormalized(row + 1, col - 1) === state ? 1 : 0
        count += this.getValueNormalized(row + 1, col + 0) === state ? 1 : 0
        count += this.getValueNormalized(row + 1, col + 1) === state ? 1 : 0
        return count
    }

    #recreateData() {
        this.#data.length = 0
        for (let row = 0; row < this.#rows; row++) {
            const line = []
            for (let col = 0; col < this.#cols; col++) {
                line.push(0)
            }
            this.#data.push(line)
        }
        this.#buffer = structuredClone(this.#data)
        this.#initialData = structuredClone(this.#data)
    }

    /**
     * @param {number} row 
     * @param {number} col 
     * @returns {[number, number]}
     */
    #normalizeCoords(row, col) {
        if (row < 0) {
            row = this.#rows + row
        }
        if (row >= this.#rows) {
            row = row - this.#rows
        }
        if (col < 0) {
            col = this.#cols + col
        }
        if (col >= this.#cols) {
            col = col - this.#cols
        }
        return [row, col]
    }

    /**
     * @param {number} row 
     * @param {number} col 
     * @returns {boolean}
     */
    #areCoordsInvalid(row, col) {
        return row < 0 || row >= this.#rows || col < 0 || col >= this.#cols
    }

    #storeInitialData() {
        this.#initialData = structuredClone(this.#data)
    }

    #restoreInitialData() {
        this.#data = structuredClone(this.#initialData)
    }

    get name() {
        return this.#name
    }

    get rows() {
        return this.#rows
    }

    get cols() {
        return this.#cols
    }

    get buffer() {
        return this.#buffer
    }

    get data() {
        return this.#data
    }

    get generationCount() {
        return this.#generationCount
    }
}
