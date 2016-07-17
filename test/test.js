/* jshint -W083 */
'use strict';
const logger = require('../index.js');

console.log('colorsList', logger.COLORS);
console.log('effectsList', logger.EFFECTS);

for(let index in logger.COLORS){
    const color = logger.COLORS[index];
    logger.colorLog(color, 'this', 'is', 'a/an', color, 'log');
}

function shuffle(arr){
    const times = arr.length * 100;
    for(let i = 0; i< times; i++){
        let a = randIndex(arr);
        let b = randIndex(arr);

        let tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
    }
    return arr;
}

function randIndex(arr){
    return Math.floor(Math.random() * arr.length);
}


const NOT_EXIST = 'notExist';
let effectsWithNotExist = logger.EFFECTS;
effectsWithNotExist.push(NOT_EXIST);

for(let i=0; i< 20; i++){
    let effects = shuffle(effectsWithNotExist).slice(0,2);
    let color = [logger.COLORS[randIndex(logger.COLORS)]];
    const test = color.concat(effects);
    logger.log(test, 'this', 'is', 'a/an', test.filter(opt=>opt!==NOT_EXIST).join('-'), 'log');
}
