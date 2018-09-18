'use strict';
//console.log("test");

//Note: implement commander/inquirer to read in command line instructions

//const joi = require('joi');

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
      message: 'Please enter the value you are looking for: ' /*,
      validate: function validateInput(input){
        console.log(input);
        return input !== '';
      }*/
    },
];

const isNumericFields = (answers) => {
  if (values.numericFields.includes(answers.field)) {
    return true;
  }
  else if (answers.field == "_id" && values.numericIDFiles.includes(answers.dataFile)){
    return true;
  }
  else {
    return false;
  }
}

const validInput = (answers) => {
  // If a field is a date/time, we need to convert it into a timestamp;
  //also, if user doesn't enter a time only a date then we need to search all timestamps that are on that day regardless of the time

  //If boolean: convert the string "true"/"false" into proper boolean values
  //Note: Windows Command Prompt seem to return a string by default
  if (values.booleanFields.includes(answers.field)){
    //It's a boolean, but windows Command Prompt seem to return a string...
    if (answers.value == "true") {
      answers.value = true;
    }
    else if (answers.value == "false") {
      answers.value = false;
    }
    else if (typeof answers.value != "boolean"){
      return false;
    }
  }
  //phone; convert entry into this format: "8335-422-718" (i.e. strip it off spaces add quotes + dashes)
  else if (answers.value == "phone"){
    //Strip it of spaces and dashes and make sure it's 10 digits; then add in the dashes to the right places.
    //Need to format it + "" + strip it of spaces +
  }
  //String: if user hasn't put quotes around it, then we should do it here otherwise program will crash.
  else if (isNumericFields(answers)){
    //Make sure the entered value is a number
    return (!isNaN(parseInt(answers.value)))
  }
  else {
    //If user hasn't added quotes, we need to do it
    let str = answers.value;
    if(!((str[0] == '"' && str[str.length - 1] == '"'))){
      if((str[0] == "'" && str[str.length - 1] == "'")){
        //Strip it of ''!!
        str = str.substring(1, str.length-1);
      }
      answers.value = '"' + str + '"';
    }
  }
  return true;
}

inquirer
        .prompt(questions)
        .then(function (answers) {

          if (!validInput(answers)) {
            console.log("Please try again with valid inputs");
          }
          else{
          const jsonPath = './data/'+ answers.dataFile + '.json';
          const options = {};
          let filter = '.[] | select(.' + answers.field + ' == ' + answers.value + ')';

          switch (answers.field) {
            case 'tags':
            case 'domain_names':
            filter = '.[] | select(.' + answers.field + '| index(' + answers.value + '))';
            break;
          }

          jq.run(filter, jsonPath, options)
            .then((output) => {
              console.log(output);
            })
            .catch((err) => {
              // Something went wrong
              console.error(err);
            })

      }
});
