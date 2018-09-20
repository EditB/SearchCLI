const values = require('./values');

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
    //will crash (Windows cmd shell quoting issues...)
    if (answers.value[0] != '"'){
      answers.value = '"' + answers.value;
    }
    if (answers.value[answers.value.length-1] != '"'){
      answers.value = answers.value + '"';
    }
  }
  return true;
};