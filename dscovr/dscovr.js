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
        console.log(`downloading ${imageUrl}`)
        return fetch(imageUrl)
            .then(function(res) {
                const filePath = `${process.cwd()}/${image}.png`
                console.log(chalk.yellow(figlet.textSync('Earth!', { horizontalLayout: 'full' })))
                console.log(chalk.green(`Downloading ${imageUrl} ....`))
                const writestream = fs.createWriteStream(filePath)
                console.log(chalk.green(`Saved file to ${filePath}`))

                const stream = res.body.pipe(writestream)
                return new Promise(function (resolve, reject) {
                    stream.on('close', resolve)
                    stream.on('error', reject)
                })


            })
    })
}

module.exports = {
    getJson,
    getImage,
    baseApi,
    baseArchive,
}
