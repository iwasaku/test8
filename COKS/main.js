//console.log = function () { };  // ログを出す時にはコメントアウトする

const SCREEN_WIDTH = 1280 - 128;             // スクリーン幅
const SCREEN_HEIGHT = 2436;                 // スクリーン高さ
const SCREEN_CENTER_X = SCREEN_WIDTH / 2;   // スクリーン幅の半分
const SCREEN_CENTER_Y = SCREEN_HEIGHT / 2;  // スクリーン高さの半分

const FPS = 60; // 60フレ

const FONT_FAMILY = "'misaki_gothic','Meiryo',sans-serif";
const ASSETS = {
    "nmls": "./resource/new_nmls_128.png",
    "boss": "./resource/boss.png",

    "map_chip": "./resource/map_chip.png?3",  // 背景チップ
};
const fallSE = new Howl({
    src: 'https://iwasaku.github.io/test7/NEMLESSSTER/resource/fall.mp3?20200708'
});
const coinSE = new Howl({
    src: 'https://iwasaku.github.io/test7/NEMLESSSTER/resource/coin05.mp3'
});
const explosion0SE = new Howl({
    src: 'https://iwasaku.github.io/test8/COKS/resource/explosion_0.mp3'
});
const explosion1SE = new Howl({
    src: 'https://iwasaku.github.io/test8/COKS/resource/explosion_1.mp3'
});
const explosion2SE = new Howl({
    src: 'https://iwasaku.github.io/test8/COKS/resource/explosion_2.mp3'
});
const explosion3SE = new Howl({
    src: 'https://iwasaku.github.io/test8/COKS/resource/explosion_3.mp3'
});
const explosion4SE = new Howl({
    src: 'https://iwasaku.github.io/test8/COKS/resource/explosion_4.mp3'
});
const explosion5SE = new Howl({
    src: 'https://iwasaku.github.io/test8/COKS/resource/explosion_5.mp3'
});
const explosion6SE = new Howl({
    src: 'https://iwasaku.github.io/test8/COKS/resource/explosion_6.mp3'
});

const POWER_UP_TIME = 180;    // パワーアップ時間（フレーム数）
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
        string: 'cucunmber'
    },

    STRATA_0: {
        value: 4,
        mc_idx: 4,
        collision: true,
        is_item: false,
        hp: 1,
        point: 1,
        se: explosion0SE,
        string: 'strata_0'
    },

    STRATA_1: {
        value: 5,
        mc_idx: 5,
        collision: true,
        is_item: false,
        hp: 2,
        point: 2,
        se: explosion1SE,
        string: 'strata_1'
    },

    STRATA_2: {
        value: 6,
        mc_idx: 6,
        collision: true,
        is_item: false,
        hp: 3,
        point: 4,
        se: explosion2SE,
        string: 'strata_2'
    },

    STRATA_3: {
        value: 7,
        mc_idx: 7,
        collision: true,
        is_item: false,
        hp: 4,
        point: 8,
        se: explosion3SE,
        string: 'strata_3'
    },

    STRATA_4: {
        value: 8,
        mc_idx: 8,
        collision: true,
        is_item: false,
        hp: 5,
        point: 16,
        se: explosion4SE,
        string: 'strata_4'
    },

    STRATA_5: {
        value: 9,
        mc_idx: 9,
        collision: true,
        is_item: false,
        hp: 6,
        point: 32,
        se: explosion5SE,
        string: 'strata_5'
    },

    ROCK: {
        value: 10,
        mc_idx: 10,
        collision: true,
        is_item: false,
        hp: 10,
        point: 256,
        se: explosion6SE,
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
    { line: 40, ratio_array: [3, 1, 8, 70, 7, 5, 3, 2, 1] },
    { line: 60, ratio_array: [3, 1, 8, 7, 70, 5, 3, 2, 1] },
    { line: 80, ratio_array: [3, 1, 8, 7, 5, 70, 3, 2, 1] },
    { line: 100, ratio_array: [3, 1, 8, 7, 5, 3, 70, 2, 1] },
    { line: 120, ratio_array: [3, 1, 8, 7, 5, 3, 2, 70, 1] },

    { line: 140, ratio_array: [3, 2, 70, 7, 6, 5, 4, 2, 1] },
    { line: 160, ratio_array: [3, 2, 7, 70, 6, 5, 4, 2, 1] },
    { line: 180, ratio_array: [3, 2, 7, 6, 70, 5, 4, 2, 1] },
    { line: 200, ratio_array: [3, 2, 7, 6, 5, 70, 4, 2, 1] },
    { line: 220, ratio_array: [3, 2, 7, 6, 5, 4, 70, 2, 1] },
    { line: 240, ratio_array: [3, 2, 7, 6, 5, 4, 2, 70, 1] },

    { line: 260, ratio_array: [3, 2, 60, 10, 8, 7, 6, 3, 1] },
    { line: 280, ratio_array: [3, 2, 10, 60, 8, 7, 6, 3, 1] },
    { line: 300, ratio_array: [3, 2, 10, 8, 60, 7, 6, 3, 1] },
    { line: 320, ratio_array: [3, 2, 10, 8, 7, 60, 6, 3, 1] },
    { line: 340, ratio_array: [3, 2, 10, 8, 7, 6, 60, 3, 1] },
    { line: 360, ratio_array: [3, 2, 10, 8, 7, 6, 3, 60, 1] },

    { line: 380, ratio_array: [3, 3, 50, 11, 10, 9, 7, 6, 1] },
    { line: 400, ratio_array: [3, 3, 11, 50, 10, 9, 7, 6, 1] },
    { line: 420, ratio_array: [3, 3, 11, 10, 50, 9, 7, 6, 1] },
    { line: 440, ratio_array: [3, 3, 11, 10, 9, 50, 7, 6, 1] },
    { line: 460, ratio_array: [3, 3, 11, 10, 9, 7, 50, 6, 1] },
    { line: 480, ratio_array: [3, 3, 11, 10, 9, 7, 6, 50, 1] },

    { line: 500, ratio_array: [3, 3, 40, 13, 12, 11, 9, 8, 1] },
    { line: 520, ratio_array: [3, 3, 13, 40, 12, 11, 9, 8, 1] },
    { line: 540, ratio_array: [3, 3, 13, 12, 40, 11, 9, 8, 1] },
    { line: 560, ratio_array: [3, 3, 13, 12, 11, 40, 9, 8, 1] },
    { line: 580, ratio_array: [3, 3, 13, 12, 11, 9, 40, 8, 1] },
    { line: 600, ratio_array: [3, 3, 13, 12, 11, 9, 8, 40, 1] },

    { line: 620, ratio_array: [3, 3, 30, 15, 14, 13, 11, 10, 1] },
    { line: 640, ratio_array: [3, 3, 15, 30, 14, 13, 11, 10, 1] },
    { line: 680, ratio_array: [3, 3, 15, 14, 30, 13, 11, 10, 1] },
    { line: 700, ratio_array: [3, 3, 15, 14, 13, 30, 11, 10, 1] },
    { line: 720, ratio_array: [3, 3, 15, 14, 13, 11, 30, 10, 1] },
    { line: 740, ratio_array: [3, 3, 15, 14, 13, 11, 10, 30, 1] },

    { line: 760, ratio_array: [3, 3, 20, 17, 16, 15, 14, 11, 1] },
    { line: 780, ratio_array: [3, 3, 17, 20, 16, 15, 14, 11, 1] },
    { line: 800, ratio_array: [3, 3, 17, 16, 20, 15, 14, 11, 1] },
    { line: 820, ratio_array: [3, 3, 17, 16, 15, 20, 14, 11, 1] },
    { line: 840, ratio_array: [3, 3, 17, 16, 15, 14, 20, 11, 1] },
    { line: 860, ratio_array: [3, 3, 17, 16, 15, 14, 11, 20, 1] },

    { line: 2100000000, ratio_array: [3, 3, 15, 15, 15, 16, 16, 16, 1] },
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
let group1 = null;  // player, enemy
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
let enemy = null;

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

tm.main(function () {
    // アプリケーションクラスを生成
    var app = tm.display.CanvasApp("#world");
    app.resize(SCREEN_WIDTH, SCREEN_HEIGHT);    // サイズ(解像度)設定
    app.fitWindow();                            // 自動フィッティング有効
    app.background = "rgba(77, 136, 255, 1.0)"; // 背景色
    app.fps = FPS;                              // フレーム数

    var loading = tm.ui.LoadingScene({
        assets: ASSETS,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    });

    // 読み込み完了後に呼ばれるメソッドを登録
    loading.onload = function () {
        app.replaceScene(LogoScene());
    };

    // ローディングシーンに入れ替える
    app.replaceScene(loading);

    // 実行
    app.run();
});

/*
 * ロゴ
 */
tm.define("LogoScene", {
    superClass: "tm.app.Scene",

    init: function () {
        this.superInit();
        this.fromJSON({
            children: [
                {
                    type: "Label", name: "logoLabel",
                    x: SCREEN_CENTER_X,
                    y: 320,
                    fillStyle: "#888",
                    fontSize: 64,
                    fontFamily: FONT_FAMILY,
                    text: "",
                    align: "center",
                },
            ]
        });
        this.localTimer = 0;
    },

    update: function (app) {
        // 時間が来たらタイトルへ
        //        if(++this.localTimer >= 5*app.fps)
        this.app.replaceScene(TitleScene());
    }
});

/*
 * タイトル
 */
tm.define("TitleScene", {
    superClass: "tm.app.Scene",

    init: function () {
        this.superInit();
        this.fromJSON({
            children: [
                {
                    type: "Label", name: "titleLabel",
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y,
                    fillStyle: "#fff",
                    fontSize: 160,
                    fontFamily: FONT_FAMILY,
                    text: "C.O.K.S.",
                    align: "center",
                },
                {
                    type: "FlatButton", name: "startButton",
                    init: [
                        {
                            text: "START",
                            fontFamily: FONT_FAMILY,
                            fontSize: 96,
                            width: 512,
                            height: 160,
                            bgColor: "hsl(240, 0%, 70%)",
                        }
                    ],
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y + 320,
                },
            ]
        });
        this.localTimer = 0;

        var self = this;
        this.startButton.onpointingstart = function () {
            self.app.replaceScene(GameScene());
        };
    },

    update: function (app) {
        app.background = "rgba(0, 0, 0, 1.0)"; // 背景色
    }
});

/*
 * ゲーム
 */
tm.define("GameScene", {
    superClass: "tm.app.Scene",

    init: function () {
        this.superInit();
        if (!randomMode) randomSeed = 3557;

        for (let ii = 0; ii < bgAppearTable.length; ii++) {
            let total = 0;
            let tmp = bgAppearTable[ii];
            for (let jj = 0; jj < tmp.ratio_array.length; jj++) {
                total += tmp.ratio_array[jj];
            }
            if (total != 100) {
                console.log("ii=" + ii + " is not 100")
            }
        }
        group0 = tm.display.CanvasElement().addChildTo(this);   // BG
        group1 = tm.display.CanvasElement().addChildTo(this);   // プレイヤー、敵
        group2 = tm.display.CanvasElement().addChildTo(this);   // status, cmd, message

        for (let yy = 0; yy < BG_HEIGHT; yy++) {
            makeBgData(yy);
        }

        //        player = new Player().addChildTo(group1);
        player = new PlayerSprite().addChildTo(group1);
        enemy = new Enemy().addChildTo(group1);

        this.fromJSON({
            children: [
                {
                    type: "Label", name: "nowDepthLabel",
                    x: SCREEN_CENTER_X,
                    y: 64,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 128,
                    fontFamily: FONT_FAMILY,
                    text: "0m",
                    align: "center",
                },
                {
                    type: "Label", name: "nowScoreLabel",
                    x: SCREEN_CENTER_X,
                    y: SCREEN_HEIGHT - 64,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 10,
                    fontSize: 128,
                    fontFamily: FONT_FAMILY,
                    text: "0",
                    align: "center",
                },
                {
                    type: "Label", name: "gameOverLabel",
                    x: SCREEN_CENTER_X,
                    y: SCREEN_CENTER_Y - 512,
                    fillStyle: "#fff",
                    shadowColor: "#000",
                    shadowBlur: 50,
                    fontSize: 192,
                    fontFamily: FONT_FAMILY,
                    text: "GAME OVER",
                    align: "center",
                },
                {
                    type: "FlatButton", name: "tweetButton",
                    init: [
                        {
                            text: "TWEET",
                            fontFamily: FONT_FAMILY,
                            fontSize: 96,
                            width: 400,
                            bgColor: "hsl(205, 81%, 63%)",
                        }
                    ],
                    x: SCREEN_CENTER_X + 300,
                    y: SCREEN_CENTER_Y + 128,
                    alpha: 0.0,
                },
                {
                    type: "FlatButton", name: "restartButton",
                    init: [
                        {
                            text: "RESTART",
                            fontFamily: FONT_FAMILY,
                            fontSize: 96,
                            width: 400,
                            bgColor: "hsl(240, 0%, 70%)",
                        }
                    ],
                    x: SCREEN_CENTER_X - 300,
                    y: SCREEN_CENTER_Y + 128,
                    alpha: 0.0,
                },
                {
                    type: "FlatButton", name: "keyLeft",
                    init: [
                        {
                            text: "左",
                            fontFamily: FONT_FAMILY,
                            fontSize: 192,
                            width: SCREEN_WIDTH / 2,
                            height: SCREEN_HEIGHT,
                            bgColor: "hsl(60, 100%, 75%)",
                        }
                    ],
                    x: SCREEN_WIDTH / 4,
                    y: SCREEN_CENTER_Y,
                    alpha: 0.0,
                },
                {
                    type: "FlatButton", name: "keyRight",
                    init: [
                        {
                            text: "右",
                            fontFamily: FONT_FAMILY,
                            fontSize: 192,
                            width: SCREEN_WIDTH / 2,
                            height: SCREEN_HEIGHT,
                            bgColor: "hsl(60, 100%, 70%)",
                        }
                    ],
                    x: SCREEN_CENTER_X + SCREEN_WIDTH / 4,
                    y: SCREEN_CENTER_Y,
                    alpha: 0.0,
                },
            ]
        });

        this.tweetButton.sleep();
        this.restartButton.sleep();

        var self = this;
        this.restartButton.onpointingstart = function () {
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
            for (let yy = 0; yy < BG_HEIGHT - 1; yy++) {
                setBgDataLine(yy, tmpLine++);
            }
            // playerのremove
            if (player != null) {
                player.remove();
                player = null;
            }
            // enemyのremove
            if (enemy != null) {
                enemy.remove();
                enemy = null;
            }
            self.app.replaceScene(GameScene());
        };

        this.keyLeft.sleep();
        this.keyLeft.onpointingstart = function () {
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
                coinSE.play();
            }
            if (getBgDataArray(xx, yy).kind == MAP_CHIP_DEF.CUCUMBER) {
                // 死亡
                player.status = PL_STATUS.DEAD_INIT;
            } else {
                if (getBgDataArray(xx, yy).kind.se != null) getBgDataArray(xx, yy).kind.se.play();
                player.score += getBgDataArray(xx, yy).kind.point;
                if (player.powerUpTimer > 0) {
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
            enemy.yPos -= 128;
        };

        this.keyRight.sleep();
        this.keyRight.onpointingstart = function () {
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
                coinSE.play();
            }
            if (getBgDataArray(xx, yy).kind == MAP_CHIP_DEF.CUCUMBER) {
                // 死亡
                player.status = PL_STATUS.DEAD_INIT;
            } else {
                if (getBgDataArray(xx, yy).kind.se != null) getBgDataArray(xx, yy).kind.se.play();
                player.score += getBgDataArray(xx, yy).kind.point;
                if (player.powerUpTimer > 0) {
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
            enemy.yPos -= 128;
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
                fallSE.play();
                player.status = PL_STATUS.DEAD;
            }

            var self = this;
            // tweet ボタン
            this.tweetButton.onclick = function () {
                var twitterURL = tm.social.Twitter.createURL({
                    type: "tweet",
                    text: "C.O.K.S. 地下" + player.depth + "m に到達（スコア：" + player.score + "）",
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
            this.gameOverLabel.setAlpha(this.buttonAlpha);
            this.tweetButton.setAlpha(this.buttonAlpha);
            this.restartButton.setAlpha(this.buttonAlpha);
            if (this.buttonAlpha > 0.7) {
                this.tweetButton.wakeUp();
                this.restartButton.wakeUp();
            }
            this.keyLeft.setAlpha(0.0);
            this.keyRight.setAlpha(0.0);
        } else if (player.status === PL_STATUS.SHAKE) {
            if (--player.shakeTimer <= 0) {
                player.status = PL_STATUS.START;
                player.shakeTimer = 0;
            }
        } else {
            if (!player.status.isStarted) {
                this.gameOverLabel.setAlpha(0.0);
                this.keyLeft.setAlpha(0.0);
                this.keyLeft.wakeUp();
                this.keyRight.setAlpha(0.0);
                this.keyRight.wakeUp();
                player.status = PL_STATUS.START;
            }
            this.keyLeft.setAlpha(0.0);
            this.keyRight.setAlpha(0.0);

            if (player.powerUpTimer > 0) {
                player.powerUpTimer--;
                player.gotoAndPlay("nmls");
            } else {
                player.gotoAndPlay(player.aminBase + player.aminCount);
            }

            if (player.depth <= 50) {
                enemy.yPos += 2;
            } else if (player.depth <= 100) {
                enemy.yPos += 3;
            } else if (player.depth <= 150) {
                enemy.yPos += 4;
            } else if (player.depth <= 200) {
                enemy.yPos += 5;
            } else if (player.depth <= 250) {
                enemy.yPos += 6;
            } else if (player.depth <= 300) {
                enemy.yPos += 7;
            } else {
                enemy.yPos += 8;
            }
            if (enemy.yPos < -SCREEN_HEIGHT - 150) {
                enemy.yPos = -SCREEN_HEIGHT - 150;
            }
        }
        this.nowDepthLabel.text = player.depth + "m";
        this.nowScoreLabel.text = player.score;

        ++frame;
    }
});

/*
 * Player
 */
tm.define("PlayerSprite", {
    superClass: "tm.app.AnimationSprite",
    init: function () {
        let ss = tm.asset.SpriteSheet({
            // 画像
            image: "nmls",
            // １コマのサイズ指定および全コマ数
            frame: {
                width: 128,
                height: 128,
                count: 6
            },
            // アニメーションの定義（開始コマ、終了コマ+1、次のアニメーション,wait）
            animations: {
                "nmls": [0, 1, "nmls", 1],
                "left0": [1, 2, "left0", 1],
                "left1": [2, 3, "left1", 1],
                "right0": [3, 4, "right0", 1],
                "right1": [4, 5, "right1", 1],
            }
        });

        this.superInit(ss, 128, 128);
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
        this.gotoAndPlay("left0");
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
            if (enemy.yPos > SCREEN_CENTER_Y / 32) {
                player.status = PL_STATUS.DEAD_INIT;
            }
        }
    },
});

/*
 * Enemy
 */
tm.define("Enemy", {
    superClass: "tm.app.Sprite",

    init: function () {
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
tm.define("MapChipSprite", {
    superClass: "tm.app.AnimationSprite",

    init: function (xPos, yPos, isEven, kind) {
        let ss = tm.asset.SpriteSheet({
            // 画像
            image: "map_chip",
            // １コマのサイズ指定および全コマ数
            frame: {
                width: 128,
                height: 132,
                count: 11
            },
            // アニメーションの定義（開始コマ、終了コマ+1、次のアニメーション,wait）
            animations: {
                "0": [0, 1, "0", 30],   // BLANK
                "1": [1, 2, "1", 30],   // BLOCK
                "2": [2, 3, "2", 30],   // UDON
                "3": [3, 4, "3", 30],   // CUCUMBER
                "4": [4, 5, "4", 30],   // STRATA_0
                "5": [5, 6, "5", 30],   // STRATA_1
                "6": [6, 7, "6", 30],   // STRATA_2
                "7": [7, 8, "7", 30],   // STRATA_3
                "8": [8, 9, "8", 30],   // STRATA_4
                "9": [9, 10, "9", 30],   // STRATA_5
                "10": [10, 11, "10", 30],   // ROCK
            }
        });

        this.superInit(ss, 128, 132);
        this.direct = '';
        this.zRot = 0;
        this.xOfs = isEven ? 64 : 0;
        this.xPos = (xPos * 128) + this.xOfs;
        this.yPos = (yPos * 128) + 64;
        this.setPosition(this.xPos, this.yPos).setScale(1, 1);
        this.setInteractive(false);
        this.setBoundingType("rect");
        this.gotoAndPlay("" + kind.mc_idx);
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
