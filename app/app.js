import { AppError } from "./app-error.js"
import { Display } from "./display.js"
import { BucketTool } from "./tools/bucket-tool.js"
import { LineTool } from "./tools/line-tool.js"
import { PencilTool } from "./tools/pencil-tool.js"
import { RectFillTool } from "./tools/rect-fill-tool.js"
import { RectTool } from "./tools/rect-tool.js"
import { Tool } from "./tools/tool.js"

export class App {
    static STATE_STOPPED = 0
    static STATE_RUNNING = 1
    static STATE_PAUSED = 2
    static STATE_STEPPING = 3

    /** @type {AbstractAutomata} */
    #automata = null

    /** @type {number?} */
    #generationInterval = null

    /** @type {Display} */
    #display

    #tools = {
        pencil: new PencilTool(this),
        line: new LineTool(this),
        rect: new RectTool(this),
        rectFill: new RectFillTool(this),
        bucket: new BucketTool(this),
    }

    #buttons = {
        automataBtn: document.getElementById('app-btn-automata'),
        openBtn: document.getElementById('app-btn-open'),
        saveBtn: document.getElementById('app-btn-save'),
        playBtn: document.getElementById('app-btn-play'),
        pauseBtn: document.getElementById('app-btn-pause'),
        stopBtn: document.getElementById('app-btn-stop'),
        stepBtn: document.getElementById('app-btn-step'),
        speed1xBtn: document.getElementById('app-btn-1x'),
        speed2xBtn: document.getElementById('app-btn-2x'),
        speed4xBtn: document.getElementById('app-btn-4x'),
        speed8xBtn: document.getElementById('app-btn-8x'),
        speed16xBtn: document.getElementById('app-btn-16x'),
        undoBtn: document.getElementById('app-btn-undo'),
        redoBtn: document.getElementById('app-btn-redo'),
        settingsBtn: document.getElementById('app-btn-settings'),
        themeBtn: document.getElementById('app-btn-theme'),
    }

    #toolButtons = {
        pencilBtn: document.getElementById('app-btn-pencil'),
        lineBtn: document.getElementById('app-btn-line'),
        rectBtn: document.getElementById('app-btn-rect'),
        rectFillBtn: document.getElementById('app-btn-rect-fill'),
        bucketBtn: document.getElementById('app-btn-bucket'),
        selectionBtn: document.getElementById('app-btn-selection'),
        eraserBtn: document.getElementById('app-btn-eraser'),
    }

    #currentState = App.STATE_STOPPED
    #currentTool = this.#tools.pencil
    #currentCellValue = 1
    #generationDelay = 60
    #rows = 50
    #cols = 100
    #tileSize = 10
    #colors = ['rgb(0, 0, 0)', 'rgb(255, 255, 255)']
    #defaultColor = 'rgb(255, 255, 255)'
    #undoStanshotsMaxSize = 20

    /** @type {number[][][]} */
    #undoSnapshots = []
    /** @type {number[][][]} */
    #redoSnapshots = []

    /**
     * @param {number} rows 
     * @param {number} cols 
     */
    constructor(rows, cols) {
        this.#rows = rows
        this.#cols = cols
        this.#display = new Display(this)
        this.#setupListeners()
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
     * @param {number} value
     * @returns {string} 
     */
    getValueColor(value) {
        if (value < this.#colors.length) {
            return this.#colors[value]
        }
        return this.#defaultColor
    }

    /**
     * @param {number} pos 
     * @returns 
     */
    translateCoordinateToGrid(pos) {
        return Math.floor(pos / this.#tileSize)
    }

    saveSnapshot() {
        if (!this.#automata) {
            throw new AppError('Automata not set')
        }
        if (!this.#currentState !== App.STATE_STOPPED) {
            return
        }
        console.log('snapshot saved')
        this.#undoSnapshots.push(structuredClone(this.#automata.data))
        this.#redoSnapshots = []
        if (this.#undoSnapshots.length > this.#undoStanshotsMaxSize) {
            this.#undoSnapshots.shift()
        }
        this.#buttons.redoBtn.setAttribute('disabled', '')
        this.#buttons.undoBtn.removeAttribute('disabled')
    }

    #restoreLastUndoSnapshot() {
        if (this.#undoSnapshots.length == 0) {
            return
        }
        const previousData = this.#undoSnapshots.pop()
        if (this.#undoSnapshots.length === 0) {
            this.#buttons.undoBtn.setAttribute('disabled', '')
        }
        if (previousData.length === 0 || previousData[0].length === 0) {
            return
        }
        if (previousData.length !== this.#rows || previousData[0].length !== this.#cols) {
            this.#rows = previousData.length
            this.#cols = previousData[0]?.length
            this.#display.resize(this.#rows, this.#cols)
        }
        this.#redoSnapshots.push(structuredClone(this.#automata.data))
        this.#buttons.redoBtn.removeAttribute('disabled')
        this.#automata.restoreSnapshot(this.#rows, this.#cols, previousData)
    }

    #restoreLastRedoSnapshot() {
        if (this.#redoSnapshots.length == 0) {
            return
        }
        const subsequentData = this.#redoSnapshots.pop()
        if (this.#redoSnapshots.length === 0) {
            this.#buttons.redoBtn.setAttribute('disabled', '')
        }
        if (subsequentData.length === 0 || subsequentData[0].length === 0) {
            return
        }
        if (subsequentData.length !== this.#rows || subsequentData[0].length !== this.#cols) {
            this.#rows = subsequentData.length
            this.#cols = subsequentData[0]?.length
            this.#display.resize(this.#rows, this.#cols)
        }
        this.#undoSnapshots.push(structuredClone(this.#automata.data))
        this.#buttons.undoBtn.removeAttribute('disabled')
        this.#automata.restoreSnapshot(this.#rows, this.#cols, subsequentData)
    }

    #setupListeners() {
        this.#buttons.playBtn.addEventListener('click', () => this.#handlePlayBtn())
        this.#buttons.pauseBtn.addEventListener('click', () => this.#handlePauseBtn())
        this.#buttons.stopBtn.addEventListener('click', () => this.#handleStopBtn())
        this.#buttons.stepBtn.addEventListener('click', () => this.#handleStepBtn())
        this.#toolButtons.pencilBtn.addEventListener('click', evt => this.#handleToolBtn(evt, this.#tools.pencil))
        this.#toolButtons.lineBtn.addEventListener('click', evt => this.#handleToolBtn(evt, this.#tools.line))
        this.#toolButtons.rectBtn.addEventListener('click', evt => this.#handleToolBtn(evt, this.#tools.rect))
        this.#toolButtons.rectFillBtn.addEventListener('click', evt => this.#handleToolBtn(evt, this.#tools.rectFill))
        this.#toolButtons.bucketBtn.addEventListener('click', evt => this.#handleToolBtn(evt, this.#tools.bucket))
        this.#buttons.undoBtn.addEventListener('click', () => this.#handleUndoBtn())
        this.#buttons.redoBtn.addEventListener('click', () => this.#handleRedoBtn())
    }

    #handlePlayBtn() {
        if (!this.automata) {
            throw new AppError('Automata not set')
        }

        this.#currentState = App.STATE_RUNNING
        this.startAutoGeneration(this.#generationDelay)

        this.#disableButton(this.#buttons.playBtn)
        this.#enableButton(this.#buttons.pauseBtn)
        this.#enableButton(this.#buttons.stopBtn)
        this.#enableButton(this.#buttons.stepBtn)
    }

    #handlePauseBtn() {
        this.#currentState = App.STATE_PAUSED
        this.stopAutoGeneration()

        this.#enableButton(this.#buttons.playBtn)
        this.#disableButton(this.#buttons.pauseBtn)
        this.#enableButton(this.#buttons.stopBtn)
        this.#enableButton(this.#buttons.stepBtn)
    }

    #handleStopBtn() {
        this.#currentState = App.STATE_STOPPED
        this.stopAutoGeneration()
        this.resetGeneration()

        this.#enableButton(this.#buttons.playBtn)
        this.#disableButton(this.#buttons.pauseBtn)
        this.#disableButton(this.#buttons.stopBtn)
        this.#enableButton(this.#buttons.stepBtn)
    }

    #handleStepBtn() {
        if (this.#currentState === App.STATE_STEPPING) {
            this.nextGeneration()
            return
        }

        this.#currentState = App.STATE_STEPPING
        this.stopAutoGeneration()
        this.nextGeneration()

        this.#enableButton(this.#buttons.playBtn)
        this.#disableButton(this.#buttons.pauseBtn)
        this.#enableButton(this.#buttons.stopBtn)
        this.#enableButton(this.#buttons.stepBtn)
    }

    #handleUndoBtn() {
        this.#restoreLastUndoSnapshot()
    }

    #handleRedoBtn() {
        this.#restoreLastRedoSnapshot()
    }

    #inactiveToolButtons() {
        Object.values(this.#toolButtons).map(btn => btn.classList.remove('active'))
    }

    /**
     * @param {HTMLElement} button 
     */
    #disableButton(button) {
        button.setAttribute('disabled', '')
    }

    /**
     * @param {HTMLElement} button 
     */
    #enableButton(button) {
        button.removeAttribute('disabled')
    }

    /**
     * @param {PointerEvent} evt 
     * @param {Tool} tool 
     */
    #handleToolBtn(evt, tool) {
        this.#inactiveToolButtons()
        evt.currentTarget.classList.add('active')
        this.#currentTool = tool
    }

    get currentStateName() {
        switch (this.#currentState) {
            case App.STATE_STOPPED: return "Stopped"
            case App.STATE_RUNNING: return "Running"
            case App.STATE_STEPPING: return "Stepping"
            case App.STATE_PAUSED: return "Paused"
            default: return 'Unknown'
        }
    }

    get currentTool() {
        return this.#currentTool
    }

    get automata() {
        return this.#automata
    }

    set automata(automata) {
        this.#automata = automata
        this.#automata.resize(this.#rows, this.#cols)
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

    get currentCellValue() {
        return this.#currentCellValue
    }

    get display() {
        return this.#display
    }
}