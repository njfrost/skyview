const fetch = require('node-fetch')
const dscovrMocks = require('../mocks/dscovr.mock.js')

const baseApi = 'https://epic.gsfc.nasa.gov/api'
const baseArchive = 'https://epic.gsfc.nasa.gov/archive'

function getJson() {
    return fetch(`${baseApi}/natural`).then(function(res) {
        return res.json()
    })
}

function getImage() {
    return getJson().then(function(json) {
        var date = json[0].date
        var image = json[0].image
        const dateUrl = date.slice(0,10).replace(new RegExp('-', 'g'), '/')
        return fetch(`${baseArchive}/natural/${dateUrl}/png/${image}.png`, function(res) {
            return res.json()
        })
    })
}

module.exports = {
    getJson,
    getImage,
    baseApi,
    baseArchive,
}

