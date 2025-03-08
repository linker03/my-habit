const findAll = function (n, k) {
  let count = 0;
  let minNumber = null;
  let maxNumber = null;

  function generateNumbers(current, start, k, sum) {
    if (k === 0) {
      if (sum === n) {
        count++;
        let currentNumber = current;
        if (minNumber === null || currentNumber < minNumber) {
          minNumber = currentNumber;
        }
        if (maxNumber === null || currentNumber > maxNumber) {
          maxNumber = currentNumber;
        }
      }
      return;
    }

    for (let i = start; i <= 9; i++) {
      if (sum + i <= n) {
        generateNumbers(current + i, i, k - 1, sum + i);
      }
    }
  }

  generateNumbers('', 1, k, 0);

  if (count === 0) {
    return [0];
  }

  return [count, minNumber, maxNumber];
};

const findAll = (n, k) => {
  let count = 0;
  let minNumber = null;
  let maxNumber = null;

  const startNumber = Number('1'.padEnd(k, 0));
  const endNumber = Number('9'.padEnd(k, 9));

  function areDigitsInAscendingOrder(number) {
    // Преобразуем число в строку и затем в массив цифр
    const digits = number.toString().split('').map(Number);

    // Проверяем, идут ли цифры в возрастающем порядке
    for (let i = 0; i < digits.length - 1; i++) {
      if (digits[i] > digits[i + 1]) {
        return false;
      }
    }

    return true;
  }

  for (let index = startNumber; index <= endNumber; index++) {
    const digitSum = Array.from(index.toString()).reduce(
      (acc, curr) => acc + Number(curr),
      0
    );
    const isRaisingDigitOrder = areDigitsInAscendingOrder(index);
    if (n === digitSum && isRaisingDigitOrder) {
      count += 1;
      if (minNumber === null || index < minNumber) {
        minNumber = index;
      }
      if (maxNumber === null || index > maxNumber) {
        maxNumber = index;
      }
    }
  }

  if (count === 0) return [0];
  return [count, minNumber, maxNumber];
};

console.log(findAll(10, 3), '// [8, 118, 334]'); // [8, 118, 334]
console.log(findAll(27, 3), '// [1, 999, 999]'); // [1, 999, 999]
console.log(findAll(28, 10), ' // [0]'); // [0]
