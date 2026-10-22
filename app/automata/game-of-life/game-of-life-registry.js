import { GameOfLifeRule } from "./game-of-life-rule.js";

/** @enum {GameOfLifeRule} */
export const GameOfLifeRegistry = Object.freeze({
    GOL: new GameOfLifeRule(
        "Conway's Life", 'A chaotic rule that is by far the most well-known and well-studied. It exhibits highly complex behavior.', 'B3/S23', [3], [2, 3]
    ),
    THREE_FOUR_LIFE: new GameOfLifeRule(
        '3-4 Life', 'An exploding rule that was initially thought to be a stable alternative to Conway\'s Life, until computer simulation found that most patterns tend to explode. It has many small oscillators and simple period 3 orthogonal and diagonal spaceships.', 'B34/S34', [3, 4], [3, 4]
    ),
    AMOEBA: new GameOfLifeRule(
        'Amoeba', 'A chaotic rule that is well balanced between life and death; it forms patterns with chaotic interiors and wildly moving boundaries.', 'B357/S1358', [3, 5, 7], [1, 3, 5, 8]
    ),
    ANTILIFE: new GameOfLifeRule(
        'AntiLife', "The black/white reversal of Conway's Game of Life.", 'B0123478/S01234678', [0, 1, 2, 3, 4, 7, 8], [0, 1, 2, 3, 4, 6, 7, 8]
    ),
    ASSIMILATION: new GameOfLifeRule(
        'Assimilation', 'A very stable rule that forms permanent diamond-shaped patterns with partially filled interiors. Like in 2×2, patterns made of blocks will permanently remain made of blocks.', 'B345/S4567', [3, 4, 5], [4, 5, 6, 7]
    ),
    BACTERIA: new GameOfLifeRule(
        'Bacteria', '', 'B34/S456', [3, 4], [4, 5, 6]
    ),
    BLINKERS: new GameOfLifeRule(
        'Blinkers', '', 'B345/S2', [3, 4, 5], [2]
    ),
    BUGS: new GameOfLifeRule(
        'Bugs', 'An explosive rule with many high density spaceships.', 'B3567/S15678', [3, 5, 6, 7], [1, 5, 6, 7, 8]
    ),
    CASTLES: new GameOfLifeRule(
        'Castles', 'A rule where patterns almost explode into castle-like stable patterns.', 'B3678/S135678', [3, 6, 7, 8], [1, 3, 5, 6, 7, 8]
    ),
    CHEERIOS: new GameOfLifeRule(
        'Cheerios', 'An explosive rule where patterns explode while "cheerios" form in the chaotic mess.', 'B35678/S34567', [3, 5, 6, 7, 8], [3, 4, 5, 6, 7]
    ),
    COAGULATIONS: new GameOfLifeRule(
        'Coagulations', 'An exploding rule in which patterns tend to expand forever, producing a thick "goo" as it does so. Surprisingly, Coagulations actually has one less birth condition than Stains.', 'B378/S235678', [3, 7, 8], [2, 3, 5, 6, 7, 8]
    ),
    CORAL: new GameOfLifeRule(
        'Coral', 'An exploding rule in which patterns grow slowly and form coral-like textures.', 'B3/S45678', [3], [4, 5, 6, 7, 8]
    ),
    CORROSION_OF_CONFORMITY: new GameOfLifeRule(
        'Corrosion of Conformity', 'A rule similar to Mazectric but without S3. A slow burn from almost any starting pattern, resulting in a rusting away of the local continuum.', 'B3/S124', [3], [1, 2, 4]
    ),
    DANCE: new GameOfLifeRule(
        'Dance', '', 'B34/S35', [3, 4], [3, 5]
    ),
    DAY_AND_NIGHT: new GameOfLifeRule(
        'Day & Night', 'A stable rule that is symmetric under on-off reversal. Many patterns exhibiting highly complex behavior have been found for it.', 'B3678/S34678', [3, 6, 7, 8], [3, 4, 6, 7, 8]
    ),
    DIAMOEBA: new GameOfLifeRule(
        'Diamoeba', 'A chaotic pattern that forms large diamonds with chaotically oscillating boundaries. Known to have quadratically-growing patterns. Like in 2×2, patterns made of blocks will permanently remain made of blocks.', 'B35678/S5678', [3, 5, 6, 7, 8], [5, 6, 7, 8]
    ),
    DOT_LIFE: new GameOfLifeRule(
        'DotLife', 'An exploding rule closely related to Conway\'s Life. The B-heptomino is a common infinite growth pattern in this rule, though it can be stabilized into a spaceship.', 'B3/S023', [3], [0, 2, 3]
    ),
    DRIGH_LIFE: new GameOfLifeRule(
        'DrighLife', 'A mix between DryLife and HighLife', 'B367/S23', [3, 6, 7], [2, 3]
    ),
    DRY_FLOCK: new GameOfLifeRule(
        'DryFlock', '', 'B37/S12', [3, 7], [1, 2]
    ),
    DRY_LIFE: new GameOfLifeRule(
        'DryLife', 'An exploding rule closely related to Conway\'s Life, named after the fact that standard spaceships bigger than the glider do not function in the rule. Has a small 9c/28 orthogonal puffer based on the R-pentomino, which resembles the switch engine in the possibility of combining several to form a spaceship.', 'B37/S23', [3, 7], [2, 3]
    ),
    DRY_LIFE_WITHOUT_DEATH: new GameOfLifeRule(
        'DryLife without Death', 'Similar to Life without death, but patterns tend to grow quadratically instead of forming \'ladders\'.', 'B37/S012345678', [3, 7], [0, 1, 2, 3, 4, 5, 6, 7, 8]
    ),
    EIGHT_FLOCK: new GameOfLifeRule(
        'EightFlock', '', 'B3/S128', [3], [1, 2, 8]
    ),
    EIGHT_LIFE: new GameOfLifeRule(
        'EightLife', 'Also known as "Pulsar Life".', 'B3/S238', [3], [2, 3, 8]
    ),
    ELECTRIFIED_MAZE: new GameOfLifeRule(
        'Electrified Maze', '', 'B45/S12345', [4, 5], [1, 2, 3, 4, 5]
    ),
    EPPSTEIN: new GameOfLifeRule(
        'Eppstein', 'An exploding rule explored by Dean Hickerson and David Eppstein.', 'B35/S236', [3, 5], [2, 3, 6]
    ),
    FEUX: new GameOfLifeRule(
        'Feux', 'An explosive rule where patterns turn into replicators and flash in and out of existence.', 'B1358/S0247', [1, 3, 5, 8], [0, 2, 4, 7]
    ),
    FLOCK: new GameOfLifeRule(
        'Flock', 'Patterns tend to quickly settle into dominoes, duoplets and period 2 oscillators. There is a common period 14 shuttle oscillator involving the pre-beehive.', 'B3/S12', [3], [1, 2]
    ),
    FORREST_OF_LS: new GameOfLifeRule(
        'Forrest of Ls', 'An explosive rule where the insides of patterns slowy stablize into still formations.', 'B168/S236', [1, 6, 8], [2, 3, 6]
    ),
    FREDKIN: new GameOfLifeRule(
        'Fredkin', 'A rule in which, like Replicator, every pattern is a replicator. Also known as "Replicator 2".', 'B1357/S02468', [1, 3, 5, 7], [0, 2, 4, 6, 8]
    ),
    FUZZ: new GameOfLifeRule(
        'Fuzz', 'An exploding rule in which solid patterns appear.', 'B1/S014567', [1], [0, 1, 4, 5, 6, 7]
    ),
    GEMS: new GameOfLifeRule(
        'Gems', 'An exploding rule with many smaller high-period oscillators and a c/5648 spaceship.', 'B3457/S4568', [3, 4, 5, 7], [4, 5, 6, 8]
    ),
    GEMS_MINOR: new GameOfLifeRule(
        'Gems Minor', 'An exploding rule with many smaller high-period oscillators and a c/2068 spaceship.', 'B34578/S456', [3, 4, 5, 7, 8], [4, 5, 6]
    ),
    GEOLOGY: new GameOfLifeRule(
        'Geology', 'A very well-balanced and chaotic rule that forms large "continents" of live cells surrounded by chaos at a roughly 50% density, but they eventually erode away into smaller "islands". It is symmetric under on-off reversal.', 'B3578/S24678', [3, 5, 7, 8], [2, 4, 6, 7, 8]
    ),
    GNARL: new GameOfLifeRule(
        'Gnarl', 'A simple exploding rule by Kellie Evans that forms complex patterns from even a single live cell.', 'B1/S1', [1], [1]
    ),
    GROUNDED_LIFE: new GameOfLifeRule(
        'Grounded Life', 'A stable rule "one outer-totalistic condition away from Life", where neither of the standard spaceships works, and the most common spaceship is an orthogonal 2c/5 spaceship called "Glider 3736".', 'B35/S23', [3, 5], [2, 3]
    ),
    HIGH_FLOCK: new GameOfLifeRule(
        'HighFlock', '', 'B36/S12', [3, 6], [1, 2]
    ),
    HIGH_LIFE: new GameOfLifeRule(
        'HighLife', 'A chaotic rule very similar to Conway\'s Life that is of interest because it has a simple replicator.', 'B36/S23', [3, 6], [2, 3]
    ),
    HOLSTEIN: new GameOfLifeRule(
        'Holstein', 'A self-complementary rule. Black regions are surrounded by froth and tend to eventually collapse starting from the corners, but can be stabilized in various ways by oscillators on their boundaries. c/3, c/4, c/5 and c/7 orthogonal spaceships are known.', 'B35678/S4678', [3, 5, 6, 7, 8], [4, 6, 7, 8]
    ),
    HONEY_FLOCK: new GameOfLifeRule(
        'HoneyFlock', '', 'B38/S128', [3, 8], [1, 2, 8]
    ),
    HONEY_LIFE: new GameOfLifeRule(
        'HoneyLife', 'A mix between Pedestrian Life and EightLife.', 'B38/S238', [3, 8], [2, 3, 8]
    ),
    H_TREES: new GameOfLifeRule(
        'H-trees', 'An exploding rule where H-shaped branches grow from pattern borders.', 'B1/S012345678', [1], [0, 1, 2, 3, 4, 5, 6, 7, 8]
    ),
    ICEBALLS: new GameOfLifeRule(
        'Iceballs', 'Small masses of solid living cells flicker in and out of existence. Some reach a critical mass and begin to slowly grow. Also known as "Ice nine".', 'B25678/S5678', [2, 5, 6, 7, 8], [5, 6, 7, 8]
    ),
    INVERSE_LIFE: new GameOfLifeRule(
        'InverseLife', 'A rule by Jason Rampe, showing similar oscillators and gliders to Conway\'s Life. The black/white reversal of B3678/S23.', 'B0123478/S34678', [0, 1, 2, 3, 4, 7, 8], [3, 4, 6, 7, 8]
    ),
    INVERTAMAZE: new GameOfLifeRule(
        'Invertamaze', 'A strobing rule which makes mazes that invert themselves each generation (SEIZURE WARNING).', 'B028/S0124', [0, 2, 8], [0, 1, 2, 4]
    ),
    IRON_FLOCK: new GameOfLifeRule(
        'IronFlock', '', 'B36/S128', [3, 6], [1, 2, 8]
    ),
    IRON_LIFE: new GameOfLifeRule(
        'IronLife', '', 'B36/S238', [3, 6], [2, 3, 8]
    ),
    LAND_RUSH: new GameOfLifeRule(
        'Land Rush', 'Expanding chaos organizing itself into plowed fields.', 'B35/S234578', [3, 5], [2, 3, 4, 5, 7, 8]
    ),
    LAND_RUSH_2: new GameOfLifeRule(
        'Land Rush 2', 'An exploding rule that got confused with Land Rush, likely due to a typo. It does contain a period 4 orthogonal c/2 ship.', 'B36/S234578', [3, 6], [2, 3, 4, 5, 7, 8]
    ),
    LIFEGUARD_1: new GameOfLifeRule(
        'Lifeguard 1', '', 'B48/S234', [4, 8], [2, 3, 4]
    ),
    LIFEGUARD_2: new GameOfLifeRule(
        'Lifeguard 2', '', 'B3/S4567', [3], [4, 5, 6, 7]
    ),
    LIFE_SKY_HIGH: new GameOfLifeRule(
        'Life SkyHigh', 'A rule that is similar to HighLife but adds a B8 and S6 to the rulestring, hence, the name "SkyHigh".', 'B368/S236', [3, 6, 8], [2, 3, 6]
    ),
    LIFE_WITHOUT_DEATH: new GameOfLifeRule(
        'Life without death', 'An expanding rule that produces complex flakes, featuring dense wickstretchers named "ladders". Also known as "Flakes" or "Inkspot".', 'B3/S012345678', [3], [0, 1, 2, 3, 4, 5, 6, 7, 8]
    ),
    LIVE_FREE_OR_DIE: new GameOfLifeRule(
        'Live Free or Die', 'An exploding rule in which only cells with no neighbors survive. It has many spaceships, puffers, and oscillators, some of infinitely extensible size and period.', 'B2/S0', [2], [0]
    ),
    LONG_LIFE: new GameOfLifeRule(
        'Long Life', 'A stable rule that gets its name from the fact that it has many simple extremely high period oscillators.', 'B345/S5', [3, 4, 5], [5]
    ),
    LOW_DEATH: new GameOfLifeRule(
        'LowDeath', 'HighLife\'s replicator works in this rule, albeit with a different evolution sequence due to the result of B38/S23\'s "pedestrian" effect.', 'B368/S238', [3, 6, 8], [2, 3, 8]
    ),
    LOW_DEATH_WITHOUT_DEATH: new GameOfLifeRule(
        'LowDeath without Death', '', 'B368/S012345678', [3, 6, 8], [0, 1, 2, 3, 4, 5, 6, 7, 8]
    ),
    LOW_FLOCK_DEATH: new GameOfLifeRule(
        'LowFlockDeath', '', 'B368/S128', [3, 6, 8], [1, 2, 8]
    ),
    LOW_LIFE: new GameOfLifeRule(
        'LowLife', '', 'B3/S13', [3], [1, 3]
    ),
    MAGNEZONES: new GameOfLifeRule(
        'Magnezones', 'An explosive rule that is liquid with four types of crystals appearing in the liquid.', 'B3/S123678', [3], [1, 2, 3, 6, 7, 8]
    ),
    MAJORITY: new GameOfLifeRule(
        'Majority', '', 'B45678/S5678', [4, 5, 6, 7, 8], [5, 6, 7, 8]
    ),
    MAZE: new GameOfLifeRule(
        'Maze', 'An expanding rule that crystalizes to form maze-like designs.', 'B3/S12345', [3], [1, 2, 3, 4, 5]
    ),
    MAZECTRIC: new GameOfLifeRule(
        'Mazectric', 'An expanding rule that crystalizes to form maze-like designs that tend to be straighter (ie. have longer "halls") than the standard maze rule.', 'B3/S1234', [3], [1, 2, 3, 4]
    ),
    MAZECTRIC_WITH_MICE: new GameOfLifeRule(
        'Mazectric with Mice', 'Some "mice" run back and forth in the halls of the maze.', 'B37/S1234', [3, 7], [1, 2, 3, 4]
    ),
    MAZE_WITH_MICE: new GameOfLifeRule(
        'Maze with Mice', 'Similar to B37/S1234, some "mice" run back and forth in the continually-stretching halls of the maze.', 'B37/S12345', [3, 7], [1, 2, 3, 4, 5]
    ),
    MORLEY: new GameOfLifeRule(
        'Morley', 'A rule in which random patterns tend to stabilize extremely quickly. Has a very common slow-moving spaceship and slow-moving puffer. Also known as "Move".', 'B368/S245', [3, 6, 8], [2, 4, 5]
    ),
    NEON_BLOBS: new GameOfLifeRule(
        'Neon Blobs', 'A strobing rule in which patterns become neon-like explosive patterns.', 'B08/S4', [0, 8], [4]
    ),
    NEVER_HAPPY: new GameOfLifeRule(
        'Never happy', 'An explosive rule where patterns slowly form diamond-like shapes and slowly explode.', 'B345/S0456', [3, 4, 5], [0, 4, 5, 6]
    ),
    OILS: new GameOfLifeRule(
        'Oils', 'An exploding rule that forms many wickstrechers, along with other patterns such as a c/16 diagonal spaceship.', 'B014/S2', [0, 1, 4], [2]
    ),
    OSCILLATORS_RULE: new GameOfLifeRule(
        'Oscillators Rule', 'Random patterns shrink to tiny oscillators, with periods anywhere between 1 ("still lifes") and 16. Larger periods are rare.', 'B45/S1235', [4, 5], [1, 2, 3, 5]
    ),
    PEDESTRIAN_FLOCK: new GameOfLifeRule(
        'Pedestrian Flock', 'A mix between Pedestrian Life and Flock.', 'B38/S12', [3, 8], [1, 2]
    ),
    PEDESTRIAN_LIFE: new GameOfLifeRule(
        'Pedestrian Life', 'A close Life variant with a number of distinctive natural growth patterns and (5,2)c/190 oblique spaceships.', 'B38/S23', [3, 8], [2, 3]
    ),
    PEDESTRIAN_LIFE_WITHOUT_DEATH: new GameOfLifeRule(
        'Pedestrian Life without Death', '', 'B38/S012345678', [3, 8], [0, 1, 2, 3, 4, 5, 6, 7, 8]
    ),
    PLOW_WORLD: new GameOfLifeRule(
        'Plow World', 'An explosive rule, behaves almost exactly the same as DryLife without Death.', 'B378/S012345678', [3, 7, 8], [0, 1, 2, 3, 4, 5, 6, 7, 8]
    ),
    PSEUDO_LIFE: new GameOfLifeRule(
        'Pseudo Life', 'A chaotic rule with evolution that resembles Conway\'s Life, but few patterns from Life work in this rule because the glider is unstable.', 'B357/S238', [3, 5, 7], [2, 3, 8]
    ),
    REPLICATOR: new GameOfLifeRule(
        'Replicator', 'A rule in which every pattern is a replicator.', 'B1357/S1357', [1, 3, 5, 7], [1, 3, 5, 7]
    ),
    RINGS_N_SLUGS: new GameOfLifeRule(
        "Rings 'n' Slugs", 'A rule in which patterns stabilize into "Rings" and "Slugs".', 'B56/S14568', [5, 6], [1, 4, 5, 6, 8]
    ),
    SEEDS: new GameOfLifeRule(
        'Seeds', 'An exploding rule by Brian Silverman in which every cell dies in every generation. It has many simple orthogonal spaceships, though it is in general difficult to create patterns that don\'t explode.', 'B2/S', [2], []
    ),
    SERVIETTES: new GameOfLifeRule(
        'Serviettes', 'An exploding rule in which every cell dies in every generation (like Seeds). This rule is of interest because of the fabric-like beauty of the patterns that it produces. Also known as "Persian Rug".', 'B234/S', [2, 3, 4], []
    ),
    SHOOTS_AND_ROOTS: new GameOfLifeRule(
        'Shoots and Roots', 'Shoots are slow growing, well-ordered patterns, while Roots grow faster than shoots, and explosive as they grow.', 'B3/S245678', [3], [2, 4, 5, 6, 7, 8]
    ),
    SLOW_BLOB: new GameOfLifeRule(
        'Slow Blob', '', 'B367/S125678', [3, 6, 7], [1, 2, 5, 6, 7, 8]
    ),
    SNAKESKIN: new GameOfLifeRule(
        'Snakeskin', 'A rule in which patterns explode and form snake-like patterns.', 'B1/S134567', [1], [1, 3, 4, 5, 6, 7]
    ),
    SNOW_LIFE: new GameOfLifeRule(
        'SnowLife', '', 'B3/S1237', [3], [1, 2, 3, 7]
    ),
    SOLID_ISLANDS: new GameOfLifeRule(
        'Solid islands grow amongst static', 'A rule in which patterns grow exponentially and form solid patterns inside static-like patterns.', 'B12678/S15678', [1, 2, 6, 7, 8], [1, 5, 6, 7, 8]
    ),
    SPIRAL_AND_POLYGONAL: new GameOfLifeRule(
        'Spiral and polygonal growth', 'A rule with "plow" structures that move along an edge of a polygon, increasing its size (turning corners and thickening it as they go), corner-extenders that create these in their wake, and nontrivial interactions based on these (such as a 16-cell methuselah that takes 12127116559 generations to become a period-2 oscillator)', 'B34568/S15678', [3, 4, 5, 6, 8], [1, 5, 6, 7, 8]
    ),
    SQRT_REPLICATOR: new GameOfLifeRule(
        'sqrt replicator rule', 'Name comes from a dirty orthogonal replicator, formerly known as the logarithmic replicator rule.', 'B36/S245', [3, 6], [2, 4, 5]
    ),
    STAINS: new GameOfLifeRule(
        'Stains', 'A stable rule in which most patterns tend to "fill in" bounded regions. Most nearby rules (such as Coagulations) tend to explode.', 'B3678/S235678', [3, 6, 7, 8], [2, 3, 5, 6, 7, 8]
    ),
    STAR_TREK: new GameOfLifeRule(
        'Star Trek', 'A rule with several spaceships of various speeds.', 'B3/S0248', [3], [0, 2, 4, 8]
    ),
    TWO_X_TWO: new GameOfLifeRule(
        '2×2', 'A chaotic rule with many simple still lifes, oscillators and spaceships. Its name comes from the fact that it sends patterns made up of 2 × 2 blocks to patterns made up of 2 × 2 blocks.', 'B36/S125', [3, 6], [1, 2, 5]
    ),
    TWO_X_TWO_2: new GameOfLifeRule(
        '2×2 2', '', 'B3678/S1258', [3, 6, 7, 8], [1, 2, 5, 8]
    ),
    VIRUS: new GameOfLifeRule(
        'Virus', 'An exploding rule where the T-tetromino is a blinker puffer, appropriate because it evolves into traffic light in Life, also made of blinkers.', 'B36/S235', [3, 6], [2, 3, 5]
    ),
    VOTE: new GameOfLifeRule(
        'Vote', 'Standard Gérard Vichniac voting rule, also known as "Majority", used as a model for majority voting.', 'B5678/S45678', [5, 6, 7, 8], [4, 5, 6, 7, 8]
    ),
    VOTE_4_5: new GameOfLifeRule(
        'Vote 4/5', 'A modification of the standard Gérard Vichniac voting rule, also known as "Anneal", used as a model for majority voting.', 'B4678/S35678', [4, 6, 7, 8], [3, 5, 6, 7, 8]
    ),
    WALLED_CITIES: new GameOfLifeRule(
        'Walled Cities', 'A stable rule by David Macfarlane that forms centers of pseudo-random activity separated by walls.', 'B45678/S2345', [4, 5, 6, 7, 8], [2, 3, 4, 5]
    ),
    WICKSTRETCHER_AND_PARASITES: new GameOfLifeRule(
        'Wickstretcher And The Parasites', 'An explosive strobing rule which forms different wickstretchers of different speeds and sizes, mostly accompanied by a "parasite" or patterns that stick to them and change the size of the wicks.', 'B01356/S012345', [0, 1, 3, 5, 6], [0, 1, 2, 3, 4, 5]
    ),
    RULE_B01245_S01245: new GameOfLifeRule(
        'B01245/S01245', 'A strobing rule which makes spearheaders form from chaotic oscillating boundaries.', 'B01245/S01245', [0, 1, 2, 4, 5], [0, 1, 2, 4, 5]
    ),
    RULE_B017_S01: new GameOfLifeRule(
        'B017/S01', '', 'B017/S01', [0, 1, 7], [0, 1]
    ),
    RULE_B026_S1: new GameOfLifeRule(
        'B026/S1', 'Simulates range-2 wolfram rule 2166637080', 'B026/S1', [0, 2, 6], [1]
    ),
    RULE_B2_S13: new GameOfLifeRule(
        'B2/S13', 'An exploding rule, one of the few B2 life-like rules that has a replicator.', 'B2/S13', [2], [1, 3]
    ),
    RULE_B2_S2345: new GameOfLifeRule(
        'B2/S2345', 'An exploding rule, with still lifes that may form indestructible barriers to growth, which can be used as casing for single-use wires, out of which logic gates can be constructed.', 'B2/S2345', [2], [2, 3, 4, 5]
    ),
    RULE_B2_S23456: new GameOfLifeRule(
        'B2/S23456', 'Similar to B2/S2345', 'B2/S23456', [2], [2, 3, 4, 5, 6]
    ),
    RULE_B2_S2345678: new GameOfLifeRule(
        'B2/S2345678', 'Similar to B2/S2345', 'B2/S2345678', [2], [2, 3, 4, 5, 6, 7, 8]
    ),
    RULE_B25_S4: new GameOfLifeRule(
        'B25/S4', 'An exploding rule, it has a one-dimensional asymmetric replicator.', 'B25/S4', [2, 5], [4]
    ),
    RULE_B3_S135: new GameOfLifeRule(
        'B3/S135', '', 'B3/S135', [3], [1, 3, 5]
    ),
    RULE_B3_S2: new GameOfLifeRule(
        'B3/S2', 'This rule has 6 small still lifes, the tub, the hive, the aircraft carrier, the loaf, the mango, and the pond. However, there are no still lifes with more than 8 and less than 20 cells. There are also a few common oscillators, including the blinker and the toad, and lots of rare ones.', 'B3/S2', [3], [2]
    ),
    RULE_B3_S2378: new GameOfLifeRule(
        'B3/S2378', '', 'B3/S2378', [3], [2, 3, 7, 8]
    ),
    RULE_B356_S23: new GameOfLifeRule(
        'B356/S23', 'An exploding rule that supports an 18c/72 glide-symmetric puffer. A huge period 661 oscillator was found by FWKnightship in 2023.', 'B356/S23', [3, 5, 6], [2, 3]
    ),
    RULE_B3678_S23: new GameOfLifeRule(
        'B3678/S23', 'Black/white reversal of InverseLife.', 'B3678/S23', [3, 6, 7, 8], [2, 3]
    ),
    RULE_B368_S12578: new GameOfLifeRule(
        'B368/S12578', 'An exploding 2x2-like rule with a small 4c/13o replicator, of which guns and W110 unit cells had been constructed', 'B368/S12578', [3, 6, 8], [1, 2, 5, 7, 8]
    )
})