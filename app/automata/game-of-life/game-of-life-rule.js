export class GameOfLifeRule {
    #name = ''
    #description = ''
    #notation = ''
    #aliveColor = ''
    #deadColor = ''

    /** @type {number[]} */
    #survive = []

    /** @type {number[]} */
    #born = []

    /**
     * @param {string} name 
     * @param {string} description 
     * @param {string} notation 
     * @param {number[]} born 
     * @param {number[]} survive 
     * @param {string}
     * @param {string}
     */
    constructor(name, description, notation, born, survive, aliveColor, deadColor) {
        this.#name = name
        this.#description = description
        this.#notation = notation
        this.#born = born
        this.#survive = survive
        this.#aliveColor = aliveColor
        this.#deadColor = deadColor
    }

    static new({ name, description, notation, born, survive, aliveColor, deadColor }) {
        return new GameOfLifeRule(name, description, notation, born, survive, aliveColor, deadColor)
    }

    get name() {
        return this.#name
    }

    get description() {
        return this.#description
    }

    get notation() {
        return this.#notation
    }

    get survive() {
        return this.#survive
    }

    get born() {
        return this.#born
    }

    get aliveColor() {
        return this.#aliveColor
    }

    get deadColor() {
        return this.#deadColor
    }
}