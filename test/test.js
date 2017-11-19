/* jshint -W083 */
'use strict';
const logger = require('../index.js');
const COLORS = logger.COLORS;
const BG_COLORS = logger.BG_COLORS;
const EFFECTS = logger.EFFECTS;

const colors = Object.keys(COLORS);
const bgColors = Object.keys(BG_COLORS);
const effects = Object.keys(EFFECTS);

console.log('colors:', colors.join(','));
console.log('background colors:', bgColors.join(','));
console.log('effects:', effects.join(','));

//logger.colorLog(colorName, ...)
const colorAndBG = colors.concat(bgColors);
for (let index in colorAndBG) {
    const color = colorAndBG[index];
    logger.colorLog(color, 'this', 'is', 'a/an', color, 'log');
}

//logger.log(opts, ...)
const noResetEffects = effects.filter(effect=> effect != 'RESET');
const color = colors[3];
for (let i = 0; i < Math.pow(2, noResetEffects.length); i++) {
    let effects = [];
    for (let j = 0, tmp = i; j < noResetEffects.length; j++) {
        if (tmp % 2 === 1) {
            effects.push(noResetEffects[j]);
        }

        tmp = tmp >> 1;
    }

    let test = [color].concat(effects);
    if (effects.length > 0) {
        logger.log(test, 'this', 'is', 'a/an', test.join('-'), 'log');
    }
}

function showStack() {
    let args = arguments;
    function func() {
        console.log('---');
        logger.log(['yellow', 'bg_red'], 'show stack, not an error');
        logger.stack();
        logger.log(['yellow', 'bg_red'], 'stack with opts and limit lines');
        logger.stack(['red', 'bold'], 3);
    }

    func();
}

showStack();

function testDebug() {
    console.log('process.env.VERBOSE', process.env.VERBOSE);
    logger.debug('hi', 'debug', 'log');
    console.log('end of log');
}

testDebug();
process.env.VERBOSE = 1;
testDebug();

logger.options.showDate = true;
logger.log('cyan', 'belows will contains date str');

logger.log(null, 'using null');
logger.log('notExist', 'notExistWillBeIgnored');

let opts = ['notExist', 'red'];
logger.log(opts, opts);

opts.push('UNDERLINE');
logger.log(opts, opts);

opts.push('notExist');
logger.log(opts, opts);

opts.push('reset');
logger.log(opts, opts);

let startEffect = ['blue', 'italic'];
logger.start(startEffect);
console.log(startEffect);
console.log('This is console.log');
console.log('end');
logger.end();
console.log('reset');

startEffect = 'cyan';
logger.start(startEffect, 'this is msg on start');
console.log(startEffect);
console.log('This is console.log');
console.log('end');
logger.end('this is an end msg');
console.log('reset');

logger.red('this is red');
logger.green('this is green');
logger.yellow('this is yellow');
logger.blue('this is blue');
logger.magenta('this is magenta');
logger.cyan('this is cyan');
logger.white('this is white');

const codeRed = logger.COLORS.RED;
const codeBackgroundBlue = logger.BG_COLORS.BG_BLUE;
logger.byCodes([codeRed, codeBackgroundBlue], 'this is a red log and bg is blue');
