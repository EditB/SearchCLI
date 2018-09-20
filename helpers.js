const values = require('./values');
const table = require('cli-table');

exports.printTable = (outputJSON) => {
  //outputJSON = JSON.parse(outputJSON);
  //Note: output comes as a string; split it into an array based on {}
  const regexCurlyBrackets = /\s*(\{[0-9]+\})\s*/g;
  const parsedOutputJSON = outputJSON.split(regexCurlyBrackets).filter(Boolean);

  //console.log(typeof parsedOutputJSON); //object
  //console.log(parsedOutputJSON.length); //number of objects

  //We can now loop through it and display it as a table or separate items with
  //heading Item1, Item 2 etc.
}


exports.setFilter = (answers) => {
  let filter = '.[] | select(.' + answers.field + ' == ' + answers.value + ')';
  switch (answers.field) {
    case 'tags':
    case 'domain_names':
      return filter = '.[] | select(.' + answers.field + '| index(' + answers.value + '))';
      break;
  }
  return filter;
};

exports.isNumericFields = (answers) => {
  if (values.numericFields.includes(answers.field)) {
    return true;
  }
  else if (answers.field == "_id" && values.numericIDFiles.includes(answers.dataFile)){
    return true;
  }
  else {
    return false;
  }
};

exports.validInput = (answers) => {
  //If there's no quotes around empty value program will crash
  if (answers.value == ""){
    answers.value = '"' + answers.value + '"';
  }
  //If boolean: convert the string "true"/"false" into proper boolean values
  //Note: Windows Command Prompt seem to return a string by default (for true/false)
  else if (values.booleanFields.includes(answers.field)){
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
  else if (answers.field == "phone"){
    //Strip it of spaces and dashes and make sure it's 10 numeric digits; then add in the dashes to the right places.
    //Need to format it + "" + strip it of spaces + parenthesis
    let formattedPhoneNumber = answers.value.replace(/[-\s()]/g,"");
    if (formattedPhoneNumber.length == 10 && !isNaN(parseInt(answers.value))){
      //Add in the dashes & quotes
      answers.value = '"' + formattedPhoneNumber.replace(/(\d{4})(\d{3})(\d{3})/, "$1-$2-$3") + '"';
    }
    else {
      //Not a number or not the right length
      return false;
    }
  }
  //String: if user hasn't put quotes around it, then we should do it here otherwise program will crash.
  //Seems to be a windows cmd shell issue.
  else if (this.isNumericFields(answers)){
    //Make sure the entered value is a number
    return (!isNaN(parseInt(answers.value)))
  }
  else {
    //If user hasn't manually added quotes, we need to do it, otherwise program
    //will crash (Windows cmd shell quoting issues...); note: also check for empty imputs
    if (answers.value[0] != '"'){
      answers.value = '"' + answers.value;
    }
    if (answers.value[answers.value.length-1] != '"'){
      answers.value = answers.value + '"';
    }
  }
  return true;
};
