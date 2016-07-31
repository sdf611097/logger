'use strict';
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

const effects = {
    RESET: 0, //all attributes off
    BOLD: 1, //Bold or increased intensity
    FAINT: 2, //Faint (decreased intensity), Not widely supported.
    ITALIC: 3, //Not widely supported. Sometimes treated as inverse.
    UNDERLINE: 4,
};

const supportedCodes = Object.assign({}, colors, effects);

const END = '\x1b[0m';

const text = 'test';

function start(opts, msg) {
    opts = _toArray(opts);
    const codes = _opts2Codes(opts);
    let str = getBegin(codes);
    if (msg) {
        str += ' ' + msg;
    }

    console.log(str);
}

function end(msg) {
    start('reset', msg);
}

//[MM-DD HH:MM:SS]
function getDateStr() {
    let now = new Date();

    //0x -> 0x, 0xx-> xx
    let month = '0' + (now.getMonth() + 1);
    let date = '0' + now.getDate();
    month = month.slice(-2);
    date = date.slice(-2);

    let MMDD = month + '-' + date;
    let HHMMSS = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

    return '[' + MMDD + ' ' + HHMMSS + ']';
}

//getCode, is not exist, using white
function getCode(colorName) {
    colorName = colorName.toUpperCase();
    return colors[colorName] ? colors[colorName] : getCode('white');
}

//log(color, arg1, arg2, ..., argN)
function colorLog(color) {
    const code = getCode(color);
    let args =  Array.prototype.slice.call(arguments, 0);
    args[0] = code;
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

//dealwith string, if not string or array=> []
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

    //remove undefined, if(opt) will ignore RESET, using || to apply 0
    //and then retreive its code
    const getCode = opt=> supportedCodes[opt.toUpperCase()];
    return opts.map(getCode).filter(code=> code || code === 0);
}

function log(opts) {
    opts = _toArray(opts);
    const codes = _opts2Codes(opts);
    let args =  Array.prototype.slice.call(arguments);
    args[0] = codes;
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

module.exports = {
    start,
    end,
    options,
    debug,
    stack,
    SUPPORTEDS: Object.keys(supportedCodes),
    log,
    colorLog,
    COLORS: Object.keys(colors),
    EFFECTS: Object.keys(effects),
};
