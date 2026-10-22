import { AppError } from "../../app-error.js";
import { AbstractAutomata } from "../abstract-automata.js";
import { GameOfLifeRule } from "./game-of-life-rule.js";

/** @implements {AbstractAutomata} */
export class GameOfLife extends AbstractAutomata {
    static DEAD = 0
    static ALIVE = 1

    /** @type {GameOfLifeRule} */
    #rule

    #population = 0

    /**
     * @param {number} rows 
     * @param {number} cols 
     * @param {GameOfLifeRule} rule
     */
    constructor(rows, cols, rule) {
        super(`${rule.name} (${rule.notation})`, rows, cols)
        this.#rule = rule
    }

    processGeneration() {
        if (!this.#rule) {
            throw new AppError('Rule not set')
        }
        let population = 0
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const count = this.countSurroundingCells(row, col, GameOfLife.ALIVE)
                if (this.#rule.born.includes(count)) {
                    this.buffer[row][col] = GameOfLife.ALIVE
                    population++
                } else if (this.#rule.survive.includes(count)) {
                    const current = this.data[row][col]
                    this.buffer[row][col] = current
                    if (current === GameOfLife.ALIVE) {
                        population++
                    }
                } else {
                    this.buffer[row][col] = GameOfLife.DEAD
                }
            }
        }
        this.#population = population
        this.flush()
    }

    get rule() {
        return this.#rule
    }

    set rule(rule) {
        this.#rule = rule
    }

    get population() {
        return this.#population
    }
}
