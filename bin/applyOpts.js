#! /usr/bin/env node

var logger = require('../index.js');
var commander = require('commander');

//Note:
//Doing this with browserify has security implications.
//Be careful not to expose your package.json to the client,
//as it means that all your dependency version numbers,
//build and test commands and more are sent to the client.
//If you're building server and client in the same project,
//you expose your server-side version numbers too.
//Such specific data can be used by an attacker to better fit the attack your server.

var version = require('../package.json').version;
var usage = 'opt1, opt2, ...\n';
usage += 'colors: ' + logger.COLORS.join(',') + '\n';
usage += 'effects: ' + logger.EFFECTS.join(',') + '\n';

commander.version(version)
.usage(usage)
.parse(process.argv);

console.log(' args: %j', commander.args);

if (commander.args.length > 0) {
    logger.start(commander.args, 'Apply opts: ' + commander.args.join(','));
}
/*
var args = process.argv;

console.log(args);

//remove node, xxx,js
args = args.slice(2);


*/
