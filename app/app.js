import { AppError } from "./app-error.js"
import { Automata } from "./automata/automata.js"
import { WireWorld } from "./automata/wireworld/wireworld.js"
import { AboutDialog } from "./dialogs/about-dialog.js"
import { AutomataDialog } from "./dialogs/automata-dialog.js"
import { SettingsDialog } from "./dialogs/settings-dialog.js"
import { Display } from "./display.js"
import { BucketTool } from "./tools/bucket-tool.js"
import { EraserTool } from "./tools/eraser-tool.js"
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
    static UNDO_SNAPSHOTS_MAX_SIZE = 20

    #tools = {
        pencil: new PencilTool(this),
        line: new LineTool(this),
        rect: new RectTool(this),
        rectFill: new RectFillTool(this),
        bucket: new BucketTool(this),
        eraser: new EraserTool(this),
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
        gridBtn: document.getElementById('app-btn-grid-toggle')
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

    #wireWorldButtons = {
        conductorBtn: document.getElementById('app-btn-wireworld-conductor'),
        electronBtn: document.getElementById('app-btn-wireworld-electron')
    }

    /** @type {Automata} */
    #automata

    /** @type {number?} */
    #generationInterval = null

    /** @type {Display} */
    #display

    /** @type {AutomataDialog} */
    #automataDialog

    /** @type {AboutDialog} */
    #aboutDialog

    /** @type {SettingsDialog} */
    #settingsDialog

    /** @type {number[][][]} */
    #undoSnapshots = []

    /** @type {number[][][]} */
    #redoSnapshots = []

    /** @type {Tool} */
    #currentTool = this.#tools.pencil

    #currentState = App.STATE_STOPPED
    #currentCellValue = 1
    #generationDelay = 60
    #rows = 50
    #cols = 100
    #tileSize = 10

    /**
     * @param {number} rows 
     * @param {number} cols 
     * @param {Automata} automata
     */
    constructor(rows, cols, automata) {
        this.#rows = rows
        this.#cols = cols
        this.#display = new Display(this)
        this.#automataDialog = new AutomataDialog(this)
        this.#aboutDialog = new AboutDialog()
        this.#settingsDialog = new SettingsDialog(this)
        this.automata = automata
        this.#setupListeners()
    }

    /**
     * @param {Automata} automata 
     */
    set automata(automata) {
        this.#automata = automata
        this.#rows = this.#automata.simulationGrid.rows
        this.#cols = this.#automata.simulationGrid.cols
        this.#display.resize(this.#rows, this.#cols)
        this.#buttons.automataBtn.innerHTML = this.#automata.name
        this.#buttons.automataBtn.style.color = this.#automata.representativeColor ?? 'rgb(255, 255, 255)'
        this.#currentCellValue = this.#automata.defaultValue
        this.#clearSnapshots()
        this.#enableToolButtons()
        if (this.#currentState !== App.STATE_STOPPED) {
            this.#handleStopBtn()
        }
    }

    /**
     * @param {number} rows 
     * @param {number} cols 
     */
    resize(rows, cols) {
        this.#rows = rows
        this.#cols = cols
        this.#automata.resize(this.#rows, this.#cols)
        this.#display.resize(this.#rows, this.#cols)
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
            if (this.#automata.requestPause()) {
                this.#click(this.#buttons.pauseBtn)
            }
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
     * @param {number} pos 
     * @returns {number}
     */
    translateCoordinateToGrid(pos) {
        return Math.floor(pos / this.#tileSize)
    }

    saveSnapshot() {
        if (!this.#automata) {
            throw new AppError('Automata not set')
        }
        if (!this.#automata.supportsSnapshots()) {
            return
        }
        if (this.#currentState !== App.STATE_STOPPED) {
            return
        }
        this.#undoSnapshots.push(structuredClone(this.#automata.simulationGrid.data))
        this.#redoSnapshots = []
        if (this.#undoSnapshots.length > App.UNDO_SNAPSHOTS_MAX_SIZE) {
            this.#undoSnapshots.shift()
        }
        this.disableElement(this.#buttons.redoBtn)
        this.enableElement(this.#buttons.undoBtn)
    }

    /**
     * @param {HTMLElement} el 
     */
    disableElement(el) {
        el.setAttribute('disabled', '')
    }

    /**
     * @param {HTMLElement} el 
     */
    enableElement(el) {
        el.removeAttribute('disabled')
    }



    #setupListeners() {
        this.#buttons.playBtn.addEventListener('click', () => this.#handlePlayBtn())
        this.#buttons.pauseBtn.addEventListener('click', () => this.#handlePauseBtn())
        this.#buttons.stopBtn.addEventListener('click', () => this.#handleStopBtn())
        this.#buttons.stepBtn.addEventListener('click', () => this.#handleStepBtn())
        this.#buttons.undoBtn.addEventListener('click', () => this.#handleUndoBtn())
        this.#buttons.redoBtn.addEventListener('click', () => this.#handleRedoBtn())
        this.#buttons.gridBtn.addEventListener('click', () => this.#handleBtnGrid())

        this.#toolButtons.pencilBtn.addEventListener('click', evt => this.#handleToolBtn(evt, this.#tools.pencil))
        this.#toolButtons.lineBtn.addEventListener('click', evt => this.#handleToolBtn(evt, this.#tools.line))
        this.#toolButtons.rectBtn.addEventListener('click', evt => this.#handleToolBtn(evt, this.#tools.rect))
        this.#toolButtons.rectFillBtn.addEventListener('click', evt => this.#handleToolBtn(evt, this.#tools.rectFill))
        this.#toolButtons.bucketBtn.addEventListener('click', evt => this.#handleToolBtn(evt, this.#tools.bucket))
        this.#toolButtons.eraserBtn.addEventListener('click', evt => this.#handleToolBtn(evt, this.#tools.eraser))

        this.#wireWorldButtons.conductorBtn.addEventListener('click', evt => this.#handleWireWorldToolBtn(evt, WireWorld.CONDUCTOR))
        this.#wireWorldButtons.electronBtn.addEventListener('click', evt => this.#handleWireWorldToolBtn(evt, WireWorld.ELECTRON_HEAD))
    }

    #restoreLastUndoSnapshot() {
        if (this.#undoSnapshots.length === 0) {
            return
        }
        const previousData = this.#undoSnapshots.pop()
        if (this.#undoSnapshots.length === 0) {
            this.disableElement(this.#buttons.undoBtn)
        }
        if (previousData.length === 0 || previousData[0].length === 0) {
            return
        }
        if (previousData.length !== this.#rows || previousData[0].length !== this.#cols) {
            this.#rows = previousData.length
            this.#cols = previousData[0]?.length
            this.#display.resize(this.#rows, this.#cols)
        }
        this.#redoSnapshots.push(structuredClone(this.#automata.simulationGrid.data))
        this.enableElement(this.#buttons.redoBtn)
        this.#automata.restoreSnapshot(this.#rows, this.#cols, previousData)
    }

    #restoreLastRedoSnapshot() {
        if (this.#redoSnapshots.length === 0) {
            return
        }
        const subsequentData = this.#redoSnapshots.pop()
        if (this.#redoSnapshots.length === 0) {
            this.disableElement(this.#buttons.redoBtn)
        }
        if (subsequentData.length === 0 || subsequentData[0].length === 0) {
            return
        }
        if (subsequentData.length !== this.#rows || subsequentData[0].length !== this.#cols) {
            this.#rows = subsequentData.length
            this.#cols = subsequentData[0]?.length
            this.#display.resize(this.#rows, this.#cols)
        }
        this.#undoSnapshots.push(structuredClone(this.#automata.simulationGrid.data))
        this.enableElement(this.#buttons.undoBtn)
        this.#automata.restoreSnapshot(this.#rows, this.#cols, subsequentData)
    }

    #clearSnapshots() {
        this.#undoSnapshots = []
        this.#redoSnapshots = []
        this.disableElement(this.#buttons.redoBtn)
        this.disableElement(this.#buttons.undoBtn)
    }

    #handlePlayBtn() {
        if (!this.#automata) {
            throw new AppError('Automata not set')
        }

        this.#currentState = App.STATE_RUNNING

        this.#configureWireWorldPlayState()
        this.startAutoGeneration(this.#generationDelay)

        this.enableElement(this.#buttons.pauseBtn)
        this.enableElement(this.#buttons.stopBtn)
        this.enableElement(this.#buttons.stepBtn)

        this.disableElement(this.#buttons.playBtn)
        this.disableElement(this.#buttons.undoBtn)
        this.disableElement(this.#buttons.redoBtn)
    }

    #handlePauseBtn() {
        this.#currentState = App.STATE_PAUSED
        this.stopAutoGeneration()

        this.enableElement(this.#buttons.playBtn)
        this.enableElement(this.#buttons.stopBtn)
        this.enableElement(this.#buttons.stepBtn)

        this.disableElement(this.#buttons.pauseBtn)
    }

    #handleStopBtn() {
        this.#currentState = App.STATE_STOPPED

        this.#configureWireWorldStopState()
        this.stopAutoGeneration()
        this.resetGeneration()

        this.enableElement(this.#buttons.playBtn)
        this.enableElement(this.#buttons.stepBtn)

        this.disableElement(this.#buttons.pauseBtn)
        this.disableElement(this.#buttons.stopBtn)

        if (this.#undoSnapshots.length > 0) {
            this.enableElement(this.#buttons.undoBtn)
        }
        if (this.#redoSnapshots.length > 0) {
            this.enableElement(this.#buttons.redoBtn)
        }
    }

    #handleStepBtn() {
        if (this.#automata instanceof WireWorld) {
            Object.values(this.#toolButtons).forEach(btn => this.disableElement(btn))
            this.disableElement(this.#wireWorldButtons.conductorBtn)
            this.#wireWorldButtons.electronBtn.dispatchEvent(new Event('click', { bubbles: true }))
        }

        if (this.#currentState === App.STATE_STEPPING) {
            this.nextGeneration()
            return
        }

        this.#currentState = App.STATE_STEPPING
        this.stopAutoGeneration()
        this.nextGeneration()

        this.enableElement(this.#buttons.playBtn)
        this.enableElement(this.#buttons.stopBtn)
        this.enableElement(this.#buttons.stepBtn)

        this.disableElement(this.#buttons.pauseBtn)
    }

    #handleUndoBtn() {
        this.#restoreLastUndoSnapshot()
    }

    #handleRedoBtn() {
        this.#restoreLastRedoSnapshot()
    }

    /**
     * @param {PointerEvent} evt 
     * @param {Tool} tool 
     */
    #handleToolBtn(evt, tool) {
        Object.values(this.#toolButtons).map(btn => btn.classList.remove('active'))
        evt.currentTarget.classList.add('active')
        this.#currentTool = tool
    }

    /**
     * @param {PointerEvent} evt 
     * @param {number} tool 
     */
    #handleWireWorldToolBtn(evt, tool) {
        Object.values(this.#wireWorldButtons).map(btn => btn.classList.remove('active'))
        evt.currentTarget.classList.add('active')
        this.#currentCellValue = tool
    }

    #handleBtnGrid() {
        this.#display.showGrid = !this.#display.showGrid
        const icon = document.getElementById('app-grid-icon')
        if (this.#display.showGrid) {
            icon.classList.add('bi-grid')
            icon.classList.remove('bi-grid-fill')
        } else {
            icon.classList.remove('bi-grid')
            icon.classList.add('bi-grid-fill')
        }
    }

    #configureWireWorldPlayState() {
        if (this.#automata instanceof WireWorld) {
            this.#disableToolButtons()
            this.disableElement(this.#wireWorldButtons.conductorBtn)
            this.#click(this.#wireWorldButtons.electronBtn)
            this.#click(this.#toolButtons.pencilBtn)
        }
    }

    #configureWireWorldStopState() {
        if (this.#automata instanceof WireWorld) {
            this.#enableToolButtons()
            this.enableElement(this.#wireWorldButtons.conductorBtn)
        }
    }

    #disableToolButtons() {
        Object.values(this.#toolButtons).forEach(btn => this.disableElement(btn))
    }

    #enableToolButtons() {
        Object.values(this.#toolButtons).forEach(btn => this.enableElement(btn))
    }

    /**
     * @param {HTMLElement} el 
     */
    #click(el) {
        el.dispatchEvent(new Event('click', { bubbles: true }))
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

    get automataDialog() {
        return this.#automataDialog
    }

    get aboutDialog() {
        return this.#aboutDialog
    }

    get SettingsDialog() {
        return this.#settingsDialog
    }
}