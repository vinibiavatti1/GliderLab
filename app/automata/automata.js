import { AppError } from "../app-error.js";
import { SimulationGrid } from "./simulation-grid.js";

/** @interface */
export class Automata {
    /**
     * @abstract
     */
    nextGeneration() {
        throw new AppError('Not implemented')
    }

    /**
     * @abstract
     */
    resetGeneration() {
        throw new AppError('Not implemented')
    }

    /**
     * @abstract
     * @param {number} row 
     * @param {number} col 
     * @param {number} value
     */
    setValue(row, col, value) {
        throw new AppError('Not implemented')
    }

    /**
     * @abstract
     * @param {number} row 
     * @param {number} col 
     */
    getValue(row, col) {
        throw new AppError('Not implemented')
    }

    /**
     * @abstract
     * @param {number} row 
     * @param {number} col 
     * @returns {string}
     */
    getValueColor(row, col) {
        throw new AppError('Not implemented')
    }

    /**
     * @abstract
     */
    clear() {
        throw new AppError('Not implemented')
    }

    /**
     * @abstract
     * @param {number} row 
     * @param {number} col 
     */
    resize(rows, cols) {
        throw new AppError('Not implemented')
    }

    /**
     * @param {CanvasRenderingContext2D} context 
     * @param {number} tileSize 
     */
    render(context, tileSize) {
        throw new AppError('Not implemented')
    }

    /**
     * @param {number} rows
     * @param {number} cols
     * @param {number[][]} dataSnapshot 
     */
    restoreSnapshot(rows, cols, dataSnapshot) {
        throw new AppError('Not implemented')
    }

    /**
     * @abstract
     * @returns {boolean}
     */
    requestPause() {
        throw new AppError('Not implemented')
    }

    /**
     * @abstract
     * @returns {boolean}
     */
    supportsSnapshots() {
        throw new AppError('Not implemented')
    }

    /**
     * @abstract
     * @returns {SimulationGrid}
     */
    get simulationGrid() {
        throw new AppError('Not implemented')
    }

    /**
     * @abstract
     * @returns {string}
     */
    get name() {
        throw new AppError('Not implemented')
    }

    /**
     * @abstract
     * @returns {bigint}
     */
    get generationCount() {
        throw new AppError('Not implemented')
    }

    /**
     * @abstract
     * @returns {string}
     */
    get representativeColor() {
        throw new AppError('Not implemented')
    }

    /**
     * @abstract
     * @returns {number}
     */
    get defaultValue() {
        throw new AppError('Not implemented')
    }

    /**
     * @returns {string?}
     */
    get additionalStatusInfo() {
        throw new AppError('Not implemented')
    }
}