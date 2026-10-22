import { AppError } from "../app-error.js"
import { App } from "../app.js"
import { LineTool } from "./tools/line-tool.js"
import { PencilTool } from "./tools/pencil-tool.js"
import { RectFillTool } from "./tools/rect-fill-tool.js"
import { RectTool } from "./tools/rect-tool.js"

export class Editor {
    static STATE_STOPPED = 0
    static STATE_RUNNING = 1
    static STATE_PAUSED = 2
    static STATE_STEPPING = 3

    /** @type {App} */
    #app

    #tools = {
        pencil: new PencilTool(this.#app, this),
        line: new LineTool(this.#app, this),
        rect: new RectTool(this.#app, this),
        rectFill: new RectFillTool(this.#app, this),
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

    #currentState = Editor.STATE_STOPPED
    #statusLabel = document.getElementById('app-status')
    #currentTool = this.#tools.pencil
    #generationDelay = 60

    /**
     * @param {App} app 
     */
    constructor(app) {
        this.#app = app
        this.#setupListeners()
    }

    #setupListeners() {
        this.#buttons.playBtn.addEventListener('click', () => this.#handlePlayBtn())
        this.#buttons.pauseBtn.addEventListener('click', () => this.#handlePauseBtn())
        this.#buttons.stopBtn.addEventListener('click', () => this.#handleStopBtn())
        this.#buttons.stepBtn.addEventListener('click', () => this.#handleStepBtn())
        this.#toolButtons.pencilBtn.addEventListener('click', () => this.#handlePencilBtn())
        this.#toolButtons.lineBtn.addEventListener('click', () => this.#handleLineBtn())
        this.#toolButtons.rectBtn.addEventListener('click', () => this.#handleRectBtn())
        this.#toolButtons.rectFillBtn.addEventListener('click', () => this.#handleRectFillBtn())
        this.#toolButtons.bucketBtn.addEventListener('click', () => this.#handleBucketBtn())
    }

    #disableButtons() {
        Object.values(this.#buttons)
            .filter(btn => btn && !btn.hasAttribute('disabled'))
            .map(btn => btn.setAttribute('disabled', ''))
    }

    #enableButtons() {
        Object.values(this.#buttons)
            .filter(btn => btn && btn.hasAttribute('disabled'))
            .map(btn => btn.removeAttribute('disabled'))
    }

    #handlePlayBtn() {
        if (!this.#app.automata) {
            throw new AppError('Automata not set')
        }
        this.#disableButtons()
        this.#currentState = Editor.STATE_RUNNING
        this.#app.startAutoGeneration(this.#generationDelay)
        this.#buttons.stopBtn.removeAttribute('disabled')
        this.#buttons.pauseBtn.removeAttribute('disabled')
        this.#buttons.stepBtn.removeAttribute('disabled')
    }

    #handlePauseBtn() {
        this.#currentState = Editor.STATE_PAUSED
        this.#app.stopAutoGeneration()
        this.#buttons.playBtn.removeAttribute('disabled')
        this.#buttons.pauseBtn.setAttribute('disabled', '')
    }

    #handleStopBtn() {
        this.#currentState = Editor.STATE_STOPPED
        this.#app.stopAutoGeneration()
        this.#app.resetGeneration()
        this.#enableButtons()
        this.#buttons.stopBtn.setAttribute('disabled', '')
        this.#buttons.pauseBtn.setAttribute('disabled', '')
    }

    #handleStepBtn() {
        if (this.#currentState === Editor.STATE_STEPPING) {
            this.#app.nextGeneration()
            return
        }
        this.#currentState = Editor.STATE_STEPPING
        this.#app.stopAutoGeneration()
        this.#app.nextGeneration()
        this.#disableButtons()
        this.#buttons.stepBtn.removeAttribute('disabled')
        this.#buttons.stopBtn.removeAttribute('disabled')
        this.#buttons.playBtn.removeAttribute('disabled')
    }

    #inactiveToolButtons() {
        Object.values(this.#toolButtons).map(btn => btn.classList.remove('active'))
    }

    #handlePencilBtn() {
        this.#inactiveToolButtons()
        this.#toolButtons.pencilBtn.classList.add('active')
        this.#currentTool = Editor.TOOL_PENCIL
    }

    #handleLineBtn() {
        this.#inactiveToolButtons()
        this.#toolButtons.lineBtn.classList.add('active')
        this.#currentTool = Editor.TOOL_LINE
    }

    #handleRectBtn() {
        this.#inactiveToolButtons()
        this.#toolButtons.rectBtn.classList.add('active')
        this.#currentTool = Editor.TOOL_RECT
    }

    #handleRectFillBtn() {
        this.#inactiveToolButtons()
        this.#toolButtons.rectFillBtn.classList.add('active')
        this.#currentTool = Editor.TOOL_RECT_FILL
    }

    #handleBucketBtn() {
        this.#inactiveToolButtons()
        this.#toolButtons.bucketBtn.classList.add('active')
        this.#currentTool = Editor.TOOL_BUCKET
    }

    get currentStateName() {
        switch (this.#currentState) {
            case Editor.STATE_STOPPED: return "Stopped"
            case Editor.STATE_RUNNING: return "Running"
            case Editor.STATE_STEPPING: return "Stepping"
            case Editor.STATE_PAUSED: return "Paused"
            default: return 'Unknown'
        }
    }

    get currentTool() {
        return this.#currentTool
    }
}