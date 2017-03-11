const assert = require('assert')
const nock = require('nock')
const dscovr = require('./dscovr.js')
const dscovrMocks = require('../mocks/dscovr.mock.js')

describe('Mocha', function() {
    describe('Finds a test', function() {
        it('runs the test', function() {
            assert.equal('cats', 'cats')
        })
    })
})

describe('dscovr', function() {
    describe('Calls /api/fetch', function() {
        nock(dscovr.baseApi).get('/natural').reply(200, dscovrMocks.natural)
        it('Returns JSON', function() {
            return dscovr.getImage({ format: 'json', color: 'natural' })
                .then(function(json) {
                    assert.deepEqual(json, dscovrMocks.natural)
                })
        })
    })
})