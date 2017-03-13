const chalk = require('chalk')
const figlet = require('figlet')
const fetch = require('node-fetch')
const fs = require('fs')

const baseApi = 'https://epic.gsfc.nasa.gov/api'
const baseArchive = 'https://epic.gsfc.nasa.gov/archive'

function getJson({ requestColor }) {
    const color = requestColor || 'natural'
    return fetch(`${baseApi}/${color}`).then(function(res) {
        return res.json()
    })
}

function getExtension(requestFormat) {
    const format = requestFormat || 'png'
    const extension = format === 'thumbs' ? 'jpg' : format
    return { format, extension }
}

function getImageUrl(formattedDate, name, requestColor, requestFormat) {
    const color = requestColor || 'natural'
    const { format, extension } = getExtension(requestFormat)
    return `${baseArchive}/${color}/${formattedDate}/${format}/${name}.${extension}`
}

function getImage({ requestColor, requestFormat, requestFileName }) {
    return getJson({ requestColor }).then(function(json) {
        const date = json[0].date
        const image = json[0].image
        const formattedDate = date.slice(0,10).replace(new RegExp('-', 'g'), '/')
        const imageUrl = getImageUrl(formattedDate, image, requestColor, requestFormat)
        return fetch(imageUrl)
            .then(function(res) {
                const { extension } = getExtension(requestFormat)
                const fileName = requestFileName || `${image}.${extension}`
                const filePath = `${process.cwd()}/${fileName}`
                console.log(chalk.blue(figlet.textSync('Earth!', { horizontalLayout: 'full' })))
                console.log(`Latest ${requestColor || 'natural'} image at ${date}`)
                console.log(`Downloading ${chalk.green(imageUrl)}...`)
                const stream = res.body.pipe(fs.createWriteStream(filePath))
                return new Promise(function (resolve, reject) {
                    function finishDownload() {
                        console.log(`Saved file to ${chalk.green(filePath)}`)
                        resolve()
                    }
                    stream.on('close', finishDownload)
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
