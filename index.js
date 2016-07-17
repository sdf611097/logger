'use strict';
const colors = {
    black: 30,
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    white: 37,
};

const effects = {
    RESET: 0, //all attributes off
    BOLD: 1, //Bold or increased intensity
    FAINT: 2, //Faint (decreased intensity), Not widely supported.
    ITALIC: 3, //Not widely supported. Sometimes treated as inverse.
    UNDERLINE: 4,
    BLINK: 5,
};

const END = '\x1b[0m';

const text = 'test';

//getCode, is not exist, using white
function getCode(colorName){
    return colors[colorName]? colors[colorName]: getCode('white');
}

//log(color, arg1, arg2, ..., argN)
function colorLog(color){
    const code = getCode(color);
    let args = ['\x1b['+code+'m'];
    args = args.concat(Array.prototype.slice.call(arguments, 1));
    args = args.concat([END]);
    console.log.apply(null, args);
}

module.exports = {
    colorLog,
    COLORS: Object.keys(colors),
    EFFECTS: Object.keys(effects),
};
