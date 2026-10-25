import { App } from '../app.js'
import { ElementaryRule } from '../automata/elementary/elementary-rule.js'
import { Elementary } from '../automata/elementary/elementary.js'
import { Entombed } from '../automata/entombed/entombed.js'
import { GameOfLifeRegistry } from '../automata/game-of-life/game-of-life-registry.js'
import { GameOfLifeRule } from '../automata/game-of-life/game-of-life-rule.js'
import { GameOfLifeSpaceshipFactory } from '../automata/game-of-life/game-of-life-spaceship-factory.js'
import { GameOfLife } from '../automata/game-of-life/game-of-life.js'
import { LangtonAnt } from '../automata/langton-ant/langton-ant.js'
import { WireWorld } from '../automata/wireworld/wireworld.js'

export class AutomataDialog {
    #tabs = {
        gameOfLifeTab: document.getElementById('app-gol-tab'),
        elementaryTab: document.getElementById('app-elementary-tab'),
        wireWorldTab: document.getElementById('app-wireworld-tab'),
        entombedTab: document.getElementById('app-entombed-tab'),
        langtonAntTab: document.getElementById('app-langton-ant-tab'),
    }

    #elementaryCells = {
        cell7: document.getElementById('app-elementary-cell-7'),
        cell6: document.getElementById('app-elementary-cell-6'),
        cell5: document.getElementById('app-elementary-cell-5'),
        cell4: document.getElementById('app-elementary-cell-4'),
        cell3: document.getElementById('app-elementary-cell-3'),
        cell2: document.getElementById('app-elementary-cell-2'),
        cell1: document.getElementById('app-elementary-cell-1'),
        cell0: document.getElementById('app-elementary-cell-0'),
    }

    #elementaryCellTexts = {
        cell7: document.getElementById('app-elementary-cell-7-text'),
        cell6: document.getElementById('app-elementary-cell-6-text'),
        cell5: document.getElementById('app-elementary-cell-5-text'),
        cell4: document.getElementById('app-elementary-cell-4-text'),
        cell3: document.getElementById('app-elementary-cell-3-text'),
        cell2: document.getElementById('app-elementary-cell-2-text'),
        cell1: document.getElementById('app-elementary-cell-1-text'),
        cell0: document.getElementById('app-elementary-cell-0-text'),
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
    #elementerRuleInput = document.getElementById('app-elementary-rule')
    #wireWorldToolsContainer = document.getElementById('app-wireworld-tools')

    /**
     * @param {App} app 
     */
    constructor(app) {
        this.#app = app
        this.#setupGameOfLifeRuleList()
        this.#setupListeners()
        this.#initElementaryPreview()
        this.#initGameOfLifePreview()
        this.#initWireWorldPreview()
        this.#initEntombedPreview()
        this.#initLangtonAntPreview()
    }

    #loadAutomata() {
        if (this.#isTabActive(this.#tabs.gameOfLifeTab)) {
            this.#loadGameOfLife()
        } else if (this.#isTabActive(this.#tabs.elementaryTab)) {
            this.#loadElementary()
        } else if (this.#isTabActive(this.#tabs.wireWorldTab)) {
            this.#loadWireWorld()
        } else if (this.#isTabActive(this.#tabs.entombedTab)) {
            this.#loadEntombed()
        } else if (this.#isTabActive(this.#tabs.langtonAntTab)) {
            this.#loadLangtonAnt()
        }
    }

    #setupGameOfLifeRuleList() {
        Object.entries(GameOfLifeRegistry).forEach(([k, v]) => {
            const option = document.createElement('option')
            if (k === 'GOL') {
                option.setAttribute('selected', '')
            }
            option.setAttribute('value', k)
            option.style.color = v.aliveColor
            option.innerHTML = `${v.name} (${v.notation})`
            this.#golRule.appendChild(option)
        })
    }

    #setupListeners() {
        this.#golRule.addEventListener('change', evt => this.#handleGolRuleSelectChange(evt))
        this.#golBornBtns.forEach(btn => btn.addEventListener('click', evt => this.#handleGolBornBtns(evt)))
        this.#golSurviveBtns.forEach(btn => btn.addEventListener('click', evt => this.#handleGolSurviveBtns(evt)))
        this.#automataSelectBtn.addEventListener('click', () => this.#handleAutomataSelectBtn())
        this.#elementerRuleInput.addEventListener('input', evt => this.#handleElementaryRuleInput(evt))

        document.querySelectorAll('.app-elementary-table').forEach(table => table.addEventListener('click', evt => this.#handleElementaryTableClick(evt)))
    }

    #handleAutomataSelectBtn() {
        this.#loadAutomata()
        if (this.#isTabActive(this.#tabs.wireWorldTab)) {
            this.#showElement(this.#wireWorldToolsContainer)
        } else {
            this.#hideElement(this.#wireWorldToolsContainer)
        }
    }

    #loadGameOfLife() {
        if (!this.#selectedGolRule) {
            const notation = `B${this.#customGolBorn.join('')}/S${this.#customGolSurvive.join('')}`
            this.#selectedGolRule = GameOfLifeRule.newCustom({
                notation: notation,
                born: this.#customGolBorn,
                survive: this.#customGolSurvive,
            })
        }
        const automata = new GameOfLife(this.#app.rows, this.#app.cols, this.#selectedGolRule)
        this.#app.automata = automata
    }

    #loadElementary() {
        const rule = new ElementaryRule(parseInt(this.#elementerRuleInput.value))
        const automata = new Elementary(this.#app.rows, this.#app.cols, rule)
        automata.setValue(0, Math.floor(this.#app.cols / 2), Elementary.ALIVE)
        this.#app.automata = automata
    }

    #loadWireWorld() {
        const automata = new WireWorld(this.#app.rows, this.#app.cols)
        this.#app.automata = automata
        document.getElementById('app-btn-wireworld-conductor').dispatchEvent(new Event('click', { bubbles: true }))
    }

    #loadEntombed() {
        const automata = new Entombed(this.#app.rows, this.#app.cols)
        this.#app.automata = automata
    }

    #loadLangtonAnt() {
        const automata = new LangtonAnt(this.#app.rows, this.#app.cols)
        automata.setValue(Math.floor(this.#app.rows / 2), Math.floor(this.#app.cols / 2), LangtonAnt.ANT)
        this.#app.automata = automata
    }

    /**
     * @param {HTMLElement} element 
     */
    #showElement(element) {
        element.style.display = 'inline-block'
    }

    /**
     * @param {HTMLElement} element 
     */
    #hideElement(element) {
        element.style.display = 'none'
    }

    /**
     * @param {HTMLElement} tab 
     * @returns {boolean}
     */
    #isTabActive(tab) {
        return tab.classList.contains('active')
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

    #handleElementaryRuleInput(evt) {
        this.#parseElementaryRule(evt.target.value)
    }

    #parseElementaryRule(value) {
        const byte = parseInt(value).toString(2).padStart(8, '0')
        Object.values(this.#elementaryCells).forEach(cell => cell.classList.remove('active'))
        Object.values(this.#elementaryCellTexts).forEach(cell => cell.innerHTML = '')
        byte[0] === '1' && this.#elementaryCells.cell7.classList.add('active')
        byte[1] === '1' && this.#elementaryCells.cell6.classList.add('active')
        byte[2] === '1' && this.#elementaryCells.cell5.classList.add('active')
        byte[3] === '1' && this.#elementaryCells.cell4.classList.add('active')
        byte[4] === '1' && this.#elementaryCells.cell3.classList.add('active')
        byte[5] === '1' && this.#elementaryCells.cell2.classList.add('active')
        byte[6] === '1' && this.#elementaryCells.cell1.classList.add('active')
        byte[7] === '1' && this.#elementaryCells.cell0.classList.add('active')
        this.#elementaryCellTexts.cell7.innerHTML = byte[0] === '1' ? '1' : '0'
        this.#elementaryCellTexts.cell6.innerHTML = byte[1] === '1' ? '1' : '0'
        this.#elementaryCellTexts.cell5.innerHTML = byte[2] === '1' ? '1' : '0'
        this.#elementaryCellTexts.cell4.innerHTML = byte[3] === '1' ? '1' : '0'
        this.#elementaryCellTexts.cell3.innerHTML = byte[4] === '1' ? '1' : '0'
        this.#elementaryCellTexts.cell2.innerHTML = byte[5] === '1' ? '1' : '0'
        this.#elementaryCellTexts.cell1.innerHTML = byte[6] === '1' ? '1' : '0'
        this.#elementaryCellTexts.cell0.innerHTML = byte[7] === '1' ? '1' : '0'
    }

    /**
     * @param {Event} evt 
     */
    #handleElementaryTableClick(evt) {
        const el = evt.currentTarget.querySelector('.elementary-bit')
        el.innerHTML = el.innerHTML === '0' ? '1' : '0'
        let byte = ''
        byte += this.#elementaryCellTexts.cell7.innerHTML
        byte += this.#elementaryCellTexts.cell6.innerHTML
        byte += this.#elementaryCellTexts.cell5.innerHTML
        byte += this.#elementaryCellTexts.cell4.innerHTML
        byte += this.#elementaryCellTexts.cell3.innerHTML
        byte += this.#elementaryCellTexts.cell2.innerHTML
        byte += this.#elementaryCellTexts.cell1.innerHTML
        byte += this.#elementaryCellTexts.cell0.innerHTML
        const int = parseInt(byte, 2)
        this.#elementerRuleInput.value = int
        this.#elementerRuleInput.dispatchEvent(new Event('input', { bubbles: true }))
    }

    #initGameOfLifePreview() {
        const canvas = document.getElementById('app-gol-preview')
        const context = canvas.getContext('2d')
        const automata = new GameOfLife(9, 9, GameOfLifeRegistry.GOL)
        GameOfLifeSpaceshipFactory.buildGlider(automata, 0, 0)
        setInterval(() => {
            automata.render(context, 10)
            automata.nextGeneration()
            if (automata.generationCount >= 25) {
                automata.resetGeneration()
            }
        }, 100)
    }

    #initElementaryPreview() {
        const canvas = document.getElementById('app-elementary-preview')
        const context = canvas.getContext('2d')
        const rule = new ElementaryRule(30)
        const automata = new Elementary(9, 9, rule)
        automata.setValue(0, 4, Elementary.ALIVE)
        setInterval(() => {
            automata.render(context, 10)
            automata.nextGeneration()
            if (automata.generationCount >= 10) {
                automata.resetGeneration()
            }
        }, 100)
    }

    #initWireWorldPreview() {
        const canvas = document.getElementById('app-wireworld-preview')
        const context = canvas.getContext('2d')
        const automata = new WireWorld(9, 9)
        automata.setValue(2, 0, WireWorld.CONDUCTOR)
        automata.setValue(2, 1, WireWorld.CONDUCTOR)
        automata.setValue(2, 2, WireWorld.CONDUCTOR)
        automata.setValue(2, 3, WireWorld.CONDUCTOR)
        automata.setValue(2, 4, WireWorld.CONDUCTOR)
        automata.setValue(2, 6, WireWorld.CONDUCTOR)
        automata.setValue(2, 7, WireWorld.CONDUCTOR)
        automata.setValue(2, 8, WireWorld.CONDUCTOR)
        automata.setValue(1, 4, WireWorld.CONDUCTOR)
        automata.setValue(1, 5, WireWorld.CONDUCTOR)
        automata.setValue(3, 4, WireWorld.CONDUCTOR)
        automata.setValue(3, 5, WireWorld.CONDUCTOR)
        automata.setValue(2, 0, WireWorld.ELECTRON_HEAD)
        automata.setValue(6, 0, WireWorld.CONDUCTOR)
        automata.setValue(6, 1, WireWorld.CONDUCTOR)
        automata.setValue(6, 2, WireWorld.CONDUCTOR)
        automata.setValue(6, 3, WireWorld.CONDUCTOR)
        automata.setValue(6, 5, WireWorld.CONDUCTOR)
        automata.setValue(6, 6, WireWorld.CONDUCTOR)
        automata.setValue(6, 7, WireWorld.CONDUCTOR)
        automata.setValue(6, 8, WireWorld.CONDUCTOR)
        automata.setValue(5, 3, WireWorld.CONDUCTOR)
        automata.setValue(5, 4, WireWorld.CONDUCTOR)
        automata.setValue(7, 3, WireWorld.CONDUCTOR)
        automata.setValue(7, 4, WireWorld.CONDUCTOR)
        automata.setValue(6, 8, WireWorld.ELECTRON_HEAD)
        setInterval(() => {
            automata.render(context, 10)
            automata.nextGeneration()
            if (automata.generationCount >= 12) {
                automata.resetGeneration()
            }
        }, 100)
    }

    #initEntombedPreview() {
        const canvas = document.getElementById('app-entombed-preview')
        const context = canvas.getContext('2d')
        const automata = new Entombed(9, 9)
        setInterval(() => {
            automata.render(context, 10)
            automata.nextGeneration()
            if (automata.generationCount >= 11) {
                automata.resetGeneration()
            }
        }, 100)
    }

    #initLangtonAntPreview() {
        const canvas = document.getElementById('app-langton-ant-preview')
        const context = canvas.getContext('2d')
        const automata = new LangtonAnt(9, 9)
        automata.setValue(4, 4, LangtonAnt.ANT)
        setInterval(() => {
            automata.render(context, 10)
            automata.nextGeneration()
            if (automata.generationCount >= 100) {
                automata.resetGeneration()
            }
        }, 100)
    }
}