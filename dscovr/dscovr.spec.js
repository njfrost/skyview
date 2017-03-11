var assert = require('assert')

describe('Mocha', function() {
  describe('Finds a test', function() {
    it('runs the test', function() {
      assert.equal('cats', 'cats')
    })
  })
})