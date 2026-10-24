import { GameOfLife } from "./game-of-life.js";

export class GameOfLifeSpaceshipFactory {

    /**
     * @param {GameOfLife} automata 
     * @param {number} row 
     * @param {number} col 
     * @param {number} angle 
     */
    static buildGlider(automata, row, col, angle = 0) {
        const baseGlider = [
            [0, 1],
            [1, 2],
            [2, 0],
            [2, 1],
            [2, 2]
        ];
        const rotatedPoints = GameOfLifeSpaceshipFactory.rotatePoints(baseGlider, angle);
        for (const [r, c] of rotatedPoints) {
            automata.setValue(row + r, col + c, GameOfLife.ALIVE);
        }
    }

    /**
     * @param {GameOfLife} automata 
     * @param {number} row 
     * @param {number} col 
     * @param {number} angle 
     */
    static buildLWSS(automata, row, col, angle = 0) {
        const baseLWSS = [
            [0, 1],
            [0, 4],
            [1, 0],
            [2, 0],
            [2, 4],
            [3, 0],
            [3, 1],
            [3, 2],
            [3, 3]
        ];
        const rotatedPoints = GameOfLifeSpaceshipFactory.rotatePoints(baseLWSS, angle);
        for (const [r, c] of rotatedPoints) {
            automata.setValue(row + r, col + c, GameOfLife.ALIVE);
        }
    }

    /**
     * @param {GameOfLife} automata 
     * @param {number} row 
     * @param {number} col 
     * @param {number} angle 
     */
    static buildGlider(automata, row, col, angle = 0) {
        const baseGlider = [
            [0, 1],
            [1, 2],
            [2, 0],
            [2, 1],
            [2, 2]
        ];
        const rotatedPoints = GameOfLifeSpaceshipFactory.rotatePoints(baseGlider, angle);
        for (const [r, c] of rotatedPoints) {
            automata.setValue(row + r, col + c, GameOfLife.ALIVE);
        }
    }

    /**
     * @param {number[][]} points 
     * @param {number} angle 
     * @returns 
     */
    static rotatePoints(points, angle = 0) {
        const normalizedAngle = ((angle % 360) + 360) % 360;
        if (normalizedAngle === 0) {
            return points.map(([r, c]) => [r, c]);
        }
        const maxRow = Math.max(...points.map(([r]) => r));
        const maxCol = Math.max(...points.map(([, c]) => c));
        const rows = maxRow + 1;
        const cols = maxCol + 1;

        return points.map(([r, c]) => {
            let tr = r;
            let tc = c;
            switch (normalizedAngle) {
                case 90:
                    tr = c;
                    tc = rows - 1 - r;
                    break;
                case 180:
                    tr = rows - 1 - r;
                    tc = cols - 1 - c;
                    break;
                case 270:
                    tr = cols - 1 - c;
                    tc = r;
                    break;
            }
            return [tr, tc];
        });
    }
}