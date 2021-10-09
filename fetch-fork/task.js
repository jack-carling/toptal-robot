import FormData from 'form-data';
import { argv } from 'process';
import { myHeaders } from './robot.js';
import fetch from 'node-fetch';
import solveTask from './solution.js';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

process.on('message', (payload) => {
  if (payload > attempt) attempt = payload - 1;
});

let id = 0;
let key = '';
let attempt = 0;
let child = 0;

function initialize() {
  child = Number(argv.at(-4));
  id = argv.at(-3);
  key = argv.at(-2);
  attempt = Number(argv.at(-1));
  getTask();
}

async function getTask(tryAgain) {
  if (tryAgain) {
    attempt += 1;
  }

  const formData = new FormData();
  formData.append('attempt_id', attempt);
  formData.append('entry_key', key);
  formData.append('skip_direction', 'forward');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
  };

  let response = await fetch(`https://speedcoding.toptal.com/webappApi/entry/${id}/skipTask`, requestOptions);
  response = await response.json();

  console.log(response);

  if (response.code === 200) {
    attempt = response.data.attemptId;
    process.send(attempt);
    // getQuestion(response.data.nextTask);
  } else if (response.code === 422) {
    getTask(true);
  }
}

initialize();

function getQuestion(task) {
  let result = {};

  const tests = task.tests_json;
  result = solveTask(task.id, tests);

  if (result.success === false) {
    console.log(task);
    return;
  } else {
    console.log('Solved task:', task.id);
  }

  answerQuestion(result);
}

async function answerQuestion(result, tryAgain) {
  await sleep(50);

  if (tryAgain) {
    attempt += 1;
  }

  const formData = new FormData();
  formData.append('entry_key', key);
  formData.append('code', 'd');
  formData.append('attempt_id', attempt);
  formData.append('tests_json', JSON.stringify(result));

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
  };

  let response = await fetch(`https://speedcoding.toptal.com/webappApi/entry/${id}/attemptTask`, requestOptions);
  response = await response.json();

  console.log('Progress:', response?.data?.entryMeta?.tasks_state);

  if (response.code === 200) {
    if (response.data.isSuccess) {
      if (response.data.isChallengeEntryFinished) {
        console.timeEnd('Time');
        console.log('Date:', new Date().toString());
        console.log('Total:', response.data.totalPoints);
        console.log('Penalized:', response.data.entryMeta.penalized_by_cooldown_sec);
        console.log('------------------------------');
        return;
      }
      attempt = response.data.attemptId;
      process.send(attempt);
      getQuestion(response.data.nextTask);
    }
  } else if (response.code === 422) {
    answerQuestion(requestOptions, true);
  }
}
