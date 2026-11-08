import { AppError } from "../app-error.js"
import { Elementary } from "./elementary/elementary.js"
import { ElementaryRule } from "./elementary/elementary-rule.js"
import { Entombed } from "./entombed/entombed.js"
import { GameOfLife } from "./game-of-life/game-of-life.js"
import { GameOfLifeRule } from "./game-of-life/game-of-life-rule.js"
import { LangtonAnt } from "./langton-ant/langton-ant.js"
import { WireWorld } from "./wireworld/wireworld.js"
import { Automata } from "./automata.js"

export class AutomataImporter {
    /**
     * @param {string} json 
     * @returns {Automata}
     */
    static importFromJson(json) {
        const obj = JSON.parse(json)
        if (!obj.id) {
            throw new AppError('Invalid json to import')
        }
        let automata = null
        switch (obj.id) {
            case GameOfLife.ID: {
                automata = new GameOfLife(obj.rows, obj.cols, GameOfLifeRule.new({
                    name: obj.rule.name,
                    description: obj.rule.description,
                    notation: obj.rule.notation,
                    born: obj.rule.born,
                    survive: obj.rule.survive,
                    aliveColor: obj.rule.aliveColor,
                    deadColor: obj.rule.deadColor,
                }))
                automata.loadData(obj.rows, obj.cols, obj.data)
                break
            }
            case Elementary.ID: {
                automata = new Elementary(obj.rows, obj.cols, new ElementaryRule(obj.ruleNumber))
                break
            }
            case WireWorld.ID: {
                automata = new WireWorld(obj.rows, obj.cols)
                break
            }
            case Entombed.ID: {
                automata = new Entombed(obj.rows, obj.cols)
                break
            }
            case LangtonAnt.ID: {
                automata = new LangtonAnt(obj.rows, obj.cols)
                automata.antRow = obj.antRow
                automata.antCol = obj.antCol
                break
            }
            default: {
                throw new AppError(`Unsupported ${obj.id} automata`)
            }
        }
        automata.loadData(obj.rows, obj.cols, obj.data)
        return automata
    }
}