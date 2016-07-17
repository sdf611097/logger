/* jshint -W083 */
'use strict';
const logger = require('../index.js');

console.log('colors:', logger.COLORS.join(','));
console.log('effects:', logger.EFFECTS.join(','));

//logger.colorLog(colorName, ...)
for(let index in logger.COLORS){
    const color = logger.COLORS[index];
    logger.colorLog(color, 'this', 'is', 'a/an', color, 'log');
}

//logger.log(opts, ...)
const noResetEffects = logger.EFFECTS.filter(effect=> effect!= "RESET");
const color = logger.COLORS[3];
for(let i=0; i< Math.pow(2,noResetEffects.length); i++){
    let effects = [];
    for(let j=0, tmp=i; j<noResetEffects.length; j++){
        if(tmp%2 ===1){
            effects.push(noResetEffects[j]);
        }
        tmp = tmp >> 1;
    }
    let test = [color].concat(effects);
    if(effects.length>0){
        logger.log(test, 'this', 'is', 'a/an', test.join('-'), 'log');
    }
}
