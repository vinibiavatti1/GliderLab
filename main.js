import { App } from './app/app.js'
import { Entombed } from './app/automata/entombed/entombed.js'
import { GameOfLifeRegistry } from './app/automata/game-of-life/game-of-life-registry.js'
import { GameOfLife } from './app/automata/game-of-life/game-of-life.js'
import { LangtonAnt } from './app/automata/langton-ant/langton-ant.js'

const DEFAULT_ROWS = 50
const DEFAULT_COLS = 100

window.addEventListener('DOMContentLoaded', () => {
    const automata = new LangtonAnt(DEFAULT_ROWS, DEFAULT_COLS)
    new App(DEFAULT_ROWS, DEFAULT_COLS, automata)

    /*const rule = GameOfLifeRegistry.GOL
    const automata = new GameOfLife(DEFAULT_ROWS, DEFAULT_COLS, rule)
    const offsetRows = 21;
    const offsetCols = 46;
    automata.setValue(0 + offsetRows, 1 + offsetCols, GameOfLife.ALIVE);
    automata.setValue(1 + offsetRows, 3 + offsetCols, GameOfLife.ALIVE);
    automata.setValue(2 + offsetRows, 0 + offsetCols, GameOfLife.ALIVE);
    automata.setValue(2 + offsetRows, 1 + offsetCols, GameOfLife.ALIVE);
    automata.setValue(2 + offsetRows, 4 + offsetCols, GameOfLife.ALIVE);
    automata.setValue(2 + offsetRows, 5 + offsetCols, GameOfLife.ALIVE);
    automata.setValue(2 + offsetRows, 6 + offsetCols, GameOfLife.ALIVE);
    app.automata = automata*/

    /*const automata = new Entombed(DEFAULT_ROWS, DEFAULT_COLS)
    app.automata = automata*/

    /*const automata = new LangtonAnt(DEFAULT_ROWS, DEFAULT_COLS)
    app.automata = automata*/
})
