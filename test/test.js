'use strict';
const logger = require('../index.js');
const log = logger.colorLog;

console.log('colorsList', logger.COLORS);
console.log('effectsList', logger.EFFECTS);

for(let index in logger.COLORS){
    const color = logger.COLORS[index];
    log(color, 'this', 'is', 'a/an', color, 'log');
}
