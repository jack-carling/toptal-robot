import fetch, { Headers } from 'node-fetch';
import FormData from 'form-data';

let id = 0;
let key = '';
let attempt = 0;

const myHeaders = new Headers({
  Cookie: 'PHPSESSID=2a2ae7d6803ab5ad5c8046a5b40ac479;',
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

function solveTask(id, tests) {
  switch (id) {
    case 124: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const code = x ** 3;
        result[t] = code;
      }
      return result;
    }
    case 107: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const y = test.args[1];
        const code = Math.floor(x / y);
        result[t] = code;
      }
      return result;
    }
    case 119: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const half = Math.ceil(x.length / 2);
        const code = [];
        for (let i = 0; i < half; i++) {
          code.push(x[i]);
        }
        result[t] = code;
      }
      return result;
    }
    case 102: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const code = x.replaceAll(' ', '%20');
        result[t] = code;
      }
      return result;
    }
    case 106: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const code = x.replaceAll(' ', '');
        result[t] = code;
      }
      return result;
    }
    case 18: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const code = Math.sqrt(x);
        result[t] = code;
      }
      return result;
    }
    case 116: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const code = {};
        for (let i = 0; i < x.length; i++) {
          const name = x[i][0];
          const value = x[i][1];
          code[name] = value;
        }
        result[t] = code;
      }
      return result;
    }
    case 89: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        let total = 0;
        for (let i = 0; i < x.length; i++) {
          total += x[i];
        }
        const code = Math.ceil(total / x.length);
        result[t] = code;
      }
      return result;
    }
    case 21: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const reversed = x.split('').reverse();
        const code = reversed.join('');
        result[t] = code;
      }
      return result;
    }
    case 111: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const y = test.args[1];
        const code = typeof x === typeof y ? true : false;
        result[t] = code;
      }
      return result;
    }
    case 83: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const code = new Set(x).size;
        result[t] = code;
      }
      return result;
    }
    case 109: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const code = months[x - 1];
        result[t] = code;
      }
      return result;
    }
    case 120: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const arr = x.sort();
        let letter = arr[0];
        let total = 0;
        let number = '';
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === letter) {
            total++;
          } else {
            number += total;
            total = 1;
            letter = arr[i];
          }
        }
        number += total;
        const code = Number(number);
        result[t] = code;
      }
      return result;
    }
    case 88: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        let y = x.toString();
        let total = 0;
        for (let i = 0; i < y.length; i++) {
          if (y[i] === '0' || y[i] === '6' || y[i] === '9') total += 1;
          if (y[i] === '8') total += 2;
        }
        const code = total;
        result[t] = code;
      }
      return result;
    }
    case 95: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        let y = x.split('');
        for (let i = 0; i < y.length; i++) {
          if (y[i] === y[i].toLowerCase()) {
            y[i] = y[i].toUpperCase();
          } else {
            y[i] = y[i].toLowerCase();
          }
        }
        const code = y.join('');
        result[t] = code;
      }
      return result;
    }
    case 104: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        let num = x;
        let decimalValue = 0;
        let base = 1;
        let temp = num;
        while (temp) {
          let lastDigit = temp % 10;
          temp = Math.floor(temp / 10);
          decimalValue += lastDigit * base;
          base = base * 2;
        }
        const code = decimalValue;
        result[t] = code;
      }
      return result;
    }
    case 110: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const y = test.args[1];
        const string = y.split('');
        let total = 0;
        for (let i = 0; i < string.length; i++) {
          if (x === string[i]) total++;
        }
        const code = total;
        result[t] = code;
      }
      return result;
    }
    case 98: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const words = x.split(' ');
        for (let i = 0; i < words.length; i++) {
          const reversed = words[i].split('').reverse();
          words[i] = reversed.join('');
        }
        const code = words.join(' ');
        result[t] = code;
      }
      return result;
    }
    case 91: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const code = [...new Set(x)].join('');
        result[t] = code;
      }
      return result;
    }
    case 108: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const y = test.args[1];
        let totalX = 0;
        let totalY = 0;
        let arrX = [...x];
        let arrY = [...y];
        arrX.map((x) => (totalX += x));
        arrY.map((y) => (totalY += y));
        totalX = totalX / arrX.length;
        totalY = totalY / arrY.length;
        const code = (totalX + totalY) / 2;
        result[t] = code;
      }
      return result;
    }
    case 90: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const code = firstUniqueChar(x);
        result[t] = code;
      }
      return result;
    }
    case 100: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const n = test.args[0];
        const x = test.args[1];
        const code = digitOccurrence(n, x);
        result[t] = code;
      }
      return result;
    }
    case 87: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const numbers = {};
        x.forEach((n) => {
          if (!numbers[n]) {
            numbers[n] = 1;
          } else {
            numbers[n]++;
          }
        });
        const code = Object.keys(numbers).find((key) => numbers[key] === 1);
        result[t] = Number(code);
      }
      return result;
    }
    case 123: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        let m = x.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
        const code = [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
        result[t] = code;
      }
      return result;
    }
    case 93: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const y = test.args[1];
        const code = isRotatedStr(x, y);
        result[t] = code;
      }
      return result;
    }
    case 118: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const y = test.args[1];
        const code = findWord(x, y);
        result[t] = code;
      }
      return result;
    }
    case 92: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        let string = x.split('');
        let total = 0;
        for (let i = 0; i < string.length; i++) {
          total += string[i].charCodeAt();
        }
        const average = Math.round(total / string.length);
        const code = String.fromCharCode(average);
        result[t] = code;
      }
      return result;
    }
    case 121: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const y = test.args[1];
        const code = hashPassword(x, y);
        result[t] = code;
      }
      return result;
    }
    case 85: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const code = validateIP(x);
        result[t] = code;
      }
      return result;
    }
    case 86: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const code = romanToInt(x);
        result[t] = code;
      }
      return result;
    }
    case 84: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const code = isPrime(x);
        result[t] = code;
      }
      return result;
    }
    case 97: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const code = isPalindrome(x);
        result[t] = code;
      }
      return result;
    }
    case 113: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const code = typeof x;
        result[t] = code;
      }
      return result;
    }
    case 112: {
      const result = {};
      for (const t in tests) {
        const test = tests[t];
        const x = test.args[0];
        const code = missingInteger(x);
        result[t] = code;
      }
      return result;
    }
    default: {
      const result = { success: false };
      return result;
    }
  }
}

function firstUniqueChar(x) {
  for (let i = 0; i < x.length; i++) {
    let c = x.charAt(i);
    if (x.indexOf(c) == i && x.indexOf(c, i + 1) == -1) {
      return c;
    }
  }
  return false;
}

function digitOccurrence(n, x) {
  function number0fXs(n, x) {
    let count = 0;
    while (n > 0) {
      if (n % 10 == x) count++;
      n = parseInt(n / 10, 10);
    }
    return count;
  }
  function numberOfXinRange(n, x) {
    let count = 0;
    for (let i = x; i <= n; i++) count += number0fXs(i, x);
    if (x === 0) {
      return count + 1;
    } else {
      return count;
    }
  }
  return numberOfXinRange(n, x);
}

function isRotatedStr(x, y) {
  if (!x && !y) return true;
  x = x.split('');
  y = y.split('');
  for (let i = 0; i < x.length; i++) {
    const first = y[0];
    y.shift();
    y.push(first);
    if (x.join('') === y.join('')) return true;
  }
  return false;
}

function findWord(word, sentence) {
  word = word.toLowerCase();
  const start = sentence.indexOf(word);
  if (start === -1) return [];
  const end = start + word.length - 1;
  return [start, end];
}

function validateIP(x) {
  x = x.split('.');
  if (x.length !== 4) return false;
  for (let i = 0; i < x.length; i++) {
    if (!x[i]) return false;
    if (!/^[0-9]+$/.test(x[i])) return false;
    const number = Number(x[i]);
    if (number > 255) return false;
  }
  return true;
}

function hashPassword(password, x) {
  password = password.split('');
  if (x > 100) x = x % 26;
  let lowercase = 'abcdefghijklmnopqrstuvwxyz';
  let uppercase = lowercase.toUpperCase();
  let numbers = '0123456789'.split('');
  lowercase = lowercase.split('');
  uppercase = uppercase.split('');
  let index = 0;
  let generate = '';
  for (let i = 0; i < password.length; i++) {
    let setting = '';
    if (lowercase.includes(password[i])) {
      index = lowercase.indexOf(password[i]);
      setting = uppercase;
    } else if (uppercase.includes(password[i])) {
      index = uppercase.indexOf(password[i]);
      setting = lowercase;
    } else {
      index = numbers.indexOf(password[i]);
      setting = numbers;
    }
    index += x;
    if (setting[index]?.toString() === undefined) {
      index -= setting.length;
    }
    if (setting[index]?.toString() === undefined) {
      index -= setting.length + 2;
    }
    generate += setting[index]?.toString();
  }
  return generate;
}

function romanToInt(x) {
  const conversion = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
  const array = x.split('');
  let total = 0;
  let current, currentValue, next, nextValue;
  for (let i = 0; i < array.length; i++) {
    current = array[i];
    currentValue = conversion[current];
    next = array[i + 1];
    nextValue = conversion[next];
    if (currentValue < nextValue) {
      total -= currentValue;
    } else {
      total += currentValue;
    }
  }
  return total;
}

function isPrime(x) {
  for (let i = 2; i < x; i++) {
    if (x % i === 0) return false;
  }
  return x > 1;
}

function isPalindrome(x) {
  const re = /[^A-Za-z0-9]/g;
  const forward = x.toLowerCase().replace(re, '');
  const backward = forward.split('').reverse().join('');
  return forward === backward;
}

function missingInteger(x) {
  x = x.sort();
  if (!x.length) return 1;
  let value = x[0];
  for (let i = 0; i < x.length; i++) {
    value++;
    if (x[i + 1] !== value) {
      return value;
    }
  }
}
