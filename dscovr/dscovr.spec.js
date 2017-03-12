const assert = require('assert')
const nock = require('nock')
const dscovr = require('./dscovr.js')
const dscovrMocks = require('../mocks/dscovr.mock.js')

describe('dscovr', function() {
    describe('getJson', function() {
        nock(dscovr.baseApi).get('/natural').reply(200, dscovrMocks.natural)
        it('calls base api for natural satellite images', function() {
            return dscovr.getJson()
                .then(function(json) {
                    assert.deepEqual(json, dscovrMocks.natural)
                })
        })
    })
    describe('getImage', function() {
        it('calls archive api for particular image', function() {
            nock(dscovr.baseApi).get('/natural').reply(200, dscovrMocks.natural)
            nock(dscovr.baseArchive).get('/natural/2017/03/08/png/epic_1b_20170308002713_02.png')
                .replyWithFile(200, './mocks/epic_1b_20170308002713_02.png', {
                    'Content-Type': 'image/png'
                })
            return dscovr.getImage()
                .then(function(filePath) {
                    const expectedPath = `${process.cwd()}/epic_1b_20170308002713_02.png`
                    assert.equal(filePath, expectedPath)
                })
        })
    })
})