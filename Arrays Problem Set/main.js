const array = [1, 2, 3, 4, 20, 6, 7, 8, 9, 10];
const array2 = [2, 2, 2, 8, 2];

console.log('Print Reverse');

const printReverse = arr => {
  const reversed = arr.reverse();
  return reversed;
};

console.log(printReverse(array));

console.log('isUniform');

const isUniform = arr => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] !== arr[i + 1]) {
      return false;
    }
  }

  return true;
};

console.log(isUniform(array));

console.log('SumArray');

const sumArray = arr => {
  let sum = 0;
  arr.forEach(el => {
    sum += el;
  });

  return sum;
};

console.log(sumArray(array));

console.log('Max');

const max = arr => {
  let max = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  return max;
};

console.log(max(array));
