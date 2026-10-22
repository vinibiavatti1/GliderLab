import { AppError } from "../../app-error.js";
import { AbstractAutomata } from "../abstract-automata.js";
import { GameOfLifeRule } from "./game-of-life-rule.js";
import { GameOfLifeValue } from "./game-of-life-value.js";

/**
 * @implements {AbstractAutomata}
 */
export class GameOfLife extends AbstractAutomata {
    /** @type {GameOfLifeRule} */
    #rule

    /**
     * @param {number} rows 
     * @param {number} cols 
     * @param {GameOfLifeRule} rule
     */
    constructor(rows, cols, rule) {
        super(rows, cols)
        this.#rule = rule
    }

    processGeneration() {
        if (!this.#rule) {
            throw new AppError('Rule not set')
        }
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const count = this.countSurroundingCells(row, col, GameOfLifeValue.ALIVE)
                if (this.#rule.born.includes(count)) {
                    this.buffer[row][col] = GameOfLifeValue.ALIVE
                } else if (this.#rule.survive.includes(count)) {
                    this.buffer[row][col] = this.data[row][col]
                } else {
                    this.buffer[row][col] = GameOfLifeValue.DEAD
                }
            }
        }
    }

    get rule() {
        return this.#rule
    }

    set rule(rule) {
        this.#rule = rule
    }
}
