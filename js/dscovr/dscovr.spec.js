const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('assert')
const nock = require('nock')
const md5File = require('md5-file')
const fs = require('fs')
const dscovr = require('./dscovr.js')
const dscovrMocks = require('../../mocks/dscovr.mock.js')

describe('dscovr', () => {
    describe('getJsonFromApi', () => {
        nock(dscovr.baseApi).get('/natural').reply(200, dscovrMocks.natural)
        it('calls base api for natural satellite images', () => dscovr.getJsonFromApi('natural')
              .then(json => {
                  assert.deepEqual(json, dscovrMocks.natural)
              }))
    })
    describe('getImage', () => {
        it('calls archive api for particular image', () => {
            nock(dscovr.baseApi).get('/natural').reply(200, dscovrMocks.natural)
            const mockedImageFilePath = './mocks/epic_1b_20170308002713_02.png'
            nock(dscovr.baseArchive).get('/natural/2017/03/08/png/epic_1b_20170308002713_02.png')
                .replyWithFile(200, mockedImageFilePath, {
                    'Content-Type': 'image/png',
                })
            return dscovr.getImage([])
                .then(() => {
                    const expectedPath = `${process.cwd()}/epic_1b_20170308002713_02.png`
                    const expectedImageHash = md5File.sync(mockedImageFilePath)
                    const actualImageHash = md5File.sync(expectedPath)
                    assert.equal(expectedImageHash, actualImageHash)
                    fs.unlinkSync(expectedPath)
                })
        })
    })
})
