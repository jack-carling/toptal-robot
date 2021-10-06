const robot = require('robotjs');
const clipboardy = require('clipboardy');

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

initialize();

async function initialize() {
  robot.keyTap('tab', 'command');
  robot.keyTap('enter');
  await sleep(500);
  robot.moveMouse(720, 670);
  robot.mouseClick();
  await sleep(1000);
  getQuestion();
}

function getQuestion() {
  robot.keyTap('a', 'command');
  robot.keyTap('c', 'command');
  const question = clipboardy.readSync();
  const number = getQuestionNumber(question);
  robot.keyTap('down');
  robot.keyTap('up');
  answer(number);
}

function getQuestionNumber(string) {
  if (string.includes('box.cube = function cube (x) {')) return 1;
  if (string.includes('box.multiplierCount = function multiplierCount(x, y) {')) return 2;
  if (string.includes('box.replaceSpaces = function replaceSpaces(x) {')) return 3;
  if (string.includes('box.removeAllSpaces = function removeAllSpaces(x) {')) return 4;
  if (string.includes('box.squareRoot = function squareRoot (x) {')) return 5;
  if (string.includes('box.findAverage = function findAverage(x) {')) return 6;
  if (string.includes('box.reverseString = function reverseString(x) {')) return 7;
  if (string.includes('box.arrayToObject = function arrayToObject(x) {')) return 8;
  if (string.includes('box.matchingType = function matchingType(x, y) {')) return 9;
  if (string.includes('box.numberRepresentation = function numberRepresentation(arr) {')) return 10;
  if (string.includes('box.countUniqueNumbers = function countUniqueNumbers(x) {')) return 11;
  if (string.includes('box.reverseCase = function reverseCase(x) {')) return 12;
  if (string.includes('box.monthToString = function monthToString(x) {')) return 13;
  if (string.includes('box.numberOfCircles = function numberOfCircles(x) {')) return 14;
  if (string.includes('box.binaryToNumber = function binaryToNumber(x) {')) return 15;
  if (string.includes('box.reverseAllWords = function reverseAllWords(x) {')) return 16;
  if (string.includes('box.twoArrayAvg = function twoArrayAvg(x, y) {')) return 17;
  if (string.includes('box.charCountInString = function charCountInString(x, y) {')) return 18;
  if (string.includes('box.digitOccurrence = function digitOccurrence(n, x) {')) return 19;
  if (string.includes('box.firstUniqueChar = function firstUniqueChar(x) {')) return 20;
  if (string.includes('box.averageAsciiChar = function averageAsciiChar(x) {')) return 21;
  if (string.includes('box.isRotatedStr = function isRotatedStr(x, y) {')) return 22;
  if (string.includes('box.hexToRGB = function hexToRGB(x) {')) return 23;
  if (string.includes('box.validateIP = function validateIP(x) {')) return 24;
  if (string.includes('box.findWord = function findWord(word, sentence) {')) return 25;
  if (string.includes('box.hashPassword = function hashPassword(password, x) {')) return 26;
  if (string.includes('box.isPalindrome = function isPalindrome(x) {')) return 27;
  if (string.includes('box.isPrime = function isPrime(x) {')) return 28;
  if (string.includes('box.romanToInt = function romanToInt(x) {')) return 29;
  if (string.includes('box.getHalfArray = function getHalfArray(x) {')) return 30;
  if (string.includes('box.removeDuplicates = function removeDuplicates(x) {')) return 31;
  return 0;
}

function answer(question) {
  switch (question) {
    case 1:
      robot.typeString(`return Math.pow(x, 3);`);
      submit();
      break;
    case 2:
      robot.typeString(`return Math.floor(x / y);`);
      submit();
      break;
    case 3:
      robot.typeString(`return x.replaceAll(' ', '%20');`);
      submit();
      break;
    case 4:
      robot.typeString(`return x.replaceAll(' ', '');`);
      submit();
      break;
    case 5:
      robot.typeString(`return Math.sqrt(x);`);
      submit();
      break;
    case 6:
      robot.typeString(
        `let total = 0; for (let i = 0; i < x.length; i++) { total += x[i]; } return Math.ceil(total / x.length);`
      );
      submit();
      break;
    case 7:
      robot.typeString(`const reversed = x.split('').reverse(); return reversed.join('');`);
      submit();
      break;
    case 8:
      robot.typeString(
        `const obj = {}; for (let i = 0; i < x.length; i++) { const name = x[i][0]; const value = x[i][1]; obj[name] = value; } return obj;`
      );
      submit();
      break;
    case 9:
      robot.typeString(`return typeof x === typeof y;`);
      submit();
      break;
    case 10:
      robot.typeString(
        `arr = arr.sort(); let letter = arr[0]; let total = 0; let number = ''; for (let i = 0; i < arr.length; i++) { if (arr[i] === letter) { total++; } else { number += total; total = 1; letter = arr[i]; } } number += total; return Number(number);`
      );
      submit();
      break;
    case 11:
      robot.typeString(`return new Set(x).size;`);
      submit();
      break;
    case 12:
      robot.typeString(
        `x = x.split(''); for (let i = 0; i < x.length; i++) { console.log(x[i]); if (x[i] === x[i].toLowerCase()) { x[i] = x[i].toUpperCase(); } else { x[i] = x[i].toLowerCase(); } } return x.join('');`
      );
      submit();
      break;
    case 13:
      robot.typeString(
        `const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; return months[x - 1];`
      );
      submit();
      break;
    case 14:
      robot.typeString(
        `x = x.toString(); let total = 0; for (let i = 0; i < x.length; i++) { if (x[i] === '0' || x[i] === '6' || x[i] === '9') total += 1; if (x[i] === '8') total += 2; } return total;`
      );
      submit();
      break;
    case 15:
      robot.typeString(
        `let num = x; let decimalValue = 0; let base = 1; let temp = num; while (temp) { let lastDigit = temp % 10; temp = Math.floor(temp / 10); decimalValue += lastDigit * base; base = base * 2; } return decimalValue;`
      );
      submit();
      break;
    case 16:
      robot.typeString(
        `const words = x.split(' '); for (let i = 0; i < words.length; i++) { const reversed = words[i].split('').reverse(); words[i] = reversed.join(''); } return words.join(' ');`
      );
      submit();
      break;
    case 17:
      robot.typeString(
        `let totalX = 0; let totalY = 0; x.map((x) => (totalX += x)); y.map((y) => (totalY += y)); totalX = totalX / x.length; totalY = totalY/ y.length; return (totalX + totalY) / 2;`
      );
      submit();
      break;
    case 18:
      robot.typeString(
        `y = y.split(''); let total = 0; for (let i = 0; i < y.length; i++) { if (x === y[i]) total++; } return total;`
      );
      submit();
      break;
    case 19:
      robot.typeString(
        `function number0fXs(n, x) { let count = 0; while (n > 0) { if (n % 10 == x) count++; n = parseInt(n / 10, 10); } return count; } function numberOfXinRange(n, x) { let count = 0; for (let i = x; i <= n; i++) count += number0fXs(i, x); if (x === 0) { return count + 1; } else { return count; } } return numberOfXinRange(n, x);`
      );
      submit();
      break;
    case 20:
      robot.typeString(
        `for (let i = 0; i < x.length; i++) { let c = x.charAt(i); if (x.indexOf(c) == i && x.indexOf(c, i + 1) == -1) { return c; } } return false;`
      );
      submit();
      break;
    case 21:
      robot.typeString(
        `x = x.split(''); let total = 0; for (let i = 0; i < x.length; i++) { total += x[i].charCodeAt(); } const average = Math.round(total / x.length); return String.fromCharCode(average);`
      );
      submit();
      break;
    case 22:
      robot.typeString(
        `if (!x && !y) return true; x = x.split(''); y = y.split(''); for (let i = 0; i < x.length; i++) { const first = y[0]; y.shift(); y.push(first); if (x.join('') === y.join('')) return true; } return false;`
      );
      submit();
      break;
    case 23:
      robot.typeString(
        String.raw`let m = x.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i); return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];`
      );
      submit();
      break;
    case 24:
      robot.typeString(
        String.raw`x = x.split('.'); if (x.length !== 4) return false; for (let i = 0; i < x.length; i++) { if (!x[i]) return false; if (!/^[0-9]+$/.test(x[i])) return false; const number = Number(x[i]); if (number > 255) return false; } return true;`
      );
      submit();
      break;
    case 25:
      robot.typeString(
        `word = word.toLowerCase(); const start = sentence.indexOf(word); if (start === -1) return []; const end = start + word.length - 1; return [start, end];`
      );
      submit();
      break;
    case 26:
      robot.typeString(
        `password = password.split(''); if (x > 100) x = x % 26; let lowercase = 'abcdefghijklmnopqrstuvwxyz'; let uppercase = lowercase.toUpperCase(); let numbers = '0123456789'.split(''); lowercase = lowercase.split(''); uppercase = uppercase.split(''); let index = 0; let generate = ''; for (let i = 0; i < password.length; i++) { let setting = ''; if (lowercase.includes(password[i])) { index = lowercase.indexOf(password[i]); setting = uppercase; } else if (uppercase.includes(password[i])) { index = uppercase.indexOf(password[i]); setting = lowercase; } else { index = numbers.indexOf(password[i]); setting = numbers; } index += x; if (setting[index]?.toString() === undefined) { index -= setting.length; } if (setting[index]?.toString() === undefined) { index -= setting.length + 2; } generate += setting[index]?.toString(); } return generate;`
      );
      submit();
      break;
    case 27:
      robot.typeString(
        String.raw`const re = /[^A-Za-z0-9]/g; const forward = x.toLowerCase().replace(re, ''); const backward = forward.split('').reverse().join(''); return forward === backward;`
      );
      submit();
      break;
    case 28:
      robot.typeString(`for (let i = 2; i < x; i++) { if (x % i === 0) return false; } return x > 1;`);
      submit();
      break;
    case 29:
      robot.typeString(
        `const conversion = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 }; const array = x.split(''); let total = 0; let current, currentValue, next, nextValue; for (let i = 0; i < array.length; i++) { current = array[i]; currentValue = conversion[current]; next = array[i + 1]; nextValue = conversion[next]; if (currentValue < nextValue) { total -= currentValue; } else { total += currentValue; } } return total;`
      );
      submit();
      break;
    case 30:
      robot.typeString(
        `const half = Math.ceil(x.length / 2); const result = []; for (let i = 0; i < half; i++) { result.push(x[i]); } return result;`
      );
      submit();
      break;
    case 31:
      robot.typeString(`return [...new Set(x)].join('');`);
      submit();
      break;

    default:
      console.log('No more answers...');
      return;
  }
}

async function submit() {
  await sleep(300);
  robot.moveMouse(1300, 800);
  robot.mouseClick();

  await tests();
  robot.mouseClick();

  await sleep(300);

  getQuestion();
}

function tests() {
  return new Promise(async (resolve) => {
    let color = 'd8d9dc';
    do {
      await sleep(50);
      color = robot.getPixelColor(1290, 790);
    } while (color === 'd8d9dc');
    resolve();
  });
}

// async function submit() {
//   await sleep(500);

//   robot.keyToggle('enter', 'down', ['command', 'alt', 'shift']);
//   robot.keyToggle('enter', 'up', ['command', 'alt', 'shift']);

//   await sleep(500);

//   robot.keyToggle('enter', 'down', ['command', 'alt', 'shift']);
//   robot.keyToggle('enter', 'up', ['command', 'alt', 'shift']);

//   await sleep(500);

//   getQuestion();
// }
