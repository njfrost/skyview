const dscovr = require('./dscovr/dscovr.js')
const args = require('minimist')(process.argv.slice(2))

// expected args: color, format, filename (all optional)
dscovr.getImage(args)
