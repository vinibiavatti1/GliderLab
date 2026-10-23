import { GameOfLifeRule } from "./game-of-life-rule.js";

/** @enum {GameOfLifeRule} */
export const GameOfLifeRegistry = Object.freeze({
    GOL: GameOfLifeRule.new({
        name: "Conway's Life",
        description: 'A chaotic rule that is by far the most well-known and well-studied. It exhibits highly complex behavior.',
        notation: 'B3/S23',
        born: [3],
        survive: [2, 3],
        colors: ['rgb(0, 0, 0)', 'rgb(0, 200, 0)'],
        previewMaxGenerations: 37n,
        previewInitialValues: [[0, 2], [1, 3], [2, 1], [2, 2], [2, 3]]
    }),
    THREE_FOUR_LIFE: GameOfLifeRule.new({
        name: '3-4 Life',
        description: 'An exploding rule that was initially thought to be a stable alternative to Conway\'s Life, until computer simulation found that most patterns tend to explode.',
        notation: 'B34/S34',
        born: [3, 4],
        survive: [3, 4],
        colors: ['rgb(0, 0, 0)', 'rgb(0, 150, 255)']
    }),
    AMOEBA: GameOfLifeRule.new({
        name: 'Amoeba',
        description: 'A chaotic rule that is well balanced between life and death; it forms patterns with chaotic interiors and wildly moving boundaries.',
        notation: 'B357/S1358',
        born: [3, 5, 7],
        survive: [1, 3, 5, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 100, 100)']
    }),
    ANTILIFE: GameOfLifeRule.new({
        name: 'AntiLife',
        description: "The black/white reversal of Conway's Game of Life.",
        notation: 'B0123478/S01234678',
        born: [0, 1, 2, 3, 4, 7, 8],
        survive: [0, 1, 2, 3, 4, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(200, 200, 200)']
    }),
    ASSIMILATION: GameOfLifeRule.new({
        name: 'Assimilation',
        description: 'A very stable rule that forms permanent diamond-shaped patterns with partially filled interiors.',
        notation: 'B345/S4567',
        born: [3, 4, 5],
        survive: [4, 5, 6, 7],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 215, 0)']
    }),
    BACTERIA: GameOfLifeRule.new({
        name: 'Bacteria',
        description: '',
        notation: 'B34/S456',
        born: [3, 4],
        survive: [4, 5, 6],
        colors: ['rgb(0, 0, 0)', 'rgb(50, 205, 50)']
    }),
    BLINKERS: GameOfLifeRule.new({
        name: 'Blinkers',
        description: '',
        notation: 'B345/S2',
        born: [3, 4, 5],
        survive: [2],
        colors: ['rgb(0, 0, 0)', 'rgb(0, 255, 255)']
    }),
    BUGS: GameOfLifeRule.new({
        name: 'Bugs',
        description: 'An explosive rule with many high density spaceships.',
        notation: 'B3567/S15678',
        born: [3, 5, 6, 7],
        survive: [1, 5, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 69, 0)']
    }),
    CASTLES: GameOfLifeRule.new({
        name: 'Castles',
        description: 'A rule where patterns almost explode into castle-like stable patterns.',
        notation: 'B3678/S135678',
        born: [3, 6, 7, 8],
        survive: [1, 3, 5, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(138, 43, 226)']
    }),
    CHEERIOS: GameOfLifeRule.new({
        name: 'Cheerios',
        description: 'An explosive rule where patterns explode while "cheerios" form in the chaotic mess.',
        notation: 'B35678/S34567',
        born: [3, 5, 6, 7, 8],
        survive: [3, 4, 5, 6, 7],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 140, 0)']
    }),
    COAGULATIONS: GameOfLifeRule.new({
        name: 'Coagulations',
        description: 'An exploding rule in which patterns tend to expand forever, producing a thick "goo".',
        notation: 'B378/S235678',
        born: [3, 7, 8],
        survive: [2, 3, 5, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(128, 0, 128)']
    }),
    CORAL: GameOfLifeRule.new({
        name: 'Coral',
        description: 'An exploding rule in which patterns grow slowly and form coral-like textures.',
        notation: 'B3/S45678',
        born: [3],
        survive: [4, 5, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 127, 80)']
    }),
    CORROSION_OF_CONFORMITY: GameOfLifeRule.new({
        name: 'Corrosion of Conformity',
        description: 'A rule similar to Mazectric but without S3.',
        notation: 'B3/S124',
        born: [3],
        survive: [1, 2, 4],
        colors: ['rgb(0, 0, 0)', 'rgb(112, 128, 144)']
    }),
    DANCE: GameOfLifeRule.new({
        name: 'Dance',
        description: '',
        notation: 'B34/S35',
        born: [3, 4],
        survive: [3, 5],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 105, 180)']
    }),
    DAY_AND_NIGHT: GameOfLifeRule.new({
        name: 'Day & Night',
        description: 'A stable rule that is symmetric under on-off reversal.',
        notation: 'B3678/S34678',
        born: [3, 6, 7, 8],
        survive: [3, 4, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(70, 130, 180)']
    }),
    DIAMOEBA: GameOfLifeRule.new({
        name: 'Diamoeba',
        description: 'A chaotic pattern that forms large diamonds with chaotically oscillating boundaries.',
        notation: 'B35678/S5678',
        born: [3, 5, 6, 7, 8],
        survive: [5, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(0, 191, 255)']
    }),
    DOT_LIFE: GameOfLifeRule.new({
        name: 'DotLife',
        description: 'An exploding rule closely related to Conway\'s Life.',
        notation: 'B3/S023',
        born: [3],
        survive: [0, 2, 3],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 255, 0)']
    }),
    DRIGH_LIFE: GameOfLifeRule.new({
        name: 'DrighLife',
        description: 'A mix between DryLife and HighLife',
        notation: 'B367/S23',
        born: [3, 6, 7],
        survive: [2, 3],
        colors: ['rgb(0, 0, 0)', 'rgb(50, 205, 50)']
    }),
    DRY_FLOCK: GameOfLifeRule.new({
        name: 'DryFlock',
        description: '',
        notation: 'B37/S12',
        born: [3, 7],
        survive: [1, 2],
        colors: ['rgb(0, 0, 0)', 'rgb(173, 216, 230)']
    }),
    DRY_LIFE: GameOfLifeRule.new({
        name: 'DryLife',
        description: 'An exploding rule closely related to Conway\'s Life.',
        notation: 'B37/S23',
        born: [3, 7],
        survive: [2, 3],
        colors: ['rgb(0, 0, 0)', 'rgb(0, 200, 200)']
    }),
    DRY_LIFE_WITHOUT_DEATH: GameOfLifeRule.new({
        name: 'DryLife without Death',
        description: 'Similar to Life without death, but patterns tend to grow quadratically.',
        notation: 'B37/S012345678',
        born: [3, 7],
        survive: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(210, 105, 30)']
    }),
    EIGHT_FLOCK: GameOfLifeRule.new({
        name: 'EightFlock',
        description: '',
        notation: 'B3/S128',
        born: [3],
        survive: [1, 2, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 20, 147)']
    }),
    EIGHT_LIFE: GameOfLifeRule.new({
        name: 'EightLife',
        description: 'Also known as "Pulsar Life".',
        notation: 'B3/S238',
        born: [3],
        survive: [2, 3, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(0, 255, 127)']
    }),
    ELECTRIFIED_MAZE: GameOfLifeRule.new({
        name: 'Electrified Maze',
        description: '',
        notation: 'B45/S12345',
        born: [4, 5],
        survive: [1, 2, 3, 4, 5],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 255, 0)']
    }),
    EPPSTEIN: GameOfLifeRule.new({
        name: 'Eppstein',
        description: 'An exploding rule explored by Dean Hickerson and David Eppstein.',
        notation: 'B35/S236',
        born: [3, 5],
        survive: [2, 3, 6],
        colors: ['rgb(0, 0, 0)', 'rgb(135, 206, 250)']
    }),
    FEUX: GameOfLifeRule.new({
        name: 'Feux',
        description: 'An explosive rule where patterns turn into replicators.',
        notation: 'B1358/S0247',
        born: [1, 3, 5, 8],
        survive: [0, 2, 4, 7],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 69, 0)']
    }),
    FLOCK: GameOfLifeRule.new({
        name: 'Flock',
        description: 'Patterns tend to quickly settle into dominoes, duoplets and period 2 oscillators.',
        notation: 'B3/S12',
        born: [3],
        survive: [1, 2],
        colors: ['rgb(0, 0, 0)', 'rgb(144, 238, 144)']
    }),
    FORREST_OF_LS: GameOfLifeRule.new({
        name: 'Forrest of Ls',
        description: 'An explosive rule where the insides of patterns slowly stabilize.',
        notation: 'B168/S236',
        born: [1, 6, 8],
        survive: [2, 3, 6],
        colors: ['rgb(0, 0, 0)', 'rgb(34, 139, 34)']
    }),
    FREDKIN: GameOfLifeRule.new({
        name: 'Fredkin',
        description: 'A rule in which every pattern is a replicator. Also known as "Replicator 2".',
        notation: 'B1357/S02468',
        born: [1, 3, 5, 7],
        survive: [0, 2, 4, 6, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 105, 180)']
    }),
    FUZZ: GameOfLifeRule.new({
        name: 'Fuzz',
        description: 'An exploding rule in which solid patterns appear.',
        notation: 'B1/S014567',
        born: [1],
        survive: [0, 1, 4, 5, 6, 7],
        colors: ['rgb(0, 0, 0)', 'rgb(240, 230, 140)']
    }),
    GEMS: GameOfLifeRule.new({
        name: 'Gems',
        description: 'An exploding rule with many smaller high-period oscillators.',
        notation: 'B3457/S4568',
        born: [3, 4, 5, 7],
        survive: [4, 5, 6, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(0, 206, 209)']
    }),
    GEMS_MINOR: GameOfLifeRule.new({
        name: 'Gems Minor',
        description: 'An exploding rule with smaller high-period oscillators.',
        notation: 'B34578/S456',
        born: [3, 4, 5, 7, 8],
        survive: [4, 5, 6],
        colors: ['rgb(0, 0, 0)', 'rgb(72, 209, 204)']
    }),
    GEOLOGY: GameOfLifeRule.new({
        name: 'Geology',
        description: 'Forms large "continents" of live cells surrounded by chaos.',
        notation: 'B3578/S24678',
        born: [3, 5, 7, 8],
        survive: [2, 4, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(188, 143, 143)']
    }),
    GNARL: GameOfLifeRule.new({
        name: 'Gnarl',
        description: 'A simple exploding rule by Kellie Evans.',
        notation: 'B1/S1',
        born: [1],
        survive: [1],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 69, 0)']
    }),
    GROUNDED_LIFE: GameOfLifeRule.new({
        name: 'Grounded Life',
        description: 'A stable rule one outer-totalistic condition away from Life.',
        notation: 'B35/S23',
        born: [3, 5],
        survive: [2, 3],
        colors: ['rgb(0, 0, 0)', 'rgb(100, 149, 237)']
    }),
    HIGH_FLOCK: GameOfLifeRule.new({
        name: 'HighFlock',
        description: '',
        notation: 'B36/S12',
        born: [3, 6],
        survive: [1, 2],
        colors: ['rgb(0, 0, 0)', 'rgb(0, 255, 127)']
    }),
    HIGH_LIFE: GameOfLifeRule.new({
        name: 'HighLife',
        description: 'A chaotic rule very similar to Conway\'s Life with a simple replicator.',
        notation: 'B36/S23',
        born: [3, 6],
        survive: [2, 3],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 50, 50)'],
        previewMaxGenerations: 35n,
        previewInitialValues: [[1, 1], [1, 2], [2, 1], [3, 3], [4, 3], [4, 4]]
    }),
    HOLSTEIN: GameOfLifeRule.new({
        name: 'Holstein',
        description: 'A self-complementary rule where black regions are surrounded by froth.',
        notation: 'B35678/S4678',
        born: [3, 5, 6, 7, 8],
        survive: [4, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(221, 160, 221)']
    }),
    HONEY_FLOCK: GameOfLifeRule.new({
        name: 'HoneyFlock',
        description: '',
        notation: 'B38/S128',
        born: [3, 8],
        survive: [1, 2, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 215, 0)']
    }),
    HONEY_LIFE: GameOfLifeRule.new({
        name: 'HoneyLife',
        description: 'A mix between Pedestrian Life and EightLife.',
        notation: 'B38/S238',
        born: [3, 8],
        survive: [2, 3, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(218, 165, 32)']
    }),
    H_TREES: GameOfLifeRule.new({
        name: 'H-trees',
        description: 'An exploding rule where H-shaped branches grow from pattern borders.',
        notation: 'B1/S012345678',
        born: [1],
        survive: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(70, 130, 180)']
    }),
    ICEBALLS: GameOfLifeRule.new({
        name: 'Iceballs',
        description: 'Small masses of solid living cells flicker in and out of existence.',
        notation: 'B25678/S5678',
        born: [2, 5, 6, 7, 8],
        survive: [5, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(176, 224, 230)']
    }),
    INVERSE_LIFE: GameOfLifeRule.new({
        name: 'InverseLife',
        description: 'The black/white reversal of B3678/S23.',
        notation: 'B0123478/S34678',
        born: [0, 1, 2, 3, 4, 7, 8],
        survive: [3, 4, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(244, 164, 96)']
    }),
    INVERTAMAZE: GameOfLifeRule.new({
        name: 'Invertamaze',
        description: 'A strobing rule which makes mazes that invert themselves each generation.',
        notation: 'B028/S0124',
        born: [0, 2, 8],
        survive: [0, 1, 2, 4],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 0, 255)']
    }),
    IRON_FLOCK: GameOfLifeRule.new({
        name: 'IronFlock',
        description: '',
        notation: 'B36/S128',
        born: [3, 6],
        survive: [1, 2, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(112, 128, 144)']
    }),
    IRON_LIFE: GameOfLifeRule.new({
        name: 'IronLife',
        description: '',
        notation: 'B36/S238',
        born: [3, 6],
        survive: [2, 3, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(119, 136, 153)']
    }),
    LAND_RUSH: GameOfLifeRule.new({
        name: 'Land Rush',
        description: 'Expanding chaos organizing itself into plowed fields.',
        notation: 'B35/S234578',
        born: [3, 5],
        survive: [2, 3, 4, 5, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(154, 205, 50)']
    }),
    LAND_RUSH_2: GameOfLifeRule.new({
        name: 'Land Rush 2',
        description: 'An exploding rule containing a period 4 orthogonal c/2 ship.',
        notation: 'B36/S234578',
        born: [3, 6],
        survive: [2, 3, 4, 5, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(107, 142, 35)']
    }),
    LIFEGUARD_1: GameOfLifeRule.new({
        name: 'Lifeguard 1',
        description: '',
        notation: 'B48/S234',
        born: [4, 8],
        survive: [2, 3, 4],
        colors: ['rgb(0, 0, 0)', 'rgb(0, 191, 255)']
    }),
    LIFEGUARD_2: GameOfLifeRule.new({
        name: 'Lifeguard 2',
        description: '',
        notation: 'B3/S4567',
        born: [3],
        survive: [4, 5, 6, 7],
        colors: ['rgb(0, 0, 0)', 'rgb(30, 144, 255)']
    }),
    LIFE_SKY_HIGH: GameOfLifeRule.new({
        name: 'Life SkyHigh',
        description: 'A rule similar to HighLife adding B8 and S6.',
        notation: 'B368/S236',
        born: [3, 6, 8],
        survive: [2, 3, 6],
        colors: ['rgb(0, 0, 0)', 'rgb(0, 255, 255)']
    }),
    LIFE_WITHOUT_DEATH: GameOfLifeRule.new({
        name: 'Life without death',
        description: 'An expanding rule producing complex flakes named "ladders".',
        notation: 'B3/S012345678',
        born: [3],
        survive: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 255, 255)']
    }),
    LIVE_FREE_OR_DIE: GameOfLifeRule.new({
        name: 'Live Free or Die',
        description: 'An exploding rule in which only cells with no neighbors survive.',
        notation: 'B2/S0',
        born: [2],
        survive: [0],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 140, 0)']
    }),
    LONG_LIFE: GameOfLifeRule.new({
        name: 'Long Life',
        description: 'A stable rule that has many extremely high period oscillators.',
        notation: 'B345/S5',
        born: [3, 4, 5],
        survive: [5],
        colors: ['rgb(0, 0, 0)', 'rgb(147, 112, 219)']
    }),
    LOW_DEATH: GameOfLifeRule.new({
        name: 'LowDeath',
        description: 'HighLife\'s replicator works in this rule.',
        notation: 'B368/S238',
        born: [3, 6, 8],
        survive: [2, 3, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(220, 20, 60)']
    }),
    LOW_DEATH_WITHOUT_DEATH: GameOfLifeRule.new({
        name: 'LowDeath without Death',
        description: '',
        notation: 'B368/S012345678',
        born: [3, 6, 8],
        survive: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(238, 130, 238)']
    }),
    LOW_FLOCK_DEATH: GameOfLifeRule.new({
        name: 'LowFlockDeath',
        description: '',
        notation: 'B368/S128',
        born: [3, 6, 8],
        survive: [1, 2, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(152, 251, 152)']
    }),
    LOW_LIFE: GameOfLifeRule.new({
        name: 'LowLife',
        description: '',
        notation: 'B3/S13',
        born: [3],
        survive: [1, 3],
        colors: ['rgb(0, 0, 0)', 'rgb(0, 250, 154)']
    }),
    MAGNEZONES: GameOfLifeRule.new({
        name: 'Magnezones',
        description: 'An explosive rule with four types of crystals appearing in liquid.',
        notation: 'B3/S123678',
        born: [3],
        survive: [1, 2, 3, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(65, 105, 225)']
    }),
    MAJORITY: GameOfLifeRule.new({
        name: 'Majority',
        description: '',
        notation: 'B45678/S5678',
        born: [4, 5, 6, 7, 8],
        survive: [5, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(119, 136, 153)']
    }),
    MAZE: GameOfLifeRule.new({
        name: 'Maze',
        description: 'An expanding rule that crystalizes to form maze-like designs.',
        notation: 'B3/S12345',
        born: [3],
        survive: [1, 2, 3, 4, 5],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 215, 0)']
    }),
    MAZECTRIC: GameOfLifeRule.new({
        name: 'Mazectric',
        description: 'Maze rule with longer, straighter halls.',
        notation: 'B3/S1234',
        born: [3],
        survive: [1, 2, 3, 4],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 165, 0)']
    }),
    MAZECTRIC_WITH_MICE: GameOfLifeRule.new({
        name: 'Mazectric with Mice',
        description: 'Some mice run back and forth in the halls of the maze.',
        notation: 'B37/S1234',
        born: [3, 7],
        survive: [1, 2, 3, 4],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 140, 0)']
    }),
    MAZE_WITH_MICE: GameOfLifeRule.new({
        name: 'Maze with Mice',
        description: 'Similar to Mazectric with mice in stretching halls.',
        notation: 'B37/S12345',
        born: [3, 7],
        survive: [1, 2, 3, 4, 5],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 69, 0)']
    }),
    MORLEY: GameOfLifeRule.new({
        name: 'Morley',
        description: 'Random patterns tend to stabilize extremely quickly. Also known as "Move".',
        notation: 'B368/S245',
        born: [3, 6, 8],
        survive: [2, 4, 5],
        colors: ['rgb(0, 0, 0)', 'rgb(0, 206, 209)']
    }),
    NEON_BLOBS: GameOfLifeRule.new({
        name: 'Neon Blobs',
        description: 'A strobing rule in which patterns become neon-like explosive patterns.',
        notation: 'B08/S4',
        born: [0, 8],
        survive: [4],
        colors: ['rgb(0, 0, 0)', 'rgb(0, 255, 0)']
    }),
    NEVER_HAPPY: GameOfLifeRule.new({
        name: 'Never happy',
        description: 'An explosive rule where patterns slowly form diamond-like shapes.',
        notation: 'B345/S0456',
        born: [3, 4, 5],
        survive: [0, 4, 5, 6],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 105, 180)']
    }),
    OILS: GameOfLifeRule.new({
        name: 'Oils',
        description: 'An exploding rule forming wickstretchers and diagonal spaceships.',
        notation: 'B014/S2',
        born: [0, 1, 4],
        survive: [2],
        colors: ['rgb(0, 0, 0)', 'rgb(47, 79, 79)']
    }),
    OSCILLATORS_RULE: GameOfLifeRule.new({
        name: 'Oscillators Rule',
        description: 'Random patterns shrink to tiny oscillators.',
        notation: 'B45/S1235',
        born: [4, 5],
        survive: [1, 2, 3, 5],
        colors: ['rgb(0, 0, 0)', 'rgb(123, 104, 238)']
    }),
    PEDESTRIAN_FLOCK: GameOfLifeRule.new({
        name: 'Pedestrian Flock',
        description: 'A mix between Pedestrian Life and Flock.',
        notation: 'B38/S12',
        born: [3, 8],
        survive: [1, 2],
        colors: ['rgb(0, 0, 0)', 'rgb(60, 179, 113)']
    }),
    PEDESTRIAN_LIFE: GameOfLifeRule.new({
        name: 'Pedestrian Life',
        description: 'A close Life variant with oblique spaceships.',
        notation: 'B38/S23',
        born: [3, 8],
        survive: [2, 3],
        colors: ['rgb(0, 0, 0)', 'rgb(46, 139, 87)']
    }),
    PEDESTRIAN_LIFE_WITHOUT_DEATH: GameOfLifeRule.new({
        name: 'Pedestrian Life without Death',
        description: '',
        notation: 'B38/S012345678',
        born: [3, 8],
        survive: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(143, 188, 143)']
    }),
    PLOW_WORLD: GameOfLifeRule.new({
        name: 'Plow World',
        description: 'An explosive rule behaving similarly to DryLife without Death.',
        notation: 'B378/S012345678',
        born: [3, 7, 8],
        survive: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(205, 133, 63)']
    }),
    PSEUDO_LIFE: GameOfLifeRule.new({
        name: 'Pseudo Life',
        description: 'A chaotic rule resembling Life, but gliders are unstable.',
        notation: 'B357/S238',
        born: [3, 5, 7],
        survive: [2, 3, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(0, 206, 209)']
    }),
    REPLICATOR: GameOfLifeRule.new({
        name: 'Replicator',
        description: 'A rule in which every pattern is a replicator.',
        notation: 'B1357/S1357',
        born: [1, 3, 5, 7],
        survive: [1, 3, 5, 7],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 0, 255)']
    }),
    RINGS_N_SLUGS: GameOfLifeRule.new({
        name: "Rings 'n' Slugs",
        description: 'Patterns stabilize into Rings and Slugs.',
        notation: 'B56/S14568',
        born: [5, 6],
        survive: [1, 4, 5, 6, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(106, 90, 205)']
    }),
    SEEDS: GameOfLifeRule.new({
        name: 'Seeds',
        description: 'An exploding rule by Brian Silverman in which every cell dies in every generation.',
        notation: 'B2/S',
        born: [2],
        survive: [],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 69, 0)']
    }),
    SERVIETTES: GameOfLifeRule.new({
        name: 'Serviettes',
        description: 'Also known as Persian Rug, produces fabric-like patterns.',
        notation: 'B234/S',
        born: [2, 3, 4],
        survive: [],
        colors: ['rgb(0, 0, 0)', 'rgb(219, 112, 147)']
    }),
    SHOOTS_AND_ROOTS: GameOfLifeRule.new({
        name: 'Shoots and Roots',
        description: 'Shoots grow slowly; roots grow faster and explosively.',
        notation: 'B3/S245678',
        born: [3],
        survive: [2, 4, 5, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(85, 107, 47)']
    }),
    SLOW_BLOB: GameOfLifeRule.new({
        name: 'Slow Blob',
        description: '',
        notation: 'B367/S125678',
        born: [3, 6, 7],
        survive: [1, 2, 5, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(72, 61, 139)']
    }),
    SNAKESKIN: GameOfLifeRule.new({
        name: 'Snakeskin',
        description: 'Patterns explode and form snake-like patterns.',
        notation: 'B1/S134567',
        born: [1],
        survive: [1, 3, 4, 5, 6, 7],
        colors: ['rgb(0, 0, 0)', 'rgb(189, 183, 107)']
    }),
    SNOW_LIFE: GameOfLifeRule.new({
        name: 'SnowLife',
        description: '',
        notation: 'B3/S1237',
        born: [3],
        survive: [1, 2, 3, 7],
        colors: ['rgb(0, 0, 0)', 'rgb(240, 248, 255)']
    }),
    SOLID_ISLANDS: GameOfLifeRule.new({
        name: 'Solid islands grow amongst static',
        description: 'Patterns grow exponentially and form solid formations.',
        notation: 'B12678/S15678',
        born: [1, 2, 6, 7, 8],
        survive: [1, 5, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(112, 128, 144)']
    }),
    SPIRAL_AND_POLYGONAL: GameOfLifeRule.new({
        name: 'Spiral and polygonal growth',
        description: 'Rule featuring plow structures along polygon edges.',
        notation: 'B34568/S15678',
        born: [3, 4, 5, 6, 8],
        survive: [1, 5, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(199, 21, 133)']
    }),
    SQRT_REPLICATOR: GameOfLifeRule.new({
        name: 'sqrt replicator rule',
        description: 'Logarithmic / orthogonal replicator rule.',
        notation: 'B36/S245',
        born: [3, 6],
        survive: [2, 4, 5],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 105, 180)']
    }),
    STAINS: GameOfLifeRule.new({
        name: 'Stains',
        description: 'A stable rule in which most patterns fill in bounded regions.',
        notation: 'B3678/S235678',
        born: [3, 6, 7, 8],
        survive: [2, 3, 5, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(139, 69, 19)']
    }),
    STAR_TREK: GameOfLifeRule.new({
        name: 'Star Trek',
        description: 'A rule with several spaceships of various speeds.',
        notation: 'B3/S0248',
        born: [3],
        survive: [0, 2, 4, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(0, 191, 255)']
    }),
    TWO_X_TWO: GameOfLifeRule.new({
        name: '2×2',
        description: 'A chaotic rule sending 2×2 blocks to 2×2 blocks.',
        notation: 'B36/S125',
        born: [3, 6],
        survive: [1, 2, 5],
        colors: ['rgb(0, 0, 0)', 'rgb(50, 205, 50)']
    }),
    TWO_X_TWO_2: GameOfLifeRule.new({
        name: '2×2 2',
        description: '',
        notation: 'B3678/S1258',
        born: [3, 6, 7, 8],
        survive: [1, 2, 5, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(34, 139, 34)']
    }),
    VIRUS: GameOfLifeRule.new({
        name: 'Virus',
        description: 'An exploding rule where T-tetromino acts as a blinker puffer.',
        notation: 'B36/S235',
        born: [3, 6],
        survive: [2, 3, 5],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 0, 0)']
    }),
    VOTE: GameOfLifeRule.new({
        name: 'Vote',
        description: 'Standard Gérard Vichniac voting rule / Majority model.',
        notation: 'B5678/S45678',
        born: [5, 6, 7, 8],
        survive: [4, 5, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(128, 128, 128)']
    }),
    VOTE_4_5: GameOfLifeRule.new({
        name: 'Vote 4/5',
        description: 'Modification of voting rule, also known as Anneal.',
        notation: 'B4678/S35678',
        born: [4, 6, 7, 8],
        survive: [3, 5, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(169, 169, 169)']
    }),
    WALLED_CITIES: GameOfLifeRule.new({
        name: 'Walled Cities',
        description: 'Forms centers of pseudo-random activity separated by walls.',
        notation: 'B45678/S2345',
        born: [4, 5, 6, 7, 8],
        survive: [2, 3, 4, 5],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 215, 0)']
    }),
    WICKSTRETCHER_AND_PARASITES: GameOfLifeRule.new({
        name: 'Wickstretcher And The Parasites',
        description: 'An explosive strobing rule forming different wickstretchers.',
        notation: 'B01356/S012345',
        born: [0, 1, 3, 5, 6],
        survive: [0, 1, 2, 3, 4, 5],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 140, 0)']
    }),
    RULE_B01245_S01245: GameOfLifeRule.new({
        name: 'B01245/S01245',
        description: 'A strobing rule which makes spearheaders form.',
        notation: 'B01245/S01245',
        born: [0, 1, 2, 4, 5],
        survive: [0, 1, 2, 4, 5],
        colors: ['rgb(0, 0, 0)', 'rgb(0, 255, 255)']
    }),
    RULE_B017_S01: GameOfLifeRule.new({
        name: 'B017/S01',
        description: '',
        notation: 'B017/S01',
        born: [0, 1, 7],
        survive: [0, 1],
        colors: ['rgb(0, 0, 0)', 'rgb(238, 130, 238)']
    }),
    RULE_B026_S1: GameOfLifeRule.new({
        name: 'B026/S1',
        description: 'Simulates range-2 wolfram rule 2166637080',
        notation: 'B026/S1',
        born: [0, 2, 6],
        survive: [1],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 20, 147)']
    }),
    RULE_B2_S13: GameOfLifeRule.new({
        name: 'B2/S13',
        description: 'An exploding B2 rule that has a replicator.',
        notation: 'B2/S13',
        born: [2],
        survive: [1, 3],
        colors: ['rgb(0, 0, 0)', 'rgb(50, 205, 50)']
    }),
    RULE_B2_S2345: GameOfLifeRule.new({
        name: 'B2/S2345',
        description: 'An exploding rule with still life barriers for wires/logic gates.',
        notation: 'B2/S2345',
        born: [2],
        survive: [2, 3, 4, 5],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 165, 0)']
    }),
    RULE_B2_S23456: GameOfLifeRule.new({
        name: 'B2/S23456',
        description: 'Similar to B2/S2345',
        notation: 'B2/S23456',
        born: [2],
        survive: [2, 3, 4, 5, 6],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 140, 0)']
    }),
    RULE_B2_S2345678: GameOfLifeRule.new({
        name: 'B2/S2345678',
        description: 'Similar to B2/S2345',
        notation: 'B2/S2345678',
        born: [2],
        survive: [2, 3, 4, 5, 6, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 69, 0)']
    }),
    RULE_B25_S4: GameOfLifeRule.new({
        name: 'B25/S4',
        description: 'An exploding rule with a one-dimensional asymmetric replicator.',
        notation: 'B25/S4',
        born: [2, 5],
        survive: [4],
        colors: ['rgb(0, 0, 0)', 'rgb(148, 0, 211)']
    }),
    RULE_B3_S135: GameOfLifeRule.new({
        name: 'B3/S135',
        description: '',
        notation: 'B3/S135',
        born: [3],
        survive: [1, 3, 5],
        colors: ['rgb(0, 0, 0)', 'rgb(0, 255, 127)']
    }),
    RULE_B3_S2: GameOfLifeRule.new({
        name: 'B3/S2',
        description: 'Has 6 small still lifes and common oscillators like blinker and toad.',
        notation: 'B3/S2',
        born: [3],
        survive: [2],
        colors: ['rgb(0, 0, 0)', 'rgb(0, 206, 209)']
    }),
    RULE_B3_S2378: GameOfLifeRule.new({
        name: 'B3/S2378',
        description: '',
        notation: 'B3/S2378',
        born: [3],
        survive: [2, 3, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(100, 149, 237)']
    }),
    RULE_B356_S23: GameOfLifeRule.new({
        name: 'B356/S23',
        description: 'An exploding rule supporting a glide-symmetric puffer.',
        notation: 'B356/S23',
        born: [3, 5, 6],
        survive: [2, 3],
        colors: ['rgb(0, 0, 0)', 'rgb(220, 20, 60)']
    }),
    RULE_B3678_S23: GameOfLifeRule.new({
        name: 'B3678/S23',
        description: 'Black/white reversal of InverseLife.',
        notation: 'B3678/S23',
        born: [3, 6, 7, 8],
        survive: [2, 3],
        colors: ['rgb(0, 0, 0)', 'rgb(255, 127, 80)']
    }),
    RULE_B368_S12578: GameOfLifeRule.new({
        name: 'B368/S12578',
        description: 'An exploding 2x2-like rule with a small replicator.',
        notation: 'B368/S12578',
        born: [3, 6, 8],
        survive: [1, 2, 5, 7, 8],
        colors: ['rgb(0, 0, 0)', 'rgb(0, 255, 255)']
    })
})