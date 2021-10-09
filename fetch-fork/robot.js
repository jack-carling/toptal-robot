import fetch, { Headers } from 'node-fetch';
import FormData from 'form-data';
import { fork } from 'child_process';

let id = 0;
let key = '';
let attempt = 0;

export const myHeaders = new Headers({
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
    console.log('------------------------------------------------------------------------------------------');
    console.log('ID:', id);
    console.log('Key:', key);
    console.log('Attempt:', attempt);
    console.log('------------------------------------------------------------------------------------------');

    const processOne = fork('./task.js', [0, id, key, attempt]);
    const processTwo = fork('./task.js', [1, id, key, attempt]);

    processOne.on('message', (payload) => {
      processTwo.send(payload);
    });
    processTwo.on('message', (payload) => {
      processOne.send(payload);
    });
  }
}
