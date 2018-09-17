'use strict';
//console.log("test");

//Note: implement commander/inquirer to read in command line instructions

const jq = require('node-jq');
const inquirer = require('inquirer');
const values = require('./values');

const questions = [
    {
      type: 'list',
      name: 'dataFile',
      message: 'Select the .json file you want to search',
      choices: values.dataFile
    },
    {
      type: 'list',
      name: 'field',
      message: 'Please enter the field you want to search on: ',
      choices: values.organizationsFields,
      when: function(answers){
        return answers.dataFile == 'organizations';
      }
    },
    {
      type: 'list',
      name: 'field',
      message: 'Please enter the field you want to search on: ',
      choices: values.ticketsFields,
      when: function(answers){
        return answers.dataFile == 'tickets';
      }
    },
    {
      type: 'list',
      name: 'field',
      message: 'Please enter the field you want to search on: ',
      choices: values.usersFields,
      when: function(answers){
        return answers.dataFile == 'users';
      }
    },
    {
      type: 'input',
      name: 'value',
      message: 'Please enter the value you are looking for: '
    },
];

inquirer
        .prompt(questions)
        .then(function (answers) {
          const jsonPath = './data/'+ answers.dataFile + '.json';
          const options = {};
          let filter = '.[] | select(.' + answers.field + ' == ' + answers.value + ')';

          //Note: also need cases for boolean and timestamps + what about phone? should it enforce a specific format?
          // If a field is string, need to make sure the input has quotes around it; what happens if user already puts in quotes?
          switch (answers.field) {
            case 'tags':
            case 'domain_names':
            //filter = '.[] | .' + answers.field + '| index(' + answers.value + ') ';
            filter = ".[] | select(." + answers.field + " LIKE '%" + answers.value + "%')";
            break;
          }

          jq.run(filter, jsonPath, options)
            .then((output) => {
              console.log(output);
            })
            .catch((err) => {
              console.error(err);
              // Something went wrong...
            })
});
