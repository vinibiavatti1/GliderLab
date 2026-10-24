import { App } from "../app.js"

export class SettingsDialog {
    static MIN_SIZE = 5
    static MAX_SIZE = 300
    static DEFAULT_ROWS = 50
    static DEFAULT_COLS = 100

    /** @type {App} */
    #app

    #saveButton = document.getElementById('app-settings-save-btn')
    #cancelButton = document.getElementById('app-settings-cancel-btn')
    #gridRowsInput = document.getElementById('app-settings-grid-rows')
    #gridColsInput = document.getElementById('app-settings-grid-cols')

    /**
     * @param {App} app 
     */
    constructor(app) {
        this.#app = app
        this.#saveButton.addEventListener('click', () => this.#handleSave())
        this.#cancelButton.addEventListener('click', () => this.#handleCancel())
    }

    #handleSave() {
        let rows = parseInt(this.#gridRowsInput.value)
        let cols = parseInt(this.#gridColsInput.value)
        if (!rows) {
            rows = DEFAULT_ROWS
        }
        if (!cols) {
            cols = DEFAULT_COLS
        }
        if (rows < MIN_SIZE) {
            rows = MIN_SIZE
        }
        if (cols < MIN_SIZE) {
            cols = MIN_SIZE
        }
        if (rows > MAX_SIZE) {
            rows = MAX_SIZE
        }
        if (cols > MAX_SIZE) {
            cols = MAX_SIZE
        }
        this.#gridRowsInput.value = rows
        this.#gridColsInput.value = cols
        this.#app.resize(rows, cols)
    }

    #handleCancel() {
        this.#gridRowsInput.value = this.#app.rows
        this.#gridColsInput.value = this.#app.cols
    }
}