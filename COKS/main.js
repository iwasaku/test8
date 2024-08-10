phina.globalize();

console.log = function () { };  // ログを出す時にはコメントアウトする

const SCREEN_WIDTH = 1280 - 128;             // スクリーン幅
const SCREEN_HEIGHT = 2436;                 // スクリーン高さ
const SCREEN_CENTER_X = SCREEN_WIDTH / 2;   // スクリーン幅の半分
const SCREEN_CENTER_Y = SCREEN_HEIGHT / 2;  // スクリーン高さの半分

const FPS = 60; // 60フレ
const POWER_UP_TIME = 3 * FPS;    // パワーアップ時間
const MAX_POWER_UP_TIME = 15 * FPS;    // 最長パワーアップ時間

const FONT_FAMILY = "'Press Start 2P','Meiryo',sans-serif";
const ASSETS = {
    image: {
        "nmls": "./resource/new_nmls_128.png",
        "boss": "./resource/boss.png",

        "map_chip": "./resource/map_chip.png",  // 背景チップ
    },
    spritesheet: {
        "player_ss":
        {
            // フレーム情報
            "frame": {
                "width": 128, // 1フレームの画像サイズ（横）
                "height": 128, // 1フレームの画像サイズ（縦）
                "cols": 6, // フレーム数（横）
                "rows": 1, // フレーム数（縦）
            },
            // アニメーション情報
            "animations": {
                "nmls": {
                    "frames": [0],
                    "next": "nmls",
                    "frequency": 1,
                },
                "left0": {
                    "frames": [1],
                    "next": "left0",
                    "frequency": 1,
                },
                "left1": {
                    "frames": [2],
                    "next": "left1",
                    "frequency": 1,
                },
                "right0": {
                    "frames": [3],
                    "next": "right0",
                    "frequency": 1,
                },
                "right1": {
                    "frames": [4],
                    "next": "right1",
                    "frequency": 1,
                },
            }
        },
        "map_chip_ss":
        {
            // フレーム情報
            "frame": {
                "width": 128, // 1フレームの画像サイズ（横）
                "height": 132, // 1フレームの画像サイズ（縦）
                "cols": 11, // フレーム数（横）
                "rows": 1, // フレーム数（縦）
            },
            // アニメーション情報
            "animations": {
                "0": { "frames": [0], "next": "0", "frequency": 30, },
                "1": { "frames": [1], "next": "1", "frequency": 30, },
                "2": { "frames": [2], "next": "2", "frequency": 30, },
                "3": { "frames": [3], "next": "3", "frequency": 30, },
                "4": { "frames": [4], "next": "4", "frequency": 30, },
                "5": { "frames": [5], "next": "5", "frequency": 30, },
                "6": { "frames": [6], "next": "6", "frequency": 30, },
                "7": { "frames": [7], "next": "7", "frequency": 30, },
                "8": { "frames": [8], "next": "8", "frequency": 30, },
                "9": { "frames": [9], "next": "9", "frequency": 30, },
                "10": { "frames": [10], "next": "10", "frequency": 30, },
            }
        }

    },
    sound: {
        "fall_se": 'https://iwasaku.github.io/test7/NEMLESSSTER/resource/fall.mp3',
        "coin_se": 'https://iwasaku.github.io/test7/NEMLESSSTER/resource/coin05.mp3',
        "explosion0_se": 'https://iwasaku.github.io/test8/COKS/resource/explosion_0.mp3',
        "explosion1_se": 'https://iwasaku.github.io/test8/COKS/resource/explosion_1.mp3',
        "explosion2_se": 'https://iwasaku.github.io/test8/COKS/resource/explosion_2.mp3',
        "explosion3_se": 'https://iwasaku.github.io/test8/COKS/resource/explosion_3.mp3',
        "explosion4_se": 'https://iwasaku.github.io/test8/COKS/resource/explosion_4.mp3',
        "explosion5_se": 'https://iwasaku.github.io/test8/COKS/resource/explosion_5.mp3',
        "explosion6_se": 'https://iwasaku.github.io/test8/COKS/resource/explosion_6.mp3',
    }

};

// 定義
const PL_STATUS = defineEnum({
    INIT: {
        value: 0,
        isStarted: Boolean(0),  // スタートしてない
        isDead: Boolean(0),     // 死んでない
        isAccKey: Boolean(0),   // キー入力を受け付けない
        string: 'init'
    },
    START: {
        value: 1,
        isStarted: Boolean(1),  // スタート済み
        isDead: Boolean(0),     // 死んでない
        isAccKey: Boolean(1),   // キー入力を受け付ける
        string: 'start'
    },
    SHAKE: {
        value: 2,
        isStarted: Boolean(1),  // スタート済み
        isDead: Boolean(0),     // 死んでない
        isAccKey: Boolean(0),   // キー入力を受け付けない
        string: 'down'
    },
    DEAD_INIT: {
        value: 3,
        isStarted: Boolean(0),  // スタートしてない
        isDead: Boolean(1),     // 死んだ
        isAccKey: Boolean(0),   // キー入力を受け付けない
        string: 'dead_init'
    },
    DEAD: {
        value: 4,
        isStarted: Boolean(0),  // スタートしてない
        isDead: Boolean(1),     // 死んだ
        isAccKey: Boolean(0),   // キー入力を受け付けない
        string: 'dead'
    },
});

const MAP_CHIP_DEF = defineEnum({
    BLANK: {
        value: 0,
        mc_idx: 0,
        collision: false,
        is_item: false,
        hp: 0,
        se: null,
        point: 0,
        string: 'dark'
    },

    BLOCK: {
        value: 1,
        mc_idx: 1,
        collision: false,
        is_item: false,
        hp: 0,
        se: null,
        point: 0,
        string: 'dark'
    },

    UDON: {
        value: 2,
        mc_idx: 2,
        collision: false,
        is_item: true,
        hp: 0,
        se: null,
        point: 1,
        string: 'udon'
    },

    CUCUMBER: {
        value: 3,
        mc_idx: 3,
        collision: false,
        is_item: true,
        hp: 0,
        se: null,
        point: 0,
        string: 'cucumber'
    },

    STRATA_0: {
        value: 4,
        mc_idx: 4,
        collision: true,
        is_item: false,
        hp: 1,
        point: 1,
        se: "explosion0_se",
        string: 'strata_0'
    },

    STRATA_1: {
        value: 5,
        mc_idx: 5,
        collision: true,
        is_item: false,
        hp: 2,
        point: 2,
        se: "explosion1_se",
        string: 'strata_1'
    },

    STRATA_2: {
        value: 6,
        mc_idx: 6,
        collision: true,
        is_item: false,
        hp: 3,
        point: 4,
        se: "explosion2_se",
        string: 'strata_2'
    },

    STRATA_3: {
        value: 7,
        mc_idx: 7,
        collision: true,
        is_item: false,
        hp: 4,
        point: 8,
        se: "explosion3_se",
        string: 'strata_3'
    },

    STRATA_4: {
        value: 8,
        mc_idx: 8,
        collision: true,
        is_item: false,
        hp: 5,
        point: 16,
        se: "explosion4_se",
        string: 'strata_4'
    },

    STRATA_5: {
        value: 9,
        mc_idx: 9,
        collision: true,
        is_item: false,
        hp: 6,
        point: 32,
        se: "explosion5_se",
        string: 'strata_5'
    },

    ROCK: {
        value: 10,
        mc_idx: 10,
        collision: true,
        is_item: false,
        hp: 10,
        point: 256,
        se: "explosion6_se",
        string: 'rock'
    },
});

const bgAppearMapChipTable = [
    MAP_CHIP_DEF.UDON,
    MAP_CHIP_DEF.CUCUMBER,
    MAP_CHIP_DEF.STRATA_0,
    MAP_CHIP_DEF.STRATA_1,
    MAP_CHIP_DEF.STRATA_2,
    MAP_CHIP_DEF.STRATA_3,
    MAP_CHIP_DEF.STRATA_4,
    MAP_CHIP_DEF.STRATA_5,
    MAP_CHIP_DEF.ROCK,
];
// 出現テーブル
// ratioは足して100になるようにする
const bgAppearTable = [
    //                  [饂飩、胡瓜、地層0、地層1、地層2、地層3、地層4、地層5、岩石]
    { line: 3, ratio_array: [3, 1, 95, 0, 0, 0, 0, 0, 1] },
    { line: 4, ratio_array: [3, 1, 0, 95, 0, 0, 0, 0, 1] },
    { line: 5, ratio_array: [3, 1, 0, 0, 95, 0, 0, 0, 1] },
    { line: 10, ratio_array: [3, 1, 95, 0, 0, 0, 0, 0, 1] },

    { line: 20, ratio_array: [3, 1, 70, 8, 7, 5, 3, 2, 1] },
    { line: 40, ratio_array: [3, 1, 8, 69, 7, 5, 3, 2, 2] },
    { line: 60, ratio_array: [3, 1, 8, 7, 68, 5, 3, 2, 3] },
    { line: 80, ratio_array: [3, 1, 8, 7, 5, 67, 3, 2, 4] },
    { line: 100, ratio_array: [3, 1, 8, 7, 5, 3, 66, 2, 5] },
    { line: 120, ratio_array: [3, 1, 8, 7, 5, 3, 2, 65, 6] },

    { line: 140, ratio_array: [3, 2, 64, 7, 6, 5, 4, 2, 7] },
    { line: 160, ratio_array: [3, 2, 7, 63, 6, 5, 4, 2, 8] },
    { line: 180, ratio_array: [3, 2, 7, 6, 62, 5, 4, 2, 9] },
    { line: 200, ratio_array: [3, 2, 7, 6, 5, 61, 4, 2, 10] },
    { line: 220, ratio_array: [3, 2, 7, 6, 5, 4, 61, 2, 10] },
    { line: 240, ratio_array: [3, 2, 8, 6, 5, 4, 2, 60, 10] },

    { line: 260, ratio_array: [3, 2, 50, 10, 9, 7, 5, 4, 10] },
    { line: 280, ratio_array: [3, 2, 10, 49, 9, 7, 5, 4, 11] },
    { line: 300, ratio_array: [3, 2, 10, 9, 49, 7, 5, 4, 11] },
    { line: 320, ratio_array: [3, 2, 10, 9, 7, 48, 6, 4, 11] },
    { line: 340, ratio_array: [3, 2, 10, 9, 7, 6, 48, 4, 11] },
    { line: 360, ratio_array: [3, 2, 10, 9, 7, 6, 4, 47, 12] },

    { line: 380, ratio_array: [3, 3, 37, 12, 11, 9, 7, 6, 12] },
    { line: 400, ratio_array: [3, 3, 12, 36, 11, 10, 7, 6, 12] },
    { line: 420, ratio_array: [3, 3, 12, 11, 36, 10, 7, 6, 12] },
    { line: 440, ratio_array: [3, 3, 12, 11, 10, 35, 7, 6, 13] },
    { line: 460, ratio_array: [3, 3, 12, 11, 10, 7, 35, 6, 13] },
    { line: 480, ratio_array: [3, 3, 12, 11, 10, 8, 6, 34, 13] },

    { line: 500, ratio_array: [3, 3, 24, 14, 13, 12, 10, 8, 13] },
    { line: 520, ratio_array: [3, 3, 14, 23, 13, 12, 10, 8, 14] },
    { line: 540, ratio_array: [3, 3, 14, 13, 23, 12, 10, 8, 14] },
    { line: 560, ratio_array: [3, 3, 15, 14, 12, 22, 9, 8, 14] },
    { line: 580, ratio_array: [3, 3, 15, 14, 12, 9, 22, 8, 14] },
    { line: 600, ratio_array: [3, 3, 17, 16, 14, 13, 12, 21, 1] },

    { line: 620, ratio_array: [3, 3, 30, 15, 14, 13, 11, 10, 1] },
    { line: 640, ratio_array: [3, 3, 15, 29, 14, 13, 11, 10, 2] },
    { line: 680, ratio_array: [3, 3, 15, 14, 27, 13, 11, 10, 4] },
    { line: 700, ratio_array: [3, 3, 15, 14, 13, 25, 11, 10, 6] },
    { line: 720, ratio_array: [3, 3, 15, 14, 13, 11, 23, 10, 8] },
    { line: 740, ratio_array: [3, 3, 15, 14, 13, 11, 10, 21, 10] },

    { line: 760, ratio_array: [3, 3, 18, 15, 14, 13, 13, 11, 10] },
    { line: 780, ratio_array: [3, 3, 15, 18, 14, 13, 12, 10, 12] },
    { line: 800, ratio_array: [3, 3, 15, 14, 18, 13, 12, 10, 12] },
    { line: 820, ratio_array: [3, 3, 15, 14, 12, 18, 11, 10, 14] },
    { line: 840, ratio_array: [3, 3, 15, 14, 12, 11, 18, 10, 14] },
    { line: 860, ratio_array: [3, 3, 15, 13, 12, 11, 10, 17, 16] },

    { line: 1000, ratio_array: [2, 3, 12, 12, 13, 13, 14, 15, 16] },

    { line: 1050, ratio_array: [2, 3, 59, 8, 7, 5, 4, 2, 10] },
    { line: 1100, ratio_array: [2, 3, 8, 59, 7, 5, 4, 2, 10] },
    { line: 1150, ratio_array: [2, 3, 8, 7, 57, 5, 4, 2, 12] },
    { line: 1200, ratio_array: [2, 3, 8, 7, 5, 57, 4, 2, 12] },
    { line: 1250, ratio_array: [2, 3, 8, 7, 5, 4, 55, 2, 14] },
    { line: 1300, ratio_array: [2, 3, 8, 7, 5, 4, 2, 55, 14] },

    { line: 1350, ratio_array: [2, 3, 54, 7, 6, 5, 4, 3, 16] },
    { line: 1400, ratio_array: [2, 3, 7, 54, 6, 5, 4, 3, 16] },
    { line: 1450, ratio_array: [2, 3, 8, 6, 52, 5, 4, 3, 17] },
    { line: 1500, ratio_array: [2, 3, 8, 6, 5, 52, 4, 3, 17] },
    { line: 1550, ratio_array: [2, 3, 8, 7, 5, 4, 50, 3, 18] },
    { line: 1600, ratio_array: [2, 3, 8, 7, 5, 4, 3, 50, 18] },

    { line: 1650, ratio_array: [2, 3, 50, 9, 8, 7, 6, 5, 10] },
    { line: 1700, ratio_array: [2, 3, 9, 48, 8, 7, 6, 5, 12] },
    { line: 1750, ratio_array: [2, 3, 9, 8, 46, 7, 6, 5, 14] },
    { line: 1800, ratio_array: [2, 3, 9, 8, 7, 44, 6, 5, 16] },
    { line: 1850, ratio_array: [2, 3, 9, 8, 7, 6, 42, 5, 18] },
    { line: 1900, ratio_array: [2, 3, 10, 9, 7, 6, 5, 40, 18] },

    { line: 1950, ratio_array: [2, 3, 36, 11, 10, 9, 8, 6, 15] },
    { line: 2000, ratio_array: [2, 3, 11, 35, 10, 9, 8, 6, 16] },
    { line: 2100, ratio_array: [2, 3, 11, 10, 34, 9, 8, 6, 17] },
    { line: 2200, ratio_array: [2, 3, 11, 10, 9, 33, 8, 6, 18] },
    { line: 2300, ratio_array: [2, 3, 12, 10, 9, 8, 32, 7, 17] },
    { line: 2400, ratio_array: [2, 3, 12, 10, 9, 8, 7, 31, 18] },

    { line: 2500, ratio_array: [2, 3, 26, 13, 12, 11, 10, 8, 15] },
    { line: 2600, ratio_array: [2, 3, 13, 25, 12, 11, 10, 8, 16] },
    { line: 2700, ratio_array: [2, 3, 12, 12, 25, 11, 10, 8, 17] },
    { line: 2800, ratio_array: [2, 3, 12, 12, 11, 24, 10, 8, 18] },
    { line: 2900, ratio_array: [2, 3, 13, 12, 11, 10, 23, 9, 17] },
    { line: 3000, ratio_array: [2, 3, 14, 13, 11, 9, 8, 22, 18] },

    { line: 3100, ratio_array: [2, 3, 22, 14, 13, 12, 10, 9, 15] },
    { line: 3200, ratio_array: [2, 3, 14, 22, 13, 12, 10, 8, 16] },
    { line: 3300, ratio_array: [2, 3, 14, 13, 22, 12, 9, 8, 17] },
    { line: 3400, ratio_array: [2, 3, 14, 13, 11, 22, 9, 8, 18] },
    { line: 3500, ratio_array: [2, 3, 14, 13, 12, 9, 22, 8, 17] },
    { line: 3600, ratio_array: [2, 3, 14, 13, 11, 9, 8, 22, 18] },

    { line: 3700, ratio_array: [2, 3, 21, 14, 13, 11, 11, 9, 16] },
    { line: 3800, ratio_array: [2, 3, 14, 21, 13, 11, 10, 9, 17] },
    { line: 3900, ratio_array: [2, 3, 14, 13, 21, 11, 10, 8, 18] },
    { line: 4000, ratio_array: [2, 3, 13, 12, 11, 21, 10, 9, 19] },
    { line: 4250, ratio_array: [2, 3, 13, 12, 11, 10, 21, 8, 20] },

    { line: 4500, ratio_array: [2, 3, 9, 11, 12, 20, 14, 15, 14] },
    { line: 4750, ratio_array: [2, 3, 9, 10, 11, 14, 20, 15, 16] },
    { line: 5000, ratio_array: [2, 3, 9, 10, 11, 13, 14, 20, 18] },

    { line: 2147483647, ratio_array: [2, 3, 11, 11, 11, 11, 12, 19, 20] },
];

const BG_WIDTH = 10;// BG幅（キャラ数）
const BG_HEIGHT = 20;// BG高さ（キャラ数）
let bgData = [
    { line: -4, array: [null, null, null, null, null, null, null, null, null, null] },
    { line: -3, array: [null, null, null, null, null, null, null, null, null, null] },
    { line: -2, array: [null, null, null, null, null, null, null, null, null, null] },
    { line: -1, array: [null, null, null, null, null, null, null, null, null, null] },
    { line: 0, array: [null, null, null, null, null, null, null, null, null, null] },

    { line: 1, array: [null, null, null, null, null, null, null, null, null, null] },
    { line: 2, array: [null, null, null, null, null, null, null, null, null, null] },
    { line: 3, array: [null, null, null, null, null, null, null, null, null, null] },
    { line: 4, array: [null, null, null, null, null, null, null, null, null, null] },
    { line: 5, array: [null, null, null, null, null, null, null, null, null, null] },

    { line: 6, array: [null, null, null, null, null, null, null, null, null, null] },
    { line: 7, array: [null, null, null, null, null, null, null, null, null, null] },
    { line: 8, array: [null, null, null, null, null, null, null, null, null, null] },
    { line: 9, array: [null, null, null, null, null, null, null, null, null, null] },
    { line: 10, array: [null, null, null, null, null, null, null, null, null, null] },

    { line: 11, array: [null, null, null, null, null, null, null, null, null, null] },
    { line: 12, array: [null, null, null, null, null, null, null, null, null, null] },
    { line: 13, array: [null, null, null, null, null, null, null, null, null, null] },
    { line: 14, array: [null, null, null, null, null, null, null, null, null, null] },
    { line: 15, array: [null, null, null, null, null, null, null, null, null, null] },
];
function setBgDataArray(xx, yy, val) {
    bgData[yy].array[xx] = val;
}
function getBgDataArray(xx, yy) {
    return bgData[yy].array[xx];
}
function setBgDataLine(yy, line) {
    bgData[yy].line = line;
}
function getBgDataLine(yy) {
    return bgData[yy].line;
}
function getBgDataIsEven(yy) {
    return bgData[yy].line % 2 == 0;
}
function debugPrintBgData() {
    for (let yy = 0; yy < BG_HEIGHT - 1; yy++) {
        let dbg_str = "";
        dbg_str += bgData[yy].line + ",";
        dbg_str += "[";
        for (let xx = 0; xx < BG_WIDTH; xx++) {
            dbg_str += "{";
            dbg_str += getBgDataArray(xx, yy).kind.mc_idx + ",";
            dbg_str += getBgDataArray(xx, yy).xPos + ",";
            dbg_str += getBgDataArray(xx, yy).yPos;
            dbg_str += "},";
        }
        dbg_str += "]";
        console.log(dbg_str);
    }
}

function scrollBgData() {
    // 一番上の列を削除
    let yy = 0;
    for (let xx = 0; xx < BG_WIDTH; xx++) {
        getBgDataArray(xx, yy).remove();
    }

    // １列づつ上に上げる
    for (let yy = 0; yy < BG_HEIGHT - 1; yy++) {
        bgData[yy].line = bgData[yy + 1].line;
        for (let xx = 0; xx < BG_WIDTH; xx++) {
            setBgDataArray(xx, yy, getBgDataArray(xx, yy + 1));
            let tmp = getBgDataArray(xx, yy);
            tmp.yPos -= 128;
            tmp.setPosition(tmp.xPos, tmp.yPos);
        }
    }

    // 一番下の列を生成
    yy = BG_HEIGHT - 1;
    bgData[yy].line++;
    makeBgData(yy);
}

function makeBgData(yy) {
    let nowLine = getBgDataLine(yy);
    let isEven = (nowLine % 2 == 0);
    for (let xx = 0; xx < BG_WIDTH; xx++) {
        if (nowLine <= 1) {
            setBgDataArray(xx, yy, new MapChipSprite(xx, yy, 0, MAP_CHIP_DEF.BLANK).addChildTo(group0));
        } else {
            if (xx == 0) {
                setBgDataArray(xx, yy, new MapChipSprite(xx, yy, isEven, MAP_CHIP_DEF.BLOCK).addChildTo(group0));
                continue;
            }
            if (isEven) {
                if (xx >= 8) {
                    setBgDataArray(xx, yy, new MapChipSprite(xx, yy, isEven, MAP_CHIP_DEF.BLOCK).addChildTo(group0));
                    continue;
                }
            } else {
                if (xx >= 9) {
                    setBgDataArray(xx, yy, new MapChipSprite(xx, yy, isEven, MAP_CHIP_DEF.BLOCK).addChildTo(group0));
                    continue;
                }
            }
            let mapChipDef = decideBgMapChipDef(nowLine);
            if ((nowLine === 4) && (xx === 1)) mapChipDef = MAP_CHIP_DEF.STRATA_1;
            else if ((nowLine === 4) && (xx === 2)) mapChipDef = MAP_CHIP_DEF.UDON;
            else if (nowLine % 100 === 0) mapChipDef = MAP_CHIP_DEF.ROCK;
            setBgDataArray(xx, yy, new MapChipSprite(xx, yy, isEven, mapChipDef).addChildTo(group0));
        }
    }
}
function decideBgMapChipDef(nowLine) {
    let tmpRatio = 0;
    for (let ii = 0; ii < bgAppearTable.length; ii++) {
        let tmp = bgAppearTable[ii];
        if (nowLine > tmp.line) continue;
        let target = myRandom(1, 100);
        for (let jj = 0; jj < tmp.ratio_array.length; jj++) {
            tmpRatio += tmp.ratio_array[jj];
            if (tmpRatio < target) {
                continue;
            }
            return bgAppearMapChipTable[jj];
        }
    }
}

//
class CharaStatus {
    constructor() {
        this.lv = 1;
        this.gavasss = 0;
    }
    initPlayer() {
    }
}

// 表示プライオリティは 0：奥 → 4：手前 の順番
let group0 = null;  // bg
let group1 = null;  // player, boss, enemy
let group2 = null;  // status

const DIR_KEY_DEF = defineEnum({
    NONE: {
        value: -1,
        addX: 0,
        addY: 0,
    },
    LEFT: {
        value: 2,
        addX: -1,
        addY: 0,
    },
    RIGHT: {
        value: 6,
        addX: 1,
        addY: 0,
    },
});

let player = null;
let boss = null;

let shakeYPosTable = [
    //    0, 2, -1, 4, -2, 8, -3, 16
    0, 8, -1, 16, -2, 32, -3, 64
];

var randomSeed = 3557;
var randomMode = Boolean(0);

class TurnControl {
    constructor() {
        this.isPlayer = true;   // true:
    }
}
let trunControl = null;

phina.main(function () {
    var app = GameApp({
        startLabel: 'logo',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        assets: ASSETS,
        fps: FPS,
        backgroundColor: 'black',

        // シーンのリストを引数で渡す
        scenes: [
            {
                className: 'LogoScene',
                label: 'logo',
                nextLabel: 'title',
            },
            {
                className: 'TitleScene',
                label: 'title',
                nextLabel: 'game',
            },
            {
                className: 'GameScene',
                label: 'game',
                nextLabel: 'game',
            },
        ]
    });

    // iOSなどでユーザー操作がないと音がならない仕様対策
    // 起動後初めて画面をタッチした時に『無音』を鳴らす
    app.domElement.addEventListener('touchend', function dummy() {
        var s = phina.asset.Sound();
        s.loadFromBuffer();
        s.play().stop();
        app.domElement.removeEventListener('touchend', dummy);
    });

    // fps表示
    //app.enableStats();

    // 実行
    app.run();
});

/*
* ローディング画面をオーバーライド
*/
phina.define('LoadingScene', {
    superClass: 'DisplayScene',

    init: function (options) {
        this.superInit(options);
        // 背景色
        var self = this;
        var loader = phina.asset.AssetLoader();

        // 明滅するラベル
        let label = phina.display.Label({
            text: "",
            fontSize: 64,
            fill: 'white',
        }).addChildTo(this).setPosition(SCREEN_CENTER_X, SCREEN_CENTER_Y);

        // ロードが進行したときの処理
        loader.onprogress = function (e) {
            // 進捗具合を％で表示する
            label.text = "{0}%".format((e.progress * 100).toFixed(0));
        };

        // ローダーによるロード完了ハンドラ
        loader.onload = function () {
            // Appコアにロード完了を伝える（==次のSceneへ移行）
            self.flare('loaded');
        };

        // ロード開始
        loader.load(options.assets);
    },
});

/*
 * ロゴ
 */
phina.define("LogoScene", {
    superClass: 'DisplayScene',

    init: function (option) {
        this.superInit(option);

        this.localTimer = 0;
    },

    update: function (app) {
        // フォント読み込み待ち
        var self = this;
        document.fonts.load('12px "Press Start 2P"').then(function () {
            self.exit();
        });
    }
});

/*
 * タイトル
 */
phina.define("TitleScene", {
    superClass: 'DisplayScene',

    init: function (option) {
        this.superInit(option);

        this.titleLabel = Label({
            text: "C.O.K.S.",
            fontSize: 120,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#fff",
            x: SCREEN_CENTER_X,
            y: SCREEN_CENTER_Y,
        }).addChildTo(this);

        this.startButton = Button({
            text: "START",
            fontSize: 96,
            fontFamily: FONT_FAMILY,
            fill: "#444",
            x: SCREEN_CENTER_X,
            y: SCREEN_CENTER_Y + 320,
            width: 512,
            height: 160,
            cornerRadius: 8,
        }).addChildTo(this);
        this.localTimer = 0;
        var self = this;
        this.startButton.onpointstart = function () {
            self.exit();
        };

        for (let ii = 0; ii < bgAppearTable.length; ii++) {
            let total = 0;
            let tmp = bgAppearTable[ii];
            for (let jj = 0; jj < tmp.ratio_array.length; jj++) {
                total += tmp.ratio_array[jj];
            }
            if (total != 100) {
                console.log("line=" + tmp.line + " is not 100(" + total + ")")
            }
        }
    },

    update: function (app) {
    }
});

/*
 * ゲーム
 */
phina.define("GameScene", {
    superClass: 'DisplayScene',

    init: function (option) {
        this.superInit(option);

        if (!randomMode) randomSeed = 3557;

        group0 = DisplayElement().addChildTo(this);   // BG
        group1 = DisplayElement().addChildTo(this);   // プレイヤー、敵
        group2 = DisplayElement().addChildTo(this);   // status, cmd, message

        for (let yy = 0; yy < BG_HEIGHT; yy++) {
            makeBgData(yy);
        }

        player = new PlayerSprite().addChildTo(group1);
        boss = new Boss().addChildTo(group1);

        this.nowDepthLabel = Label({
            text: "0m",
            fontSize: 80,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#fff",
            shadow: "#000",
            shadowBlur: 10,
            x: SCREEN_CENTER_X,
            y: 64,
        }).addChildTo(group2);
        this.nowScoreLabel = Label({
            text: "0",
            fontSize: 80,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#fff",
            shadow: "#000",
            shadowBlur: 10,
            x: SCREEN_CENTER_X,
            y: SCREEN_HEIGHT - 64,
        }).addChildTo(group2);
        this.gameOverLabel = Label({
            text: "GAME OVER",
            fontSize: 120,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#fff",
            shadow: "#000",
            shadowBlur: 50,
            x: SCREEN_CENTER_X,
            y: SCREEN_CENTER_Y - 512,
        }).addChildTo(group2);

        this.tweetButton = Button({
            text: "POST",
            fontSize: 52,
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#7575EF",
            x: SCREEN_CENTER_X - 300,
            y: SCREEN_CENTER_Y + 128,
            cornerRadius: 8,
            width: 400,
            height: 120,
        }).addChildTo(group2);
        this.tweetButton.alpha = 0.0;
        this.restartButton = Button({
            fontSize: 52,
            text: "RESTART",
            fontFamily: FONT_FAMILY,
            align: "center",
            fill: "#B2B2B2",
            x: SCREEN_CENTER_X + 300,
            y: SCREEN_CENTER_Y + 128,
            cornerRadius: 8,
            width: 400,
            height: 120,
        }).addChildTo(group2);
        this.restartButton.alpha = 0.0;
        this.keyLeft = Button({
            text: "左",
            fontFamily: FONT_FAMILY,
            fontSize: 192,
            width: SCREEN_WIDTH / 2,
            height: SCREEN_HEIGHT,
            fill: "hsl(60, 100%, 75%)",
            x: SCREEN_WIDTH / 4,
            y: SCREEN_CENTER_Y,
        }).addChildTo(group2);
        this.keyLeft.alpha = 0.0;
        this.keyRight = Button({
            text: "右",
            fontFamily: FONT_FAMILY,
            fontSize: 192,
            width: SCREEN_WIDTH / 2,
            height: SCREEN_HEIGHT,
            fill: "hsl(60, 100%, 70%)",
            x: SCREEN_CENTER_X + SCREEN_WIDTH / 4,
            y: SCREEN_CENTER_Y,
        }).addChildTo(group2);
        this.keyRight.alpha = 0.0;

        this.tweetButton.sleep();
        this.restartButton.sleep();

        var self = this;
        this.restartButton.onpointstart = function () {
            // BGスプライトのremove
            for (let yy = 0; yy < BG_HEIGHT - 1; yy++) {
                for (let xx = 0; xx < BG_WIDTH; xx++) {
                    if (getBgDataArray(xx, yy) != null) {
                        getBgDataArray(xx, yy).remove();
                        setBgDataArray(xx, yy, null);
                    }
                }
            }
            // BG配列の初期化
            let tmpLine = -4;
            for (let yy = 0; yy < BG_HEIGHT; yy++) {
                setBgDataLine(yy, tmpLine++);
            }
            // playerのremove
            if (player != null) {
                player.remove();
                player = null;
            }
            // bossのremove
            if (boss != null) {
                boss.remove();
                boss = null;
            }
            self.exit();
        };

        this.keyLeft.sleep();
        this.keyLeft.onpointstart = function () {
            if (!player.status.isAccKey) return;
            if (++player.aminCount > 1) player.aminCount = 0;
            player.aminBase = "left";

            if (player.isEven) {
                if (player.xBgPos <= 1) return;
                let xx = player.xBgPos - 1;
                let yy = player.yBgPos + 1;
                if (player.powerUpTimer <= 0) {
                    if (getBgDataArray(xx, yy).hp-- >= 0) return;
                }
                player.xBgPos--;
            } else {
                if (player.xBgPos <= 0) return;
                let xx = player.xBgPos;
                let yy = player.yBgPos + 1;
                if (player.powerUpTimer <= 0) {
                    if (getBgDataArray(xx, yy).hp-- >= 0) return;
                }
            }
            let xx = player.xBgPos;
            let yy = player.yBgPos + 1;
            if (getBgDataArray(xx, yy).kind == MAP_CHIP_DEF.UDON) {
                // パワーアップ
                player.powerUpTimer += POWER_UP_TIME;
                if (player.powerUpTimer > MAX_POWER_UP_TIME) player.powerUpTimer = MAX_POWER_UP_TIME;
                SoundManager.play("coin_se");
            }
            if (getBgDataArray(xx, yy).kind == MAP_CHIP_DEF.CUCUMBER) {
                // 死亡
                player.status = PL_STATUS.DEAD_INIT;
            } else {
                if (getBgDataArray(xx, yy).kind.se != null) {
                    SoundManager.play(getBgDataArray(xx, yy).kind.se);
                }
                player.score += getBgDataArray(xx, yy).kind.point;
                if (player.powerUpTimer > 0) {
                    if (getBgDataArray(xx, yy).kind == MAP_CHIP_DEF.ROCK) {
                        player.powerUpTimer = parseInt(player.powerUpTimer / 2);
                    }
                    player.score += getBgDataArray(xx, yy).kind.point;
                }
                getBgDataArray(xx, yy).remove();
                setBgDataArray(xx, yy, new MapChipSprite(xx, yy, getBgDataIsEven(yy), MAP_CHIP_DEF.BLANK).addChildTo(group0));
                player.status = PL_STATUS.SHAKE;
                player.shakeTimer = 7;
            }

            if (player.isEven) player.isEven = false;
            else player.isEven = true;
            player.isEven = (getBgDataLine(yy) % 2 != 0);
            scrollBgData();
            player.depth++;
            boss.yPos -= 128;
        };

        this.keyRight.sleep();
        this.keyRight.onpointstart = function () {
            if (!player.status.isAccKey) return;
            if (++player.aminCount > 1) player.aminCount = 0;
            player.aminBase = "right";

            if (player.isEven) {
                if (player.xBgPos >= 8) return;
                let xx = player.xBgPos;
                let yy = player.yBgPos + 1;
                if (player.powerUpTimer <= 0) {
                    if (getBgDataArray(xx, yy).hp-- >= 0) return;
                }
            } else {
                if (player.xBgPos >= 9) return;
                let xx = player.xBgPos + 1;
                let yy = player.yBgPos + 1;
                if (player.powerUpTimer <= 0) {
                    if (getBgDataArray(xx, yy).hp-- >= 0) return;
                }
                player.xBgPos++;
            }
            let xx = player.xBgPos;
            let yy = player.yBgPos + 1;
            if (getBgDataArray(xx, yy).kind == MAP_CHIP_DEF.UDON) {
                // パワーアップ
                player.powerUpTimer += POWER_UP_TIME;
                if (player.powerUpTimer > MAX_POWER_UP_TIME) player.powerUpTimer = MAX_POWER_UP_TIME;
                SoundManager.play("coin_se");
            }
            if (getBgDataArray(xx, yy).kind == MAP_CHIP_DEF.CUCUMBER) {
                // 死亡
                player.status = PL_STATUS.DEAD_INIT;
            } else {
                if (getBgDataArray(xx, yy).kind.se != null) {
                    SoundManager.play(getBgDataArray(xx, yy).kind.se);
                }
                player.score += getBgDataArray(xx, yy).kind.point;
                if (player.powerUpTimer > 0) {
                    if (getBgDataArray(xx, yy).kind == MAP_CHIP_DEF.ROCK) {
                        player.powerUpTimer = parseInt(player.powerUpTimer / 2);
                    }
                    player.score += getBgDataArray(xx, yy).kind.point;
                }
                getBgDataArray(xx, yy).remove();
                setBgDataArray(xx, yy, new MapChipSprite(xx, yy, getBgDataIsEven(yy), MAP_CHIP_DEF.BLANK).addChildTo(group0));
                player.status = PL_STATUS.SHAKE;
                player.shakeTimer = 7;
            }

            if (player.isEven) player.isEven = false;
            else player.isEven = true;
            scrollBgData();
            player.depth++;
            boss.yPos -= 128;
        };

        this.nowDepthLabel.text = "0m";
        this.nowScoreLabel.text = "9999";
        this.buttonAlpha = 0.0;
        frame = 0;
    },

    // main loop
    update: function (app) {

        if ((player.status === PL_STATUS.DEAD_INIT) || (player.status === PL_STATUS.DEAD)) {
            if (player.status === PL_STATUS.DEAD_INIT) {
                SoundManager.play("fall_se");
                player.status = PL_STATUS.DEAD;
            }

            var self = this;
            // tweet ボタン
            this.tweetButton.onclick = function () {
                var twitterURL = phina.social.Twitter.createURL({
                    type: "tweet",
                    text: "C.O.K.S. 地下" + player.depth + "m に到達（スコア：" + player.score + "）\n",
                    hashtags: ["ネムレス", "NEMLESSS"],
                    url: "https://iwasaku.github.io/test8/COKS/",
                });
                window.open(twitterURL);
            };

            this.keyLeft.wakeUp();
            this.keyRight.wakeUp();

            this.buttonAlpha += 0.05;
            if (this.buttonAlpha > 1.0) {
                this.buttonAlpha = 1.0;
            }
            this.gameOverLabel.alpha = this.buttonAlpha;
            this.tweetButton.alpha = this.buttonAlpha;
            this.restartButton.alpha = this.buttonAlpha;
            if (this.buttonAlpha > 0.7) {
                this.tweetButton.wakeUp();
                this.restartButton.wakeUp();
            }
            this.keyLeft.alpha = 0.0;
            this.keyRight.alpha = 0.0;
        } else if (player.status === PL_STATUS.SHAKE) {
            if (--player.shakeTimer <= 0) {
                player.status = PL_STATUS.START;
                player.shakeTimer = 0;
            }
        } else {
            if (!player.status.isStarted) {
                this.gameOverLabel.alpha = 0.0;
                this.keyLeft.alpha = 0.0;
                this.keyLeft.wakeUp();
                this.keyRight.alpha = 0.0;
                this.keyRight.wakeUp();
                player.status = PL_STATUS.START;
            }
            this.keyLeft.alpha = 0.0;
            this.keyRight.alpha = 0.0;

            if (player.powerUpTimer > 0) {
                player.powerUpTimer--;
                player.anim.gotoAndPlay("nmls");
            } else {
                player.powerUpTimer = 0;
                player.anim.gotoAndPlay(player.aminBase + player.aminCount);
            }

            var ySpd = 0;
            var yLmt = 0;
            if (player.depth <= 50) {
                ySpd = 2;
                yLmt = -150;
            } else if (player.depth <= 100) {
                ySpd = 3;
                yLmt = -100;
            } else if (player.depth <= 150) {
                ySpd = 4;
                yLmt = -50;
            } else if (player.depth <= 200) {
                ySpd = 5;
                yLmt = 0;
            } else if (player.depth <= 250) {
                ySpd = 6;
                yLmt = 100;
            } else if (player.depth <= 300) {
                ySpd = 6;
                yLmt = 150;
            } else if (player.depth <= 350) {
                ySpd = 6;
                yLmt = 200;
            } else if (player.depth <= 400) {
                ySpd = 6;
                yLmt = 250;
            } else if (player.depth <= 450) {
                ySpd = 6;
                yLmt = 300;
            } else if (player.depth <= 500) {
                ySpd = 6;
                yLmt = 350;
            } else if (player.depth <= 550) {
                ySpd = 6;
                yLmt = 400;
            } else if (player.depth <= 600) {
                ySpd = 6;
                yLmt = 450;
            } else if (player.depth <= 650) {
                ySpd = 7;
                yLmt = 500;
            } else if (player.depth <= 700) {
                ySpd = 7;
                yLmt = 550;
            } else if (player.depth <= 750) {
                ySpd = 7;
                yLmt = 600;
            } else if (player.depth <= 800) {
                ySpd = 7;
                yLmt = 650;
            } else if (player.depth <= 850) {
                ySpd = 7;
                yLmt = 700;
            } else if (player.depth <= 900) {
                ySpd = 7;
                yLmt = 750;
            } else if (player.depth <= 950) {
                ySpd = 7;
                yLmt = 800;
            } else if (player.depth <= 1000) {
                ySpd = 8;
                yLmt = 1000;
            } else if (player.depth <= 1500) {
                ySpd = 9;
                yLmt = 1050;
            } else if (player.depth <= 2000) {
                ySpd = 10;
                yLmt = 1100;
            } else if (player.depth <= 3000) {
                ySpd = 11;
                yLmt = 1150;
            } else {
                ySpd = 12;
                yLmt = 1200;
            }
            boss.yPos += ySpd;
            if (boss.yPos < -SCREEN_HEIGHT + yLmt) {
                boss.yPos = -SCREEN_HEIGHT + yLmt;
            }
        }
        //        this.nowDepthLabel.text = player.depth + "m\nPUT=" + player.powerUpTimer;
        this.nowDepthLabel.text = player.depth + "m";
        this.nowScoreLabel.text = player.score;

        ++frame;
    }
});

/*
 * Player
 */
phina.define("PlayerSprite", {
    superClass: 'Sprite',
    init: function (option) {
        this.superInit("nmls", 128, 128);
        this.anim = FrameAnimation('player_ss').attachTo(this);
        this.anim.fit = false;
        this.direct = '';
        this.zRot = 0;
        this.xBgPos = 4;
        this.yBgPos = 5;
        this.isEven = true;
        this.xOfs = this.isEven ? 64 : 0;
        this.xPos = (this.xBgPos * 128) + this.xOfs;
        this.yPos = (this.yBgPos * 128) + 64;
        this.setPosition(this.xPos, this.yPos).setScale(1, 1);
        this.setInteractive(false);
        this.setBoundingType("rect");
        this.anim.gotoAndPlay("left0");
        this.aminBase = "left";
        this.aminCount = 0;

        this.status = PL_STATUS.INIT;
        this.depth = 0;
        this.score = 0;
        this.powerUpTimer = 0;
    },

    update: function (app) {
        this.xOfs = this.isEven ? 0 : 64;
        this.xPos = (this.xBgPos * 128) + this.xOfs;
        this.yPos = (this.yBgPos * 128) + 64;
        this.setPosition(this.xPos, this.yPos).setScale(1, 1);
        if (!player.status.isDead) {
            if (boss.yPos > SCREEN_CENTER_Y / 32) {
                player.status = PL_STATUS.DEAD_INIT;
            }
        }
    },
});

/*
 * Boss
 */
phina.define("Boss", {
    superClass: "Sprite",

    init: function (option) {
        this.superInit("boss", 1280, 2406);
        this.direct = '';
        this.zRot = 0;
        this.xPos = SCREEN_CENTER_X;
        this.yPos = -SCREEN_HEIGHT + 1203;
        this.setPosition(this.xPos, this.yPos).setScale(1, 1);
        this.setInteractive(false);
        this.setBoundingType("rect");
    },

    update: function (app) {
        this.setPosition(this.xPos, this.yPos).setScale(1, 1);
    },
});

/*
 * マップ用スプライトの定義
 */
phina.define("MapChipSprite", {
    superClass: 'Sprite',

    init: function (xPos, yPos, isEven, kind) {
        this.superInit("map_chip", 128, 132);
        this.anim = FrameAnimation('map_chip_ss').attachTo(this);
        this.anim.fit = false;
        this.direct = '';
        this.zRot = 0;
        this.xOfs = isEven ? 64 : 0;
        this.xPos = (xPos * 128) + this.xOfs;
        this.yPos = (yPos * 128) + 64;
        this.setPosition(this.xPos, this.yPos).setScale(1, 1);
        this.setInteractive(false);
        this.setBoundingType("rect");
        this.anim.gotoAndPlay("" + kind.mc_idx);
        this.alpha = 1;
        this.kind = kind;
        this.hp = kind.hp;
    },

    update: function (app) {
        if (player != null) {
            if (player.shakeTimer >= 0) {
                this.setPosition(this.xPos, this.yPos + shakeYPosTable[player.shakeTimer]).setScale(1, 1);
            }
        }
    },
});

// 指定の範囲で乱数を求める
// ※start < end
// ※startとendを含む
function myRandom(start, end) {
    if (randomMode) {
        var max = (end - start) + 1;
        return Math.floor(Math.random() * Math.floor(max)) + start;
    } else {
        var mod = (end - start) + 1;
        randomSeed = (randomSeed * 5) + 1;
        for (; ;) {
            if (randomSeed < 2147483647) break;
            randomSeed -= 2147483647;
        }
        return (randomSeed % mod) + start;
    }
}
