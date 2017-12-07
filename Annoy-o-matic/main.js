const answer1 = 'yes';
const answer2 = 'yeah';
const question = 'Are we there yet?';
const madeIt = 'Yay, we finally made it!';

let userAnswer = prompt(question);

while (!userAnswer.includes(answer1) && !userAnswer.includes(answer2)) {
  userAnswer = prompt(question);
}

alert(madeIt);
