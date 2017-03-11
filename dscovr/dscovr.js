const fetch = require('node-fetch')
const dscovrMocks = require('../mocks/dscovr.mock.js')

const baseApi = 'https://epic.gsfc.nasa.gov/api'

module.exports = {
    getImage: function() {
        return fetch(`${baseApi}/natural`).then(function(res) {
            return res.json();
        }).then(function(json) {
            return json
        });
    },
    baseApi
}

