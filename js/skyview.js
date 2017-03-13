const dscovr = require('./dscovr/dscovr.js')
const argv = require('minimist')(process.argv.slice(2))

dscovr.getImage({ requestColor: argv.color, requestFormat: argv.format, requestFileName: argv.filename })
