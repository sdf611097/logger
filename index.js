'use strict';
const DEFAULT_COLOR = process.env.DEFAULT_COLOR ? process.env.DEFAULT_COLOR : 'WHITE';

let options = {
    showDate: false,
};

const colors = {
    BLACK: 30,
    RED: 31,
    GREEN: 32,
    YELLOW: 33,
    BLUE: 34,
    MAGENTA: 35,
    CYAN: 36,
    WHITE: 37,
};

const bgColors = {
    BG_BLACK: 40,
    BG_RED: 41,
    BG_GREEN: 42,
    BG_YELLOW: 43,
    BG_BLUE: 44,
    BG_MAGENTA: 45,
    BG_CYAN: 46,
    BG_WHITE: 47,
};

const fontColorOfBGs = {};
fontColorOfBGs[bgColors.BG_BLACK] = colors.WHITE;
fontColorOfBGs[bgColors.BG_RED] = colors.CYAN;
fontColorOfBGs[bgColors.BG_GREEN] = colors.MAGENTA;
fontColorOfBGs[bgColors.BG_YELLOW] = colors.BLUE;
fontColorOfBGs[bgColors.BG_BLUE] = colors.YELLOW;
fontColorOfBGs[bgColors.BG_MAGENTA] = colors.GREEN;
fontColorOfBGs[bgColors.BG_CYAN] = colors.RED;
fontColorOfBGs[bgColors.BG_WHITE] = colors.BLACK;

const effects = {
    RESET: 0, //all attributes off
    BOLD: 1, //Bold or increased intensity
    FAINT: 2, //Faint (decreased intensity), Not widely supported.
    ITALIC: 3, //Not widely supported. Sometimes treated as inverse.
    UNDERLINE: 4,
};

const supportedCodes = Object.assign({}, colors, bgColors, effects);

const END = '\x1b[0m';

const text = 'test';

function start(opts) {
    opts = _toArray(opts);
    const codes = _opts2Codes(opts);
    let str = getBegin(codes);
    process.stdout.write(str);
}

function end() {
    process.stdout.write(getBegin([effects.RESET, 21, 22, 23, 24]));
}

//[MM-DD HH:MM:SS]
function getDateStr() {
    let now = new Date();

    //0x -> 0x, 0xx-> xx
    function padZero(num) {
        return ('0' + num).slice(-2);
    }

    let month = padZero(now.getMonth() + 1);
    let date = padZero(now.getDate());
    let hour = padZero(now.getHours());
    let min = padZero(now.getMinutes());
    let sec = padZero(now.getSeconds());

    month = month.slice(-2);
    date = date.slice(-2);

    let MMDD = month + '-' + date;
    let HHMMSS = hour + ':' + min + ':' + sec;

    return '[' + MMDD + ' ' + HHMMSS + ']';
}

//getCode, is not exist, using white
function getCode(colorName) {
    colorName = colorName.toUpperCase();
    return supportedCodes[colorName] ? supportedCodes[colorName] : getCode(DEFAULT_COLOR);
}

//log(color, arg1, arg2, ..., argN)
function colorLog(color) {
    const code = getCode(color);
    let args =  Array.prototype.slice.call(arguments, 0);
    if (code >= 40 && code <= 47) {
        args[0] = [code, fontColorOfBGs[code]];
    }else {
        args[0] = [code];
    }

    _log.apply(null, args);
}

function getBegin(codes) {
    if (Object.prototype.toString.call(codes) !== '[object Array]') {
        return getBegin(['white']);
    }

    return '\x1b[' + codes.join(';') + 'm';
}

//Make sure codes is an array
function _log(codes) {
    let args = [getBegin(codes)];
    if (options.showDate) {
        args = [getDateStr()].concat(args);
    }

    args = args.concat(Array.prototype.slice.call(arguments, 1));
    args = args.concat([END]);
    console.log.apply(null, args);
}

//deal with string, if not string or array=> []
function _toArray(opts) {
    if (typeof opts === 'string') {
        opts = [opts];
    }

    if (Object.prototype.toString.call(opts) !== '[object Array]') {
        opts = [];
    }

    return opts;
}

function _opts2Codes(opts) {

    //remove undefined, avoid if(0) case and then return the codes
    return opts.map(getCode).filter(code=> code || code === 0);
}

function log(opts) {
    opts = _toArray(opts);
    const codes = _opts2Codes(opts);
    let args =  Array.prototype.slice.call(arguments);
    args[0] = codes;
    _log.apply(null, args);
}

function byCodes(codes) {
    let args =  Array.prototype.slice.call(arguments);
    _log.apply(null, args);
}

function stack(opts, maxLines) {
    let stack = new Error('This is a stack log, not an Error').stack;
    let lines = stack.split('\n').slice(2);
    lines.slice(0, maxLines).forEach(line=> log(opts, line));
}

function debug() {
    const opts = ['cyan', 'italic'];
    if (process.env.VERBOSE) {
        log.apply(null, [opts].concat(Array.prototype.slice.call(arguments)));
    }
}

function oneOptionMethod(opt) {
    return function () {
        log.apply(null, [opt].concat(Array.prototype.slice.call(arguments)));
    };
}

function bgShortcut(bgColor) {
    return function () {
        colorLog.apply(null, [bgColor].concat(Array.prototype.slice.call(arguments)));
    };
}

module.exports = {
    start,
    end,
    options,
    debug,
    stack,
    SUPPORTEDS: Object.keys(supportedCodes),
    log,
    colorLog,
    COLORS: colors,
    BG_COLORS: bgColors,
    EFFECTS: effects,
    black: oneOptionMethod('black'),
    red: oneOptionMethod('red'),
    green: oneOptionMethod('green'),
    yellow: oneOptionMethod('yellow'),
    blue: oneOptionMethod('blue'),
    magenta: oneOptionMethod('magenta'),
    cyan: oneOptionMethod('cyan'),
    white: oneOptionMethod('white'),
    bgBlack: bgShortcut('bg_black'),
    bgRed: bgShortcut('bg_red'),
    bgGreen: bgShortcut('bg_green'),
    bgYellow: bgShortcut('bg_yellow'),
    bgBlue: bgShortcut('bg_blue'),
    bgMagenta: bgShortcut('bg_magenta'),
    bgCyan: bgShortcut('bg_cyan'),
    bgWhite: bgShortcut('bg_white'),
    byCodes,
};
