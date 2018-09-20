import test from 'ava';
import run, { UP, DOWN, ENTER } from 'inquirer-test';

const cliPath = __dirname + '/search.js';

//With this test method we can simulate different user inputs,
//checking the results with regex
test('press enter', async t => {
  const result = await run([cliPath], [DOWN, DOWN, ENTER, ENTER,'1', ENTER]);
  t.regex(result, new RegExp('Francisca Rasmussen', 'g'));
});
