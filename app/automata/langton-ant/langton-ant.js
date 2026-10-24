import { Automata } from "../automata.js"
import { SimulationGrid } from "../simulation-grid.js"

/** @implements {Automata} */
export class LangtonAnt extends Automata {
    static WHITE = 0
    static BLACK = 1
    static ANT = 2
    static WHITE_COLOR = 'rgb(0, 0, 0)'
    static BLACK_COLOR = 'rgb(255, 255, 255)'
    static ANT_COLOR = 'rgb(255, 0, 0)'
    static ANT_UP = 0
    static ANT_RIGHT = 1
    static ANT_DOWN = 2
    static ANT_LEFT = 3

    /** @type {SimulationGrid} */
    #simulationGrid

    #generationCount = 0n

    /** @type {number?} */
    #antRow = null

    /** @type {number?} */
    #antCol = null

    /** @type {number?} */
    #initialAntRow = null

    /** @type {number?} */
    #initialAntCol = null

    #initialAntDirection = LangtonAnt.ANT_LEFT
    #antDirection = LangtonAnt.ANT_LEFT

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
            this.#initialAntRow = this.#antRow
            this.#initialAntCol = this.#antCol
            this.#initialAntDirection = this.#antDirection
            this.#simulationGrid.storeInitialData()
        }
        this.#processGeneration()
        this.#generationCount++
    }

    resetGeneration() {
        this.#generationCount = 0n
        this.#antRow = this.#initialAntRow
        this.#antCol = this.#initialAntCol
        this.#antDirection = this.#initialAntDirection
        this.#simulationGrid.restoreInitialData()
    }

    setValue(row, col, value) {
        if (value === LangtonAnt.ANT) {
            this.#antRow = row
            this.#antCol = col
        } else if (row === this.#antRow && col === this.#antCol) {
            this.#antRow = null
            this.#antCol = null
        } else {
            this.#simulationGrid.setValue(row, col, value)
        }
    }

    getValue(row, col) {
        return this.#simulationGrid.getValue(row, col)
    }

    getValueColor(row, col) {
        switch (this.#simulationGrid.getValue(row, col)) {
            case LangtonAnt.WHITE: return LangtonAnt.WHITE_COLOR
            case LangtonAnt.BLACK: return LangtonAnt.BLACK_COLOR
            case LangtonAnt.ANT: return LangtonAnt.ANT_COLOR
            default: return LangtonAnt.WHITE
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
                const color = this.getValueColor(row, col)
                context.fillStyle = color
                context.fillRect(col * tileSize, row * tileSize, tileSize, tileSize)
            }
        }
        if (this.#antRow !== null && this.#antCol !== null) {
            context.fillStyle = LangtonAnt.ANT_COLOR
            context.fillRect(this.#antCol * tileSize, this.#antRow * tileSize, tileSize, tileSize)
        }
    }

    restoreSnapshot(rows, cols, dataSnapshot) {
        this.#simulationGrid.restoreSnapshot(rows, cols, dataSnapshot)
    }

    requestPause() {
        return false
    }

    #processGeneration() {
        if (this.#antRow === null || this.#antCol === null) {
            return
        }
        let value = this.#simulationGrid.getValue(this.#antRow, this.#antCol)
        let newValue = value === LangtonAnt.WHITE ? LangtonAnt.BLACK : LangtonAnt.WHITE
        this.#simulationGrid.setValue(this.#antRow, this.#antCol, newValue)
        if (value === LangtonAnt.WHITE) {
            switch (this.#antDirection) {
                case LangtonAnt.ANT_UP: {
                    this.#antDirection = LangtonAnt.ANT_RIGHT
                    this.#antCol += 1
                    break
                }
                case LangtonAnt.ANT_RIGHT: {
                    this.#antDirection = LangtonAnt.ANT_DOWN
                    this.#antRow += 1
                    break
                }
                case LangtonAnt.ANT_DOWN: {
                    this.#antDirection = LangtonAnt.ANT_LEFT
                    this.#antCol -= 1
                    break
                }
                case LangtonAnt.ANT_LEFT: {
                    this.#antDirection = LangtonAnt.ANT_UP
                    this.#antRow -= 1
                    break
                }
            }
            newValue = LangtonAnt.BLACK
        } else {
            switch (this.#antDirection) {
                case LangtonAnt.ANT_UP: {
                    this.#antDirection = LangtonAnt.ANT_LEFT
                    this.#antCol -= 1
                    break
                }
                case LangtonAnt.ANT_LEFT: {
                    this.#antDirection = LangtonAnt.ANT_DOWN
                    this.#antRow += 1
                    break
                }
                case LangtonAnt.ANT_DOWN: {
                    this.#antDirection = LangtonAnt.ANT_RIGHT
                    this.#antCol += 1
                    break
                }
                case LangtonAnt.ANT_RIGHT: {
                    this.#antDirection = LangtonAnt.ANT_UP
                    this.#antRow -= 1
                    break
                }
            }
            newValue = LangtonAnt.WHITE
        }
        [this.#antRow, this.#antCol] = this.#simulationGrid.wrapCoordinates(this.#antRow, this.#antCol)
    }

    get simulationGrid() {
        return this.#simulationGrid
    }

    get name() {
        return 'Langton\'s Ant'
    }

    get generationCount() {
        return this.#generationCount
    }

    get populationCount() {
        return null
    }

    get representativeColor() {
        return LangtonAnt.BLACK_COLOR
    }

    get defaultValue() {
        return LangtonAnt.ANT
    }

    get additionalStatusInfo() {
        return 'Highway At: 9,977'
    }
}