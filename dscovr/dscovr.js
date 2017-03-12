const chalk = require('chalk')
const figlet = require('figlet')
const fetch = require('node-fetch')
const dscovrMocks = require('../mocks/dscovr.mock.js')
const fs = require('fs')

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
        const formattedDate = date.slice(0,10).replace(new RegExp('-', 'g'), '/')
        const imageUrl = `${baseArchive}/natural/${formattedDate}/png/${image}.png`
        return fetch(imageUrl)
            .then(function(res) {
                const currentPath = process.cwd()
                console.log(chalk.yellow(figlet.textSync('Earth!', { horizontalLayout: 'full' })))
                console.log(chalk.green(`downloading image to ${currentPath}...`))
                const outputPath = fs.createWriteStream(`${currentPath}/${image}.png`)
                res.body.pipe(outputPath)
                return outputPath
            })
    })
}

module.exports = {
    getJson,
    getImage,
    baseApi,
    baseArchive,
}
