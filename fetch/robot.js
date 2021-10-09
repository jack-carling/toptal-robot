import fetch, { Headers } from 'node-fetch';
import FormData from 'form-data';

import solveTask from './solution.js';

let id = 0;
let key = '';
let attempt = 0;

const myHeaders = new Headers({
  Cookie: 'PHPSESSID=c13d014a2d1593980a291584482b77d0;',
});

initialize();

async function initialize() {
  console.time('Time');
  const formData = new FormData();
  formData.append('challengeSlug', 'toptal-js-2021');
  formData.append('leaderboardName', 'Jack Carling');
  formData.append('countryAlpha2', 'SE');
  formData.append('isTermsAndConditionsChecked', '1');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
    redirect: 'follow',
  };

  let response;

  try {
    response = await fetch('https://speedcoding.toptal.com/webappApi/entry?ch=29&acc=5421', requestOptions);
    response = await response.json();
    if (response.code !== 200) {
      console.log(response.message);
    }
  } catch (error) {
    console.log(error);
  }

  if (response.code === 200) {
    id = response.data.entry.id;
    key = response.data.entry.entry_key;
    attempt = response.data.attemptId;
    console.log('------------------------------');
    console.log('ID:', id);
    console.log('Key:', key);
    console.log('Attempt:', attempt);
    console.log('------------------------------');
    getQuestion(response.data.nextTask);
  }
}

async function getQuestion(task) {
  const formData = new FormData();
  formData.append('attempt_id', attempt);
  formData.append('entry_key', key);
  formData.append('code', 'd');

  let result = {};

  const tests = task.tests_json;
  console.time('Task');
  result = solveTask(task.id, tests);
  console.timeEnd('Task');

  if (result.success === false) {
    console.log(task);
    return;
  } else {
    console.log('Solved task:', task.id);
  }

  formData.append('tests_json', JSON.stringify(result));

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formData,
  };

  console.time('Fetch');
  let response = await fetch(`https://speedcoding.toptal.com/webappApi/entry/${id}/attemptTask`, requestOptions);
  console.timeEnd('Fetch');
  console.time('JSON');
  response = await response.json();
  console.timeEnd('JSON');
  console.log('------------------------------');

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
    getQuestion(response.data.nextTask);
  }
}
