export class ElementarRule {
    /** @type {number} */
    #number

    /** @type {string} */
    #binary

    /** @type {Map<string, number>} */
    #map

    /**
     * @param {string} number 
     */
    constructor(number) {
        this.#number = number
        this.#generateMap()
    }

    /**
     * @param {number} left 
     * @param {number} middle 
     * @param {number} right
     * @param {number} 
     */
    evaluate(left, middle, right) {
        return this.#map.get(left.toString() + middle.toString() + right.toString())
    }

    #generateMap() {
        const binary = this.#number.toString(2).padStart(8, '0')
        this.#binary = binary
        this.#map = new Map()
        this.#map.set('000', binary[7] === '1' ? 1 : 0)
        this.#map.set('001', binary[6] === '1' ? 1 : 0)
        this.#map.set('010', binary[5] === '1' ? 1 : 0)
        this.#map.set('011', binary[4] === '1' ? 1 : 0)
        this.#map.set('100', binary[3] === '1' ? 1 : 0)
        this.#map.set('101', binary[2] === '1' ? 1 : 0)
        this.#map.set('110', binary[1] === '1' ? 1 : 0)
        this.#map.set('111', binary[0] === '1' ? 1 : 0)
    }

    get number() {
        return this.#number
    }
}