import { Display } from './display.js'
import { AbstractAutomata } from './automata/abstract-automata.js'
import { AppError } from './app-error.js'
import { Editor } from './editor.js'

export class App {
    /** @type {AbstractAutomata} */
    #automata = null

    /** @type {number?} */
    #generationInterval = null

    /** @type {Display} */
    #display

    /** @type {Editor} */
    #editor

    #rows = 0
    #cols = 0
    #tileSize = 0
    #colors = ['rgb(0, 0, 0)', 'rgb(0, 180, 0)']
    #defaultColor = 'rgb(0, 180, 0)'

    /**
     * @param {number} rows 
     * @param {number} cols 
     * @param {number} tileSize 
     */
    constructor(rows, cols, tileSize) {
        this.#display = new Display(this)
        this.#editor = new Editor(this)
        this.resize(rows, cols, tileSize)
    }

    /**
     * @param {number} delay 
     */
    startAutoGeneration(delay) {
        if (!this.#automata) {
            throw new AppError('Automata not set')
        }
        this.stopAutoGeneration()
        this.#generationInterval = setInterval(() => {
            this.#automata.nextGeneration()
        }, delay)
    }

    stopAutoGeneration() {
        if (this.#generationInterval != null) {
            clearInterval(this.#generationInterval)
        }
    }

    nextGeneration() {
        if (!this.#automata) {
            throw new AppError('Automata not set')
        }
        this.#automata.nextGeneration()
    }

    resetGeneration() {
        if (!this.#automata) {
            throw new AppError('Automata not set')
        }
        this.#automata.resetGeneration()
    }

    /**
     * @param {number} rows 
     * @param {number} cols 
     * @param {number} tileSize
     */
    resize(rows, cols, tileSize) {
        this.#rows = rows
        this.#cols = cols
        this.#tileSize = tileSize
        if (this.#automata) {
            this.#automata.resize(rows, cols)
        }
        this.#display.resize(rows, cols)
    }

    /**
     * @param {number} value
     * @returns {string} 
     */
    getValueColor(value) {
        if (value < this.#colors.length) {
            return this.#colors[value]
        }
        return this.#defaultColor
    }

    set automata(automata) {
        this.#automata = automata
        this.#display.resize(this.#rows, this.#cols, this.#tileSize)
    }

    get automata() {
        return this.#automata
    }

    get display() {
        return this.#display
    }

    get editor() {
        return this.#editor
    }

    get colors() {
        return this.#colors
    }

    get rows() {
        return this.#rows
    }

    get cols() {
        return this.#cols
    }

    get tileSize() {
        return this.#tileSize
    }
}










// /** @enum {number} */
// const EditorState = Object.freeze({
//     STOPPED: 0,
//     RUNNING: 1,
//     PAUSED: 2,
//     STEPPING: 3
// })


//     #generationTick() {
//         this.#automata.nextGeneration()

//         this.#renderer.render()
//         if (this.#editorState === EditorState.RUNNING) {
//             this.#automata.getBaseAutomata().nextGeneration()
//             this.#labels.labelGenerationCount.innerHTML = this.#automata.getBaseAutomata().getGenerationCount()
//         }
//     }






//     #buttons = {
//         btnAutomata: document.getElementById('app-btn-automata'),
//         btnOpen: document.getElementById('app-btn-open'),
//         btnSave: document.getElementById('app-btn-save'),
//         btnPlay: document.getElementById('app-btn-play'),
//         btnPause: document.getElementById('app-btn-pause'),
//         btnStop: document.getElementById('app-btn-stop'),
//         btnStep: document.getElementById('app-btn-step'),
//         btn1x: document.getElementById('app-btn-1x'),
//         btn2x: document.getElementById('app-btn-2x'),
//         btn4x: document.getElementById('app-btn-4x'),
//         btn8x: document.getElementById('app-btn-8x'),
//         btn16x: document.getElementById('app-btn-16x'),
//         btnUndo: document.getElementById('app-btn-undo'),
//         btnRedo: document.getElementById('app-btn-redo'),
//         btnPencil: document.getElementById('app-btn-pencil'),
//         btnLine: document.getElementById('app-btn-line'),
//         btnRect: document.getElementById('app-btn-rect'),
//         btnBucket: document.getElementById('app-btn-bucket'),
//         btnSelection: document.getElementById('app-btn-selection'),
//         btnEraser: document.getElementById('app-btn-eraser'),
//         btnSettings: document.getElementById('app-btn-settings'),
//         btnTheme: document.getElementById('app-btn-theme'),
//     }

//     #labels = {
//         labelGenerationCount: document.getElementById('app-generation-count'),
//     }

//     #tileSize = 10
//     #rows = 50
//     #cols = 100
//     #editorState = EditorState.STOPPED

//     /** @type {import('./display.js').Renderer} */
//     #renderer = null

//     /** @type {import('./automata.js').BaseAutomata} */
//     #automata = null

//     /** @type {number?} */
//     #interval = null

//     constructor() {
//         this.#renderer = new Renderer(this, this.#cols, this.#rows, this.#tileSize)
//         this.#setupListeners()
//     }

//     start() {
//         const rule = GameOfLifeRules.GOL
//         this.#automata = createGameOfLife(this.#cols, this.#rows, rule)
//         const offsetRows = 21;
//         const offsetCols = 46;
//         this.#automata.getBaseAutomata().setCellState(0 + offsetRows, 1 + offsetCols, GameOfLifeCellState.ALIVE);
//         this.#automata.getBaseAutomata().setCellState(1 + offsetRows, 3 + offsetCols, GameOfLifeCellState.ALIVE);
//         this.#automata.getBaseAutomata().setCellState(2 + offsetRows, 0 + offsetCols, GameOfLifeCellState.ALIVE);
//         this.#automata.getBaseAutomata().setCellState(2 + offsetRows, 1 + offsetCols, GameOfLifeCellState.ALIVE);
//         this.#automata.getBaseAutomata().setCellState(2 + offsetRows, 4 + offsetCols, GameOfLifeCellState.ALIVE);
//         this.#automata.getBaseAutomata().setCellState(2 + offsetRows, 5 + offsetCols, GameOfLifeCellState.ALIVE);
//         this.#automata.getBaseAutomata().setCellState(2 + offsetRows, 6 + offsetCols, GameOfLifeCellState.ALIVE);
//         this.#tick()
//         this.#recreateLoop(100)
//     }

//     #recreateLoop(delay) {
//         if (this.#interval !== null) {
//             clearInterval(this.#interval)
//         }
//         this.#interval = setInterval(() => this.#tick(), delay)
//     }

//     #tick() {
//         this.#renderer.render()
//         if (this.#editorState === EditorState.RUNNING) {
//             this.#automata.getBaseAutomata().nextGeneration()
//             this.#labels.labelGenerationCount.innerHTML = this.#automata.getBaseAutomata().getGenerationCount()
//         }
//     }

//     #resize(rows, cols, tileSize) {
//         this.#rows = rows
//         this.#cols = cols
//         this.#tileSize = tileSize
//         this.#renderer.resize(rows, cols, tileSize)
//     }

//     #disableButtons() {
//         Object.values(this.#buttons)
//             .filter(btn => !btn.hasAttribute('disabled'))
//             .map(btn => btn.setAttribute('disabled', ''))
//     }

//     #enableButtons() {
//         Object.values(this.#buttons)
//             .filter(btn => btn.hasAttribute('disabled'))
//             .map(btn => btn.removeAttribute('disabled'))
//     }

//     #btnPlayHandler() {
//         if (!automata) {
//             alert('Automata not set')
//             return
//         }
//         this.#disableButtons()
//         this.#editorState = EditorState.RUNNING
//         this.#buttons.btnStop.removeAttribute('disabled')
//         this.#buttons.btnPause.removeAttribute('disabled')
//         this.#buttons.btnStep.removeAttribute('disabled')
//     }

//     #btnPauseHandler() {
//         this.#editorState = EditorState.PAUSED
//         this.#buttons.btnPlay.removeAttribute('disabled')
//         this.#buttons.btnPause.setAttribute('disabled', '')
//     }

//     #btnStopHandler() {
//         clearInterval(interval)
//         this.#editorState = EditorState.STOPPED
//         this.#labels.labelGenerationCount.innerHTML = 0
//         this.#automata.getBaseAutomata().resetGeneration()
//         this.#enableButtons()
//         this.#buttons.btnStop.setAttribute('disabled', '')
//         this.#buttons.btnPause.setAttribute('disabled', '')
//     }

//     #btnStepHandler() {
//         if (this.#editorState === EditorState.STEPPING) {
//             this.#automata.getBaseAutomata().nextGeneration()
//             this.#labels.labelGenerationCount.innerHTML = this.#automata.getBaseAutomata().getGenerationCount()
//             return
//         }
//         this.#editorState = EditorState.STEPPING
//         this.#disableButtons()
//         this.#buttons.btnStep.removeAttribute('disabled')
//         this.#buttons.btnStop.removeAttribute('disabled')
//         this.#buttons.btnPlay.removeAttribute('disabled')
//         this.#automata.getBaseAutomata().nextGeneration()
//         this.#labels.labelGenerationCount.innerHTML = this.#automata.getBaseAutomata().getGenerationCount()
//     }

//     #setupListeners() {
//         this.#buttons.btnPlay.addEventListener('click', this.#btnPlayHandler)
//         this.#buttons.btnPause.addEventListener('click', this.#btnPauseHandler)
//         this.#buttons.btnStop.addEventListener('click', this.#btnStopHandler)
//         this.#buttons.btnStep.addEventListener('click', this.#btnStepHandler)
//     }

//     get automata() {
//         return this.#automata
//     }








// /**
//  * @returns {Application}
//  */
// export const createApp = () => {

//     /** @type {object} */
//     const buttons = {
//         btnAutomata: document.getElementById('app-btn-automata'),
//         btnOpen: document.getElementById('app-btn-open'),
//         btnSave: document.getElementById('app-btn-save'),
//         btnPlay: document.getElementById('app-btn-play'),
//         btnPause: document.getElementById('app-btn-pause'),
//         btnStop: document.getElementById('app-btn-stop'),
//         btnStep: document.getElementById('app-btn-step'),
//         btn1x: document.getElementById('app-btn-1x'),
//         btn2x: document.getElementById('app-btn-2x'),
//         btn4x: document.getElementById('app-btn-4x'),
//         btn8x: document.getElementById('app-btn-8x'),
//         btn16x: document.getElementById('app-btn-16x'),
//         btnUndo: document.getElementById('app-btn-undo'),
//         btnRedo: document.getElementById('app-btn-redo'),
//         btnPencil: document.getElementById('app-btn-pencil'),
//         btnLine: document.getElementById('app-btn-line'),
//         btnRect: document.getElementById('app-btn-rect'),
//         btnBucket: document.getElementById('app-btn-bucket'),
//         btnSelection: document.getElementById('app-btn-selection'),
//         btnEraser: document.getElementById('app-btn-eraser'),
//         btnSettings: document.getElementById('app-btn-settings'),
//         btnTheme: document.getElementById('app-btn-theme'),
//     }

//     /** @type {object} */
//     const labels = {
//         labelGenerationCount: document.getElementById('app-generation-count'),
//     }


//     const tileSize = 10


//     let rows = 50

//     /** @type {number} */
//     let cols = 100

//     /** @type {import('./renderer.js').Renderer} */
//     const renderer = null

//     /** @type {EditorState} */
//     let editorState = EditorState.STOPPED

//     /** @type {import('./automata.js').BaseAutomata} */
//     let automata = null

//     /** @type {number} */
//     let interval = null

//     /** @returns {void} */
//     const disableButtons = () => Object.values(buttons)
//         .filter(btn => !btn.hasAttribute('disabled'))
//         .map(btn => btn.setAttribute('disabled', ''))

//     /** @returns {void} */
//     const enableButtons = () => Object.values(buttons)
//         .filter(btn => btn.hasAttribute('disabled'))
//         .map(btn => btn.removeAttribute('disabled'))

//     /** @returns {void} */
//     const btnPlayHandler = () => {
//         if (!automata) {
//             alert('Automata not set')
//             return
//         }
//         disableButtons()
//         editorState = EditorState.RUNNING
//         buttons.btnStop.removeAttribute('disabled')
//         buttons.btnPause.removeAttribute('disabled')
//         buttons.btnStep.removeAttribute('disabled')
//     }

//     /** @returns {void} */
//     const btnPauseHandler = () => {
//         editorState = EditorState.PAUSED
//         buttons.btnPlay.removeAttribute('disabled')
//         buttons.btnPause.setAttribute('disabled', '')
//     }

//     /** @returns {void} */
//     const btnStopHandler = () => {
//         clearInterval(interval)
//         editorState = EditorState.STOPPED
//         labels.labelGenerationCount.innerHTML = 0
//         automata.getBaseAutomata().resetGeneration()
//         enableButtons()
//         buttons.btnStop.setAttribute('disabled', '')
//         buttons.btnPause.setAttribute('disabled', '')
//     }

//     /** @returns {void} */
//     const btnStepHandler = () => {
//         if (editorState === EditorState.STEPPING) {
//             automata.getBaseAutomata().nextGeneration()
//             labels.labelGenerationCount.innerHTML = automata.getBaseAutomata().getGenerationCount()
//             return
//         }
//         editorState = EditorState.STEPPING
//         disableButtons()
//         buttons.btnStep.removeAttribute('disabled')
//         buttons.btnStop.removeAttribute('disabled')
//         buttons.btnPlay.removeAttribute('disabled')
//         automata.getBaseAutomata().nextGeneration()
//         labels.labelGenerationCount.innerHTML = automata.getBaseAutomata().getGenerationCount()
//     }

//     /** @returns {void} */
//     const setupListeners = () => {
//         buttons.btnPlay.addEventListener('click', btnPlayHandler)
//         buttons.btnPause.addEventListener('click', btnPauseHandler)
//         buttons.btnStop.addEventListener('click', btnStopHandler)
//         buttons.btnStep.addEventListener('click', btnStepHandler)
//     }

//     /**
//      * @param {number} delay
//      * @returns {void}
//      */
//     const recreateLoop = delay => {
//         if (interval !== null) {
//             clearInterval(interval)
//         }
//         interval = setInterval(() => tick(), delay)
//     }

//     /** @returns {void} */
//     const tick = () => {
//         renderer.render()
//         if (editorState === EditorState.RUNNING) {
//             automata.getBaseAutomata().nextGeneration()
//             labels.labelGenerationCount.innerHTML = automata.getBaseAutomata().getGenerationCount()
//         }
//     }

//     /** @returns {void} */
//     /*const render = () => {
//         renderer.clear()
//         renderer.renderAutomata(automata.getBaseAutomata())
//         renderer.renderGrid()
//     }*/

//     /** @returns {void} */
//     const start = () => {
//         setupListeners()
//         const rule = GameOfLifeRules.GOL
//         automata = createGameOfLife(cols, rows, rule)
//         const offsetRows = 21;
//         const offsetCols = 46;
//         automata.getBaseAutomata().setCellState(0 + offsetRows, 1 + offsetCols, GameOfLifeCellState.ALIVE);
//         automata.getBaseAutomata().setCellState(1 + offsetRows, 3 + offsetCols, GameOfLifeCellState.ALIVE);
//         automata.getBaseAutomata().setCellState(2 + offsetRows, 0 + offsetCols, GameOfLifeCellState.ALIVE);
//         automata.getBaseAutomata().setCellState(2 + offsetRows, 1 + offsetCols, GameOfLifeCellState.ALIVE);
//         automata.getBaseAutomata().setCellState(2 + offsetRows, 4 + offsetCols, GameOfLifeCellState.ALIVE);
//         automata.getBaseAutomata().setCellState(2 + offsetRows, 5 + offsetCols, GameOfLifeCellState.ALIVE);
//         automata.getBaseAutomata().setCellState(2 + offsetRows, 6 + offsetCols, GameOfLifeCellState.ALIVE);
//         tick()
//         recreateLoop(100)
//     }

//     /** @returns {automata} */
//     const getAutomata = () => automata

//     const app = {
//         start,
//         getAutomata
//     }

//     app.renderer = createRenderer(app, cols, rows, tileSize)

//     return app
// }
