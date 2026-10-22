import { AppError } from "./app-error.js"
import { App } from "./app.js"

export class Editor {
    static STATE_STOPPED = 0
    static STATE_RUNNING = 1
    static STATE_PAUSED = 2
    static STATE_STEPPING = 3

    /** @type {App} */
    #app

    #generationDelay = 100

    #buttons = {
        btnAutomata: document.getElementById('app-btn-automata'),
        btnOpen: document.getElementById('app-btn-open'),
        btnSave: document.getElementById('app-btn-save'),
        btnPlay: document.getElementById('app-btn-play'),
        btnPause: document.getElementById('app-btn-pause'),
        btnStop: document.getElementById('app-btn-stop'),
        btnStep: document.getElementById('app-btn-step'),
        btn1x: document.getElementById('app-btn-1x'),
        btn2x: document.getElementById('app-btn-2x'),
        btn4x: document.getElementById('app-btn-4x'),
        btn8x: document.getElementById('app-btn-8x'),
        btn16x: document.getElementById('app-btn-16x'),
        btnUndo: document.getElementById('app-btn-undo'),
        btnRedo: document.getElementById('app-btn-redo'),
        btnPencil: document.getElementById('app-btn-pencil'),
        btnLine: document.getElementById('app-btn-line'),
        btnRect: document.getElementById('app-btn-rect'),
        btnBucket: document.getElementById('app-btn-bucket'),
        btnSelection: document.getElementById('app-btn-selection'),
        btnEraser: document.getElementById('app-btn-eraser'),
        btnSettings: document.getElementById('app-btn-settings'),
        btnTheme: document.getElementById('app-btn-theme'),
    }

    #currentState = Editor.STATE_STOPPED

    /**
     * @param {App} app 
     */
    constructor(app) {
        this.#app = app
        this.#setupListeners()
    }

    #setupListeners() {
        this.#buttons.btnPlay.addEventListener('click', () => this.#btnPlayHandler())
        this.#buttons.btnPause.addEventListener('click', () => this.#btnPauseHandler())
        this.#buttons.btnStop.addEventListener('click', () => this.#btnStopHandler())
        this.#buttons.btnStep.addEventListener('click', () => this.#btnStepHandler())
    }

    #disableButtons() {
        Object.values(this.#buttons)
            .filter(btn => !btn.hasAttribute('disabled'))
            .map(btn => btn.setAttribute('disabled', ''))
    }

    #enableButtons() {
        Object.values(this.#buttons)
            .filter(btn => btn.hasAttribute('disabled'))
            .map(btn => btn.removeAttribute('disabled'))
    }

    #btnPlayHandler() {
        if (!this.#app.automata) {
            throw new AppError('Automata not set')
        }
        this.#disableButtons()
        this.#currentState = Editor.STATE_RUNNING
        this.#app.startAutoGeneration(this.#generationDelay)
        this.#buttons.btnStop.removeAttribute('disabled')
        this.#buttons.btnPause.removeAttribute('disabled')
        this.#buttons.btnStep.removeAttribute('disabled')
    }

    #btnPauseHandler() {
        this.#currentState = Editor.STATE_PAUSED
        this.#app.stopAutoGeneration()
        this.#buttons.btnPlay.removeAttribute('disabled')
        this.#buttons.btnPause.setAttribute('disabled', '')
    }

    #btnStopHandler() {
        this.#currentState = Editor.STATE_STOPPED
        this.#app.stopAutoGeneration()
        this.#app.resetGeneration()
        this.#enableButtons()
        this.#buttons.btnStop.setAttribute('disabled', '')
        this.#buttons.btnPause.setAttribute('disabled', '')
    }

    #btnStepHandler() {
        if (this.#currentState === Editor.STATE_STEPPING) {
            this.#app.nextGeneration()
            return
        }
        this.#currentState = Editor.STATE_STEPPING
        this.#app.stopAutoGeneration()
        this.#app.nextGeneration()
        this.#disableButtons()
        this.#buttons.btnStep.removeAttribute('disabled')
        this.#buttons.btnStop.removeAttribute('disabled')
        this.#buttons.btnPlay.removeAttribute('disabled')
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
}
