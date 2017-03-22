const chalk = require('chalk')
const figlet = require('figlet')
const fetch = require('node-fetch')
const fs = require('fs')

const baseApi = 'https://epic.gsfc.nasa.gov/api'
const baseArchive = 'https://epic.gsfc.nasa.gov/archive'

function getJson(color) {
    return fetch(`${baseApi}/${color}`).then(res => res.json())
}

function getExtension(requestFormat) {
    const format = requestFormat || 'png'
    const extension = format === 'thumbs' ? 'jpg' : format
    return { format, extension }
}

function constructImageUrl(imageMeta, color, requestFormat) {
    const name = imageMeta.image
    const { format, extension } = getExtension(requestFormat)
    const formattedDate = imageMeta.date.slice(0, 10).replace(new RegExp('-', 'g'), '/')
    return `${baseArchive}/${color}/${formattedDate}/${format}/${name}.${extension}`
}

/* expected args (all optional, defaults listed first):
    * color - natural || enhanced
    * format - png || jpg || thumbs
    * filename - imagename.ext (example, 'earth.png')
*/
function getImage(args) {
    const color = args.color || 'natural'
    return getJson(color).then(json => {
        const latestImageMeta = json[0]
        const imageUrl = constructImageUrl(latestImageMeta, color, args.format)
        return fetch(imageUrl)
            .then(res => {
                const { extension } = getExtension(args.format)
                const fileName = args.filename || `${latestImageMeta.image}.${extension}`
                const filePath = `${process.cwd()}/${fileName}`
                console.log(chalk.blue(figlet.textSync('Earth!', { horizontalLayout: 'full' })))
                console.log(`Latest ${color} image at ${latestImageMeta.date}`)
                if (fs.existsSync(filePath)) {
                    return console.log('Filename match. It looks like you have already downloaded this one! \n' +
                      'Try again in a couple of hours.')
                }
                console.log(`Downloading ${chalk.green(imageUrl)}...`)
                const stream = res.body.pipe(fs.createWriteStream(filePath))
                return new Promise((resolve, reject) => {
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
    constructImageUrl,
    getJson,
    getImage,
    baseApi,
    baseArchive,
}
