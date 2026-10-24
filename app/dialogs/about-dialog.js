import { GameOfLife } from '../automata/game-of-life/game-of-life.js'
import { GameOfLifeRegistry } from '../automata/game-of-life/game-of-life-registry.js'
import { GameOfLifeSpaceshipFactory } from '../automata/game-of-life/game-of-life-spaceship-factory.js'
import { VERSION } from '../../version.js'

export class AboutDialog {
    #versionLabel = document.getElementById('app-version')
    #aboutBtn = document.getElementById('app-btn-about')
    #startChaosBtn = document.getElementById('easter-egg-btn')
    #goBtn = document.getElementById('app-go-btn')

    /** @type {GameOfLife} */
    #automata = null

    constructor() {
        this.#versionLabel.innerHTML = VERSION.toString()
        this.#showWelcome()
        this.#initGameOfLifeDisplay()
        this.#startChaosBtn.addEventListener('click', () => this.#startChaos())
        this.#goBtn.addEventListener('click', () => this.#handleBtnGo())
    }

    #showWelcome() {
        const firstTime = localStorage.getItem('welcome') !== 'true'
        if (firstTime) {
            this.#aboutBtn.dispatchEvent(new Event('click', { bubbles: true }))
        }
    }

    #initGameOfLifeDisplay() {
        const canvas = document.getElementById('app-gol-about-display')
        const context = canvas.getContext('2d')
        this.#automata = new GameOfLife(25, 150, GameOfLifeRegistry.GOL)
        GameOfLifeSpaceshipFactory.buildLWSS(this.#automata, 8, 8, 180)
        GameOfLifeSpaceshipFactory.buildLWSS(this.#automata, 15, 7, 0)
        GameOfLifeSpaceshipFactory.buildLWSS(this.#automata, 15, 80, 0)
        GameOfLifeSpaceshipFactory.buildGlider(this.#automata, 0, 80)
        GameOfLifeSpaceshipFactory.buildGlider(this.#automata, 11, 40, 90)
        GameOfLifeSpaceshipFactory.buildGlider(this.#automata, 22, 16, 180)
        setInterval(() => {
            this.#automata.render(context, 10)
            this.#automata.nextGeneration()
            if (this.#automata.generationCount >= 1_000_000) {
                this.#automata.resetGeneration()
            }
        }, 100)
    }

    #handleBtnGo() {
        localStorage.setItem('welcome', 'true')
    }

    #startChaos() {
        if (Math.random() < 0.5) {
            GameOfLifeSpaceshipFactory.buildLWSS(this.#automata, Math.floor(Math.random() * 25), Math.floor(Math.random() * 150))
        } else {
            GameOfLifeSpaceshipFactory.buildGlider(this.#automata, Math.floor(Math.random() * 25), Math.floor(Math.random() * 150))
        }
    }
}