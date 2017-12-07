console.log('Is Even');

const isEven = num => (num % 2 === 0 ? true : false);

console.log('4', isEven(4));
console.log('8', isEven(8));
console.log('5', isEven(5));
console.log('9', isEven(9));
console.log('16', isEven(16));

console.log('factorial');

const factorial = num => {
  var sum = 1;
  for (let i = 2; i <= num; i++) {
    sum *= i;
  }
  return sum;
};

console.log('5', factorial(5));
console.log('8', factorial(8));
console.log('3', factorial(3));
console.log('10', factorial(10));
console.log('7', factorial(7));
console.log('4', factorial(4));

console.log('kebabToSnake');

const kebabToSnake = phrase => {
  const snake = phrase.replace(/-/g, '_');
  return snake;
};

console.log('hello-world', kebabToSnake('hello-world'));
console.log('dogs-are-awsome', kebabToSnake('dogs-are-awsome'));
console.log('blah', kebabToSnake('blah'));
