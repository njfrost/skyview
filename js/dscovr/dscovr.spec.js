const assert = require('assert')
const nock = require('nock')
const md5File = require('md5-file')
const fs = require('fs')
const dscovr = require('./dscovr.js')
const dscovrMocks = require('../../mocks/dscovr.mock.js')

describe('dscovr', () => {
    describe('getJson', () => {
        nock(dscovr.baseApi).get('/natural').reply(200, dscovrMocks.natural)
        it('calls base api for natural satellite images', () => {
            return dscovr.getJson('natural').then(json => {
                assert.deepEqual(json, dscovrMocks.natural)
            })
        })
    })
    describe('getImage', () => {
        it('downloads an image to a file', () => {
            nock(dscovr.baseApi).get('/natural').reply(200, dscovrMocks.natural)
            const mockedImageFilePath = './mocks/epic_1b_20170308002713_02.png'
            nock(dscovr.baseArchive).get('/natural/2017/03/08/png/epic_1b_20170308002713_02.png')
                .replyWithFile(200, mockedImageFilePath, {
                    'Content-Type': 'image/png'
            })
            return dscovr.getImage({}).then(() => {
                const expectedPath = `${process.cwd()}/epic_1b_20170308002713_02.png`
                const expectedImageHash = md5File.sync(mockedImageFilePath)
                const actualImageHash = md5File.sync(expectedPath)
                assert.equal(expectedImageHash, actualImageHash)
                fs.unlinkSync(expectedPath)
            })
        })
    })
    describe('constructImageUrl', () => {
        it('constructs an appropriate url from data', () => {
            const metaImageData = { image: 'whackyImageName', date: '2017-03-08 02:10:27' }
            const color = 'natural'
            const format = 'png'
            const actualUrl = dscovr.constructImageUrl(metaImageData, color, format)
            const expectedUrl = 'https://epic.gsfc.nasa.gov/archive/natural/2017/03/08/png/whackyImageName.png'
            assert.equal(expectedUrl, actualUrl)
        })
        it('constructs a jpg url when format is thumbs', () => {
            const metaImageData = { image: 'whackyImageName', date: '2017-03-08 02:10:27' }
            const color = 'natural'
            const format = 'thumbs'
            const actualUrl = dscovr.constructImageUrl(metaImageData, color, format)
            const expectedUrl = 'https://epic.gsfc.nasa.gov/archive/natural/2017/03/08/thumbs/whackyImageName.jpg'
            assert.equal(expectedUrl, actualUrl)
        })
    })
})
