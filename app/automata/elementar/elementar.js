import { AbstractAutomata } from "../abstract-automata.js";
import { ElementarRule } from "./elementar-rule.js";

/** @implements {AbstractAutomata} */
export class Elementar extends AbstractAutomata {
    static DEAD = 0
    static ALIVE = 1

    /** @type {ElementarRule} */
    #rule

    /**
     * @param {number} rows 
     * @param {number} cols 
     * @param {ElementarRule} rule
     */
    constructor(rows, cols, rule) {
        super(`Elementar (${rule.number})`, rows, cols, 'rgb(255, 255, 255)')
        this.#rule = rule
        this.useBuffer = false
    }

    processGeneration() {
        if (!this.#rule) {
            throw new AppError('Rule not set')
        }
        const row = parseInt(this.generationCount) + 1
        if (row >= this.rows) {
            return
        }
        for (let col = 0; col < this.cols; col++) {
            const [left, middle, right] = this.#getTopCells(row, col)
            const value = this.#rule.evaluate(left, middle, right)
            if (value === Elementar.ALIVE) {
                this.data[row][col] = Elementar.ALIVE
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