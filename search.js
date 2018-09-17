//console.log("test");

//Note: implement commander/inquirer to read in command line instructions

const jq = require('node-jq');
const inquirer = require('inquirer');
const values = require('./values');

const questions = [
    { type: 'list', name: 'dataFile', message: 'Select json file', choices: values.dataFile },
];

inquirer
        .prompt(questions)
        .then(function (answers) {
            console.log('DataFile: ');
            console.log('------------------');

            console.log(answers.dataFile);



// Note: split the below into a function, with parameters to pass filter, jsonPath and options

//const filter = '.[] | ._id';
//const filter = '.[] | select(.name == "Enthaze")';
const filter = '.[] | select(._id == 101)';
const jsonPath = './data/organizations.json';
const options = {};

jq.run(filter, jsonPath, options)
  .then((output) => {
    //const newObj = output;
    const newObj = JSON.parse(output);
    //console.log(" new object: ");
    //Note: it is a string!
    //console.log(typeof newObj);
    //console.log(newObj._id);
    console.log(output);
    //Note: here we can do another jq.run with the foreign key if there are related entities.
  })
  .catch((err) => {
    console.error(err);
    // Something went wrong...
  })

});
