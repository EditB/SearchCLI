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
