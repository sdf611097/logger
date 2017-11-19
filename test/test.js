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

let startEffect = ['red', 'italic'];
logger.start(startEffect);
console.log('logger.start(["red", "italic"])');
console.log('This is console.log');
console.log('end');
logger.end();
console.log('console.log, not between start and end');

startEffect = 'cyan';
logger.start(startEffect);
console.log('logger.start("cyan")');
console.log('This is console.log');
console.log('end');
logger.end();
console.log('console.log, not between start and end');

logger.black('this is black');
logger.red('this is red');
logger.green('this is green');
logger.yellow('this is yellow');
logger.blue('this is blue');
logger.magenta('this is magenta');
logger.cyan('this is cyan');
logger.white('this is white');

logger.bgBlack('this is bgBlack log');
logger.bgRed('this is bgRed log');
logger.bgGreen('this is bgGreen log');
logger.bgYellow('this is bgYellow log');
logger.bgBlue('this is bgBlue log');
logger.bgMagenta('this is bgMagenta log');
logger.bgCyan('this is bgCyan log');
logger.bgWhite('this is bgWhite log');

const codeRed = logger.COLORS.RED;
const codeBackgroundBlue = logger.BG_COLORS.BG_BLUE;
logger.byCodes([codeRed, codeBackgroundBlue],
`By codes: this is a red(${codeRed}) log and bg is blue(${codeBackgroundBlue}`);
