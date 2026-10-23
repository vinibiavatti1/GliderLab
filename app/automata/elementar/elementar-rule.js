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
        const byte = this.#number.toString(2).padStart(8, '0')
        this.#binary = byte
        this.#map = new Map()
        this.#map.set('000', byte[7] === '1' ? 1 : 0)
        this.#map.set('001', byte[6] === '1' ? 1 : 0)
        this.#map.set('010', byte[5] === '1' ? 1 : 0)
        this.#map.set('011', byte[4] === '1' ? 1 : 0)
        this.#map.set('100', byte[3] === '1' ? 1 : 0)
        this.#map.set('101', byte[2] === '1' ? 1 : 0)
        this.#map.set('110', byte[1] === '1' ? 1 : 0)
        this.#map.set('111', byte[0] === '1' ? 1 : 0)
    }

    get number() {
        return this.#number
    }
}