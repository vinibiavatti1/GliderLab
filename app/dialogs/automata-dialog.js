import { App } from '../app.js'
import { ElementarRule } from '../automata/elementar/elementar-rule.js'
import { Elementar } from '../automata/elementar/elementar.js'
import { GameOfLifeRegistry } from '../automata/game-of-life/game-of-life-registry.js'
import { GameOfLifeRule } from '../automata/game-of-life/game-of-life-rule.js'
import { GameOfLife } from '../automata/game-of-life/game-of-life.js'

export class AutomataDialog {
    #tabs = {
        appGolTab: document.getElementById('app-gol-tab'),
        appElementarTab: document.getElementById('app-elementar-tab'),
        appWireWorldTab: document.getElementById('app-wire-world-tab'),
    }

    #elementarCells = {
        cell7: document.getElementById('app-elementar-cell-7'),
        cell6: document.getElementById('app-elementar-cell-6'),
        cell5: document.getElementById('app-elementar-cell-5'),
        cell4: document.getElementById('app-elementar-cell-4'),
        cell3: document.getElementById('app-elementar-cell-3'),
        cell2: document.getElementById('app-elementar-cell-2'),
        cell1: document.getElementById('app-elementar-cell-1'),
        cell0: document.getElementById('app-elementar-cell-0'),
    }

    #elementarCellTexts = {
        cell7: document.getElementById('app-elementar-cell-7-text'),
        cell6: document.getElementById('app-elementar-cell-6-text'),
        cell5: document.getElementById('app-elementar-cell-5-text'),
        cell4: document.getElementById('app-elementar-cell-4-text'),
        cell3: document.getElementById('app-elementar-cell-3-text'),
        cell2: document.getElementById('app-elementar-cell-2-text'),
        cell1: document.getElementById('app-elementar-cell-1-text'),
        cell0: document.getElementById('app-elementar-cell-0-text'),
    }

    /** @type {App} */
    #app

    /** @type {GameOfLifeRule?} */
    #selectedGolRule = GameOfLifeRegistry.GOL

    /** @type {number[]} */
    #customGolBorn = []

    /** @type {number[]} */
    #customGolSurvive = []

    #automataSelectBtn = document.getElementById('app-automata-select-btn')
    #golBornBtns = document.querySelectorAll('.app-gol-born-btn')
    #golSurviveBtns = document.querySelectorAll('.app-gol-survive-btn')
    #golRule = document.getElementById('app-gol-rule')
    #golRulePreset = document.getElementById('app-gol-rule-preset')
    #elementerRuleInput = document.getElementById('app-elementar-rule')

    /**
     * @param {App} app 
     */
    constructor(app) {
        this.#app = app
        this.#setupGameOfLifeRuleList()
        this.#setupListeners()
        this.#initElementarPreview()
        this.#initGameOfLifePreview()
    }

    #setupGameOfLifeRuleList() {
        Object.entries(GameOfLifeRegistry).forEach(([k, v]) => {
            const option = document.createElement('option')
            if (k === 'GOL') {
                option.setAttribute('selected', '')
            }
            option.setAttribute('value', k)
            option.style.color = v.colors[1]
            option.innerHTML = `${v.name} (${v.notation})`
            this.#golRule.appendChild(option)
        })
    }

    #setupListeners() {
        this.#golRule.addEventListener('change', evt => this.#handleGolRuleSelectChange(evt))
        this.#golBornBtns.forEach(btn => btn.addEventListener('click', evt => this.#handleGolBornBtns(evt)))
        this.#golSurviveBtns.forEach(btn => btn.addEventListener('click', evt => this.#handleGolSurviveBtns(evt)))
        this.#automataSelectBtn.addEventListener('click', () => this.#handleAutomataSelectBtn())
        this.#elementerRuleInput.addEventListener('input', evt => this.#handleElementarRuleInput(evt))

        document.querySelectorAll('.app-elementar-table').forEach(table => table.addEventListener('click', evt => this.#handleElementarTableClick(evt)))
    }

    #handleAutomataSelectBtn() {
        if (this.#tabs.appGolTab.classList.contains('active')) {
            if (!this.#selectedGolRule) {
                const notation = `B${this.#customGolBorn.join('')}/S${this.#customGolSurvive.join('')}`
                const colors = ['rgb(0, 0, 0)', 'rgb(255, 255, 255)']
                this.#selectedGolRule = new GameOfLifeRule('Custom', 'Custom', notation, this.#customGolBorn, this.#customGolSurvive, colors)
            }
            const automata = new GameOfLife(this.#app.rows, this.#app.cols, this.#selectedGolRule)
            this.#app.automata = automata
        } else if (this.#tabs.appElementarTab.classList.contains('active')) {
            const rule = new ElementarRule(parseInt(this.#elementerRuleInput.value))
            const automata = new Elementar(this.#app.rows, this.#app.cols, rule)
            automata.setValue(0, Math.floor(this.#app.cols / 2), Elementar.ALIVE)
            this.#app.automata = automata
        }
    }

    /**
     * @param {PointerEvent} evt 
     */
    #handleGolBornBtns(evt) {
        this.#selectedGolRule = null
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
        this.#selectedGolRule = null
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
                btn.classList.remove('active')
                const btnValue = parseInt(btn.getAttribute('data-value'))
                if (this.#selectedGolRule.born.includes(btnValue)) {
                    btn.classList.add('active')
                }
                this.#app.disableElement(btn)
            })
            this.#golSurviveBtns.forEach(btn => {
                btn.classList.remove('active')
                const btnValue = parseInt(btn.getAttribute('data-value'))
                if (this.#selectedGolRule.survive.includes(btnValue)) {
                    btn.classList.add('active')
                }
                this.#app.disableElement(btn)
            })
        }
    }

    #handleElementarRuleInput(evt) {
        this.#parseElementarRule(evt.target.value)
    }

    #parseElementarRule(value) {
        const byte = parseInt(value).toString(2).padStart(8, '0')
        Object.values(this.#elementarCells).forEach(cell => cell.classList.remove('active'))
        Object.values(this.#elementarCellTexts).forEach(cell => cell.innerHTML = '')
        byte[0] === '1' && this.#elementarCells.cell7.classList.add('active')
        byte[1] === '1' && this.#elementarCells.cell6.classList.add('active')
        byte[2] === '1' && this.#elementarCells.cell5.classList.add('active')
        byte[3] === '1' && this.#elementarCells.cell4.classList.add('active')
        byte[4] === '1' && this.#elementarCells.cell3.classList.add('active')
        byte[5] === '1' && this.#elementarCells.cell2.classList.add('active')
        byte[6] === '1' && this.#elementarCells.cell1.classList.add('active')
        byte[7] === '1' && this.#elementarCells.cell0.classList.add('active')
        this.#elementarCellTexts.cell7.innerHTML = byte[0] === '1' ? '1' : '0'
        this.#elementarCellTexts.cell6.innerHTML = byte[1] === '1' ? '1' : '0'
        this.#elementarCellTexts.cell5.innerHTML = byte[2] === '1' ? '1' : '0'
        this.#elementarCellTexts.cell4.innerHTML = byte[3] === '1' ? '1' : '0'
        this.#elementarCellTexts.cell3.innerHTML = byte[4] === '1' ? '1' : '0'
        this.#elementarCellTexts.cell2.innerHTML = byte[5] === '1' ? '1' : '0'
        this.#elementarCellTexts.cell1.innerHTML = byte[6] === '1' ? '1' : '0'
        this.#elementarCellTexts.cell0.innerHTML = byte[7] === '1' ? '1' : '0'
    }

    /**
     * @param {Event} evt 
     */
    #handleElementarTableClick(evt) {
        const el = evt.currentTarget.querySelector('.elementar-bit')
        el.innerHTML = el.innerHTML === '0' ? '1' : '0'
        let byte = ''
        byte += this.#elementarCellTexts.cell7.innerHTML
        byte += this.#elementarCellTexts.cell6.innerHTML
        byte += this.#elementarCellTexts.cell5.innerHTML
        byte += this.#elementarCellTexts.cell4.innerHTML
        byte += this.#elementarCellTexts.cell3.innerHTML
        byte += this.#elementarCellTexts.cell2.innerHTML
        byte += this.#elementarCellTexts.cell1.innerHTML
        byte += this.#elementarCellTexts.cell0.innerHTML
        const int = parseInt(byte, 2)
        this.#elementerRuleInput.value = int
        this.#elementerRuleInput.dispatchEvent(new Event('input', { bubbles: true }))
    }

    #initElementarPreview() {
        const canvas = document.getElementById('app-elementar-preview')
        const context = canvas.getContext('2d')
        const rule = new ElementarRule(30)
        const automata = new Elementar(9, 9, rule)
        automata.setValue(0, 4, Elementar.ALIVE)
        setInterval(() => {
            automata.render(context, 10)
            automata.nextGeneration()
            if (automata.generationCount >= 10) {
                automata.resetGeneration()
            }
        }, 100)
    }

    #initGameOfLifePreview() {
        const canvas = document.getElementById('app-gol-preview')
        const context = canvas.getContext('2d')
        const automata = new GameOfLife(9, 9, GameOfLifeRegistry.GOL)
        automata.setValue(0, 1, GameOfLife.ALIVE)
        automata.setValue(1, 2, GameOfLife.ALIVE)
        automata.setValue(2, 0, GameOfLife.ALIVE)
        automata.setValue(2, 1, GameOfLife.ALIVE)
        automata.setValue(2, 2, GameOfLife.ALIVE)
        setInterval(() => {
            automata.render(context, 10)
            automata.nextGeneration()
            if (automata.generationCount >= 25) {
                automata.resetGeneration()
            }
        }, 100)
    }
}