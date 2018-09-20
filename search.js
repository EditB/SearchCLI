#!/usr/bin/env node

'use strict';
const jq = require('node-jq');
const inquirer = require('inquirer');
const values = require('./values');
const helpers = require('./helpers');

const questions = [
    {
      type: 'list',
      name: 'dataFile',
      message: 'Select the .json file you want to search (use arrows to move up and down)',
      choices: values.dataFile
    },
    {
      type: 'list',
      name: 'field',
      message: 'Select the field you want to search on (use arrows to move up and down)',
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


      if (!helpers.validInput(answers)) {
        console.log("Please try again with a valid input");
      }
      else {
        const jsonPath = './data/'+ answers.dataFile + '.json';
        const options = {};
        let filter = helpers.setFilter(answers);

        jq.run(filter, jsonPath, options)
          .then((output) => {
            console.log(output);
          })
          .catch((err) => {
            // Something went wrong
            console.log("Sorry, looks like something went wrong. Try again with a different input.");
            console.error(err);
          })
      }
});
