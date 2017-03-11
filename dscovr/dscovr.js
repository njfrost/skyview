const fetch = require('node-fetch')
const dscovrMocks = require('../mocks/dscovr.mock.js')

module.exports = {
    getImage: function() {
        return dscovrMocks.natural
    }
}

