# SearchCLI

A simple Node.js CLI app to search a field in a json file and display the results.

Run it with this command: node search
Then follow the prompts.
First you have to select the .json file.
Then you have to select the field that you want to search on.
Finally you will need to type in your search value.
It will return JSON object(s) if there are matching values, otherwise it will return nothing.

Run tests with this command: mocha test
You can get out of the test mode with ctrl + c


It uses the following versions:

 node: v9.11.1
 npm: 6.4.1

 And dependencies:
 inquirer: 6.2.0

Note: Wrote and tested it on Windows 10 Command Prompt (cmd.exe); 
