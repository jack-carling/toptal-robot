# Speedcoding challenge

Here are my attempts at solving TopTal's speedcoding challenge which took place between the 27th of September and 10th of October 2021.

My score of 6028 landed me 109th place out of 2571 participants.

| Rank | Name         | Score |
| ---- | ------------ | ----- |
| 1    | Iurii Volf   | 6153  |
| 2    | Bao Ho       | 6152  |
| 3    | Ashbin Wosti | 6152  |
|      | ...          |       |
| 109  | Jack Carling | 6028  |

[Leaderboard](https://speedcoding.toptal.com/leaderboard?ch=toptal-js-2021)

## About

The challenge consisted of 37 JavaScript questions which had to be completed in less than 3 minutes. Solving each question gave a certain amount of points and any time remaining awarded a bonus of 10 points per second. However, if an attempt had been made to complete the challenge in the past 10 minutes prior, a cooldown penalization was inflicted lowering the bonus to 5 points per second.

The quickest I completed the challenge was in 16.274s.

## Starting out

I quickly realized that there would never be enough time to actually think and solve each question before the time runs out. So starting out I copied each question into my code editor, solved them, started the challenge, looked up my solution, copied and pasted it into the browser and so on. I had barely enough time to do this and I soon discovered that the questions didn't always show up in the same order which made this approach way too slow and confusing.

## Robot.js

I used [robotjs](https://www.npmjs.com/package/robotjs) as the technique for the first attempts of automation.

```javascript
robot.keyTap('tab', 'command');
robot.keyTap('enter');
await sleep(500);
robot.moveMouse(720, 670);
robot.mouseClick();
```

The first thing the robot does after the script is triggered in the terminal is to tab back to the browser, wait 500ms and click the start button of the challenge. I made sure that the browser was running in full screen on the correct page and ready to go before each attempt. To figure out where the mouse had to be moved I logged its position using `robot.getMousePos()` and I always ran the browser in full screen for it to be consistent.

```javascript
function getQuestion() {
  robot.keyTap('a', 'command');
  robot.keyTap('c', 'command');
  const question = clipboardy.readSync();
  const number = getQuestionNumber(question);
  robot.keyTap('down');
  robot.keyTap('up');
  answer(number);
}
```

The robot then called the function `getQuestion()` which selected all the text and copied it to the clipboard. This was possible since each task started with the textarea of the problem in focus. Using [clipboardy](https://www.npmjs.com/package/clipboardy) I could access the system clipboard and from there identify which task needed to be solved by sending the string as a parameter in `getQuestionNumber()` and returning a number corresponding to the task. This was necessary since the tasks never appeared in the same order.

When the question had been identified the robot pressed the `down` key to unselect all the text and then the `up` key to return into the scope of the function before providing the solution.

```javascript
function answer(question) {
  switch (question) {
    case 1:
      paste(`return Math.pow(x, 3);`);
      submit();
      break;
    ...
  }
}
```

The `answer()` function contained a switch statement with each solution passed into `paste()` which used clipboardy and robotjs to `writeSync()` the string before pasting it into the browser. After that `submit()` was called which moved the mouse cursor to the submit button and clicked it.

A series of test were run to check the code before continuing onto the next task. This time varied between tasks and was hard to estimate. Waiting too long and time was wasted or not waiting long enough and the script broke trying to figure out the problem before it had presented itself.

However, the button turned gray while the tests were running!

```javascript
function tests() {
  return new Promise(async (resolve) => {
    let color = 'd8d9dc';
    do {
      await sleep(30);
      color = robot.getPixelColor(1290, 790);
    } while (color === 'd8d9dc');
    resolve();
  });
}
```

I wrote a little script to wait before the second mouse click in order to continue to the next task. It checked the color of the button every 30ms and didn't proceed until it was no longer `#d8d9dc`. In order for this to work, before the challenge was even started, I had to open the devtools and make sure that the duration of transitions were completely turned of for the buttons in the CSS.

```css
transition-duration: 0.2s;
```

This approach could solve all the questions in 30-40 seconds, which wasn't quite fast enough. I needed another approach.

## Fetch

By studying the Fetch/XHR requests made in the browser under the Network tab in devtools I figured out a way to solve the tasks without using the browser at all. Using [node-fetch](https://www.npmjs.com/package/node-fetch) and [form-data](https://www.npmjs.com/package/form-data) I could initialize the challenge from the terminal which would return the next task as JSON, which could then be solved and sent in a new fetch request. Each successful task solved would return the next task which would be handled in a recursive function until `isChallengeEntryFinished` came back as true.

```javascript
async function getQuestion(task) {
  ...
  const tests = task.tests_json;
  result = solveTask(task.id, tests);
}

export default function solveTask(id, tests) {
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
  ...
}
```

The only difference in approach was that instead of sending in the code solution the request provided a certain number of tests that had to be solved and returned in the fetch for the task to be successfully completed.

## Fetch (fork)

The fetch approach was faster than the robotjs, but never fast enough to land me any higher than around 50th place in the leaderboard. I unsuccessfully tried a third approach in solving the challenge using Node.js [child_process](https://nodejs.org/api/child_process.html) to spawn new processes which are independent of the parent.

```javascript
if (tryAgain) {
  attempt += 1;
}
```

Since the most time consuming part of the previous approach were all the fetch requests (usually ranging between 400-800ms per request) I was hoping to be able to do two request simultaneously. The idea was to have the first request skip a task in order to generate a new one, and then both processes would each have a unique task to solve. The problem however was that a unique attempt id had to be provided with each request, and a successful request would return a new id. I somewhat managed to get around it by keep sending requests and incrementing the id by 1 whenever they failed, but that only worked occasionally.

## Conclusion

I really enjoyed this challenge. They encouraged participants to come up with clever solutions to solve the challenge and that was by far the most fun part of it. I learnt a lot about automation, recursive functions and more about fetch requests. I would have loved to see how participants in the top ten solved the challenge. The 1st place winner had 125 points more than me, and 10 points were awarded per second of time remaining. My best attempt was completed in approximately 16 seconds. This means that the winner must have figured out a way to solve the challenge in barely four seconds. I'm very happy with my result as a student one year into my studies competing against pros and hackers.
