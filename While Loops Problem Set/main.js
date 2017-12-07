console.log('Problem 1');

let num1 = -10;

while (num1 <= 19) {
  console.log('Num1', num1);
  num1++;
}

console.log('Problem 2');

let num2 = 10;

while (num2 <= 40) {
  if (num2 % 2 === 0) {
    console.log('num2', num2);
  }
  num2++;
}

console.log('Problem 3');

let num3 = 300;

while (num3 <= 333) {
  if (num3 % 2 !== 0) {
    console.log('Num3', num3);
  }
  num3++;
}

console.log('Problem 4');

let num4 = 5;

while (num4 <= 50) {
  if (num4 % 5 === 0 && num4 % 3 === 0) {
    console.log('Num4', num4);
  }
  num4++;
}
