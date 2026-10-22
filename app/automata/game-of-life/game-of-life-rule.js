export class GameOfLifeRule {
    #name = ''
    #description = ''
    #notation = ''

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
     */
    constructor(name, description, notation, born, survive) {
        this.#name = name
        this.#description = description
        this.#notation = notation
        this.#born = born
        this.#survive = survive
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
}