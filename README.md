# ct-logger
log with colors,
Show log when envVar VERBOSE is set,
Show stacktrace

Screen shot of OSX.
![alt tag](./screenshot_OSX.png)

# Options
Show date with format:[MM-DD HH:MM:SS]
```js
var logger = require('ct-logger');
logger.showDate = true;
```
# Usage
like console.log,
```js
var logger = require('ct-logger');
logger.colorLog('red', 'Ni', 'Hao');
logger.log(['italic', 'blue', 'bold'], 'this', 'is', 'log');
logger.debug('shows only when', 'VERBOSE', 'been', 'set');
logger.stack();
logger.stack(['red', 'bold'], 3);
```
# APIS

## log(opts, arg1, arg2, ..., argN)
Additional arg0 for what you want to call `console.log` .
Opts are an array from colors and effects.
Colors: BLACK,RED,GREEN,YELLOW,BLUE,MAGENTA,CYAN,WHITE
Effects: RESET,BOLD,FAINT,ITALIC,UNDERLINE
All opts are case-insensitive.

```js
logger.log(['italic', 'blue', 'bold'], 'this', 'is', 'log');
```

## colorLog(color, arg1, arg2, ..., argN)
color is String.
Colors: BLACK,RED,GREEN,YELLOW,BLUE,MAGENTA,CYAN,WHITE
```js
logger.colorLog('red', 'li', 'ho');
```

## debug()
This log only shows when env variable VERBOSE been set.
```js
logger.debug('shows only when', 'VERBOSE', 'been', 'set');
```
## stack(opts, maxLines)
opts is as same as `log`, maxLines is a number, which indicate max stacktrace to shows
```js
logger.stack(['red', 'bold'], 3);
```
