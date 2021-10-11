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
