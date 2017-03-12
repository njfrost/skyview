const assert = require('assert')
const nock = require('nock')
const dscovr = require('./dscovr.js')
const dscovrMocks = require('../mocks/dscovr.mock.js')

describe('dscovr', function() {
    describe('getJson', function() {
        nock(dscovr.baseApi).get('/natural').reply(200, dscovrMocks.natural)
        it('Returns JSON', function() {
            return dscovr.getJson()
                .then(function(json) {
                    assert.deepEqual(json, dscovrMocks.natural)
                })
        })
    })
    describe('getImage', function() {
        it('downloads latest image', function() {
        })
    })
})