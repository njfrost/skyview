const assert = require('assert')
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
        it('Returns JSON', function() {
            const json = dscovr.getImage({ format: 'json', color: 'natural' })
            assert.deepEqual(json, dscovrMocks.natural)
        })
    })
})