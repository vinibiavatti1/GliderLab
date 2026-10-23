import { App } from '../app.js'
import { GameOfLifeRegistry } from '../automata/game-of-life/game-of-life-registry.js'
import { GameOfLifeRule } from '../automata/game-of-life/game-of-life-rule.js'
import { GameOfLife } from '../automata/game-of-life/game-of-life.js'

export class AutomataDialog {
    /** @type {App} */
    #app

    #golBornBtns = document.querySelectorAll('.app-gol-born-btn')
    #golSurviveBtns = document.querySelectorAll('.app-gol-survive-btn')
    #golRule = document.getElementById('app-gol-rule')
    #golRulePreset = document.getElementById('app-gol-rule-preset')
    #automataSelectBtn = document.getElementById('app-automata-select-btn')

    /** @type {GameOfLifeRule?} */
    #selectedGolRule = null

    /** @type {number[]} */
    #customGolBorn = []

    /** @type {number[]} */
    #customGolSurvive = []

    /**
     * @param {App} app 
     */
    constructor(app) {
        this.#app = app
        this.#setupGameOfLifeRuleList()
        this.#setupListeners()
    }

    #setupGameOfLifeRuleList() {
        Object.entries(GameOfLifeRegistry).forEach(([k, v]) => {
            const option = document.createElement('option')
            option.setAttribute('value', k)
            option.innerHTML = `${v.name} (${v.notation})`
            this.#golRule.appendChild(option)
        })
    }

    #setupListeners() {
        this.#golRule.addEventListener('change', evt => this.#handleGolRuleSelectChange(evt))
        this.#golBornBtns.forEach(btn => btn.addEventListener('click', evt => this.#handleGolBornBtns(evt)))
        this.#golSurviveBtns.forEach(btn => btn.addEventListener('click', evt => this.#handleGolSurviveBtns(evt)))
        this.#automataSelectBtn.addEventListener('click', () => this.#handleAutomataSelectBtn())
    }

    #handleAutomataSelectBtn() {
        if (!this.#selectedGolRule) {
            const notation = `B${this.#customGolBorn.join('')}/S${this.#customGolSurvive.join('')}`
            this.#selectedGolRule = new GameOfLifeRule('Custom', '', notation, this.#customGolBorn, this.#customGolSurvive, 'rgb(255, 255, 255)')
        }
        const automata = new GameOfLife(this.#app.rows, this.#app.cols, this.#selectedGolRule)
        this.#app.automata = automata
    }

    /**
     * @param {PointerEvent} evt 
     */
    #handleGolBornBtns(evt) {
        if (this.#selectedGolRule) {
            return
        }
        const value = parseInt(evt.target.getAttribute('data-value'))
        if (!evt.target.classList.contains('active')) {
            evt.target.classList.add('active')
            this.#customGolBorn.push(value)
        } else {
            evt.target.classList.remove('active')
            this.#customGolBorn = this.#customGolBorn.filter(x => x !== value)
        }
    }

    /**
     * @param {PointerEvent} evt 
     */
    #handleGolSurviveBtns(evt) {
        if (this.#selectedGolRule) {
            return
        }
        const value = parseInt(evt.target.getAttribute('data-value'))
        if (!evt.target.classList.contains('active')) {
            evt.target.classList.add('active')
            this.#customGolSurvive.push(value)
        } else {
            evt.target.classList.remove('active')
            this.#customGolSurvive = this.#customGolSurvive.filter(x => x !== value)
        }
    }

    /**
     * @param {Event} evt 
     */
    #handleGolRuleSelectChange(evt) {
        const value = evt.target.value
        if (value === 'custom') {
            this.#selectedGolRule = null
            this.#customGolBorn = []
            this.#customGolSurvive = []
            this.#app.disableElement(this.#golRulePreset)
            this.#golBornBtns.forEach(btn => {
                btn.classList.remove('active')
                this.#app.enableElement(btn)
            })
            this.#golSurviveBtns.forEach(btn => {
                btn.classList.remove('active')
                this.#app.enableElement(btn)
            })
        } else {
            this.#golRulePreset.value = 'empty'
            this.#app.enableElement(this.#golRulePreset)
            if (!Object.hasOwn(GameOfLifeRegistry, value)) {
                throw new AppError('Rule not found: ' + value)
            }
            this.#selectedGolRule = GameOfLifeRegistry[value]
            this.#golBornBtns.forEach(btn => {
                const btnValue = parseInt(btn.getAttribute('data-value'))
                if (this.#selectedGolRule.born.includes(btnValue)) {
                    btn.classList.add('active')
                }
                this.#app.disableElement(btn)
            })
            this.#golSurviveBtns.forEach(btn => {
                const btnValue = parseInt(btn.getAttribute('data-value'))
                if (this.#selectedGolRule.survive.includes(btnValue)) {
                    btn.classList.add('active')
                }
                this.#app.disableElement(btn)
            })
        }
    }
}