# SearchCLI

A simple Node.js CLI app to search a field in a json file and display the results.
Note: it will search on the exact match, and also the search inputs are
case sensitive (e.g. a search on "dog" will NOT match "Dog").

Run Search CLI with this command: node search

Then follow the prompts:

First you have to select the .json file.

Then you have to select the field that you want to search on.

Finally you will need to type in your search value.

It will return JSON object(s) if there are matching values, otherwise it will return nothing.

Run tests with this command: npm test

It uses the following versions:

 node: v9.11.1

 npm: 6.4.1

 And dependencies:

 inquirer: 6.2.0

 node-jq: 1.3.1

 ava:

 inquirer-test:

Note: Wrote and tested it on Windows 10 Command Prompt (cmd.exe).
