import { AppError } from "../app-error.js"

export class SimulationGrid {
    /** @type {number[][]} */
    #data = []

    /** @type {number[][]} */
    #buffer = []

    /** @type {number[][]} */
    #initialData = []

    #rows = 0
    #cols = 0

    /**
     * @param {number} rows 
     * @param {number} cols 
     */
    constructor(rows, cols) {
        if (rows < 0 || cols < 0) {
            throw new AppError(`Invalid rows/cols: ${rows}/${cols}`)
        }
        this.#rows = rows
        this.#cols = cols
        this.#recreateData()
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
     * @param {number} value 
     * @returns {boolean}
     */
    setValueInBuffer(row, col, value) {
        if (this.#areCoordsInvalid(row, col)) {
            return false
        }
        this.#buffer[row][col] = value
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
    getValueWrapped(row, col) {
        [row, col] = this.wrapCoordinates(row, col)
        return this.#data[row][col]
    }

    /**
     * @param {number} row 
     * @param {number} col 
     * @returns {[number, number]}
     */
    wrapCoordinates(row, col) {
        if (row < 0) {
            row = this.rows + row
        }
        if (row >= this.rows) {
            row = row - this.rows
        }
        if (col < 0) {
            col = this.cols + col
        }
        if (col >= this.cols) {
            col = col - this.cols
        }
        return [row, col]
    }

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
     */
    resize(rows, cols) {
        if (rows < 0 || cols < 0) {
            throw new AppError(`Invalid rows/cols: ${rows}/${cols}`)
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

    /**
     * @param {number} rows
     * @param {number} cols
     * @param {number[][]} dataSnapshot 
     */
    restoreSnapshot(rows, cols, dataSnapshot) {
        this.#data = structuredClone(dataSnapshot)
        this.#rows = rows
        this.#cols = cols
        this.#buffer = structuredClone(this.#data)
        this.#initialData = structuredClone(this.#data)
    }

    storeInitialData() {
        this.#initialData = structuredClone(this.#data)
    }

    restoreInitialData() {
        this.#data = structuredClone(this.#initialData)
        this.#buffer = structuredClone(this.#data)
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
     * @returns {boolean}
     */
    #areCoordsInvalid(row, col) {
        return row < 0 || row >= this.#rows || col < 0 || col >= this.#cols
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
}