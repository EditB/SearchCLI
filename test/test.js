const inquirer = require('inquirer');
const searchModule = require('../search.js');

describe('test user input', () => {

  // stub inquirer
  let backup;
  before(() => {
    backup = inquirer.prompt;
    inquirer.prompt = (questions) => Promise.resolve({dataFile: 'tickets'})
  });

  it('should equal tickets', () => {
    searchModule(...).then(answers => answers.dataFile.should.equal('tickets'))
  });

  // restore
  after(() => {
    inquirer.prompt = backup
  });

});

var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});
