export class GameOfLifeRule {
    #name = ''
    #description = ''
    #notation = ''

    /** @type {number[]} */
    #survive = []

    /** @type {number[]} */
    #born = []

    /** @type {string[]} */
    #colors = []

    /**
     * @param {string} name 
     * @param {string} description 
     * @param {string} notation 
     * @param {number[]} born 
     * @param {number[]} survive 
     */
    constructor(name, description, notation, born, survive, colors = []) {
        this.#name = name
        this.#description = description
        this.#notation = notation
        this.#born = born
        this.#survive = survive
        this.#colors = colors
    }

    static new({ name, description, notation, born, survive, colors = [] }) {
        return new GameOfLifeRule(name, description, notation, born, survive, colors)
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

    get colors() {
        return this.#colors
    }
}