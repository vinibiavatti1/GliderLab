import { App } from './app/app.js'
import { GameOfLifeRegistry } from './app/automata/game-of-life/game-of-life-registry.js'
import { GameOfLifeValue } from './app/automata/game-of-life/game-of-life-value.js'
import { GameOfLife } from './app/automata/game-of-life/game-of-life.js'

const DEFAULT_ROWS = 50
const DEFAULT_COLS = 100
const DEFAULT_TILESIZE = 10

window.addEventListener('DOMContentLoaded', () => {
    const app = new App(DEFAULT_ROWS, DEFAULT_COLS, DEFAULT_TILESIZE)

    const automata = new GameOfLife(DEFAULT_ROWS, DEFAULT_COLS, GameOfLifeRegistry.GOL)

    const offsetRows = 21;
    const offsetCols = 46;
    automata.setValue(0 + offsetRows, 1 + offsetCols, GameOfLifeValue.ALIVE);
    automata.setValue(1 + offsetRows, 3 + offsetCols, GameOfLifeValue.ALIVE);
    automata.setValue(2 + offsetRows, 0 + offsetCols, GameOfLifeValue.ALIVE);
    automata.setValue(2 + offsetRows, 1 + offsetCols, GameOfLifeValue.ALIVE);
    automata.setValue(2 + offsetRows, 4 + offsetCols, GameOfLifeValue.ALIVE);
    automata.setValue(2 + offsetRows, 5 + offsetCols, GameOfLifeValue.ALIVE);
    automata.setValue(2 + offsetRows, 6 + offsetCols, GameOfLifeValue.ALIVE);

    app.automata = automata
})
