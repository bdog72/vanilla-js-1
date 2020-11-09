//
//
'use strict';

/////////// DATA /////////////
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/////////// ELEMENTS /////////////
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

/////////// LECTURES /////////////
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////
// let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));

// SPLICE
// console.log(arr.splice(2));
// console.log(arr.splice(-1));
// console.log(arr);
// console.log(arr.splice(1, 2));
// console.log(arr);

// REVERSE
// let arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);

// CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);

// JOIN
// console.log(letters.join(' - '));

// let str = 'bozo';
// console.log(str);
// console.log(str.split(''));
// console.log(str.split('').reverse());
// console.log(str.split('').reverse().join(''));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// let i = 0;
// for (const movement of movements) {
//   if (movement > 0) {
//     i++;
//     console.log(`${[i]}: You deposited ${movement}`);
//   } else {
//     i++;
//     console.log(`${[i]}: You withdraw ${movement}`);
//   }
// }

// let i = 0;
// movements.forEach(function (movement) {
//   if (movement > 0) {
//     i++;
//     console.log(`${[i]}: You deposited ${movement}`);
//   } else {
//     i++;
//     console.log(`${[i]}: You withdraw ${movement}`);
//   }
// });

//////////////////////////////////////////////////

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(value);
//   console.log(key);
//   console.log(map);
// });

// const currenciesUnique = new Set(['a', 'b', 'c', 'b', 'c']);

// currenciesUnique.forEach(function (value, key, map) {
//   console.log(value);
//   console.log(key);
//   console.log(map);
// });

//////////////////////////////////////////////////

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1);
//   dogsJuliaCorrected.splice(-2);
//   // console.log(dogsJulia);
//   // console.log(dogsJuliaCorrected);
//   const dogs = dogsJuliaCorrected.concat(dogsKate);
//   console.log(dogs);
//   dogs.forEach((dog, i) => {
//     if (dog >= 3) {
//       // console.log();
//       console.log(
//         `Dog number ${i + 1} is an an adult. And is ${dog} years old`
//       );
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy.`);
//     }
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// const juliasDogs = [3, 5, 2, 12, 7];
// const newJuliasDogs = juliasDogs.slice(1, -1);

// const katesDogs = [4, 1, 15, 8, 3];

// function checkDogs(dogsJulia, dogsKate) {
//   dogsJulia.forEach(function (dog, i) {
//     const age = dog < 3 ? 'puppy' : 'adult';
//     console.log(
//       `Julias - Dog Number ${i + 1} is an ${age}, and is age ${
//         newJuliasDogs[i]
//       }`
//     );
//   });

//   console.log('------------------');

//   dogsKate.forEach(function (dog, i) {
//     const age = dog < 3 ? 'puppy' : 'adult';
//     console.log(
//       `Kates - Dog Number ${i + 1} is an ${age}, and is age ${katesDogs[i]}`
//     );
//   });
// }

// checkDogs(newJuliasDogs, katesDogs);

// const dogsJulia2 = [9, 16, 6, 8, 3];
// const dogsKate2 = [10, 5, 6, 1, 4];

//////////////////////////////////////////////////

const arr = [1, 2, 3, 4, 5];

// const newArrMulti = arr.map(current => {
//   return current * 2;
// });

// console.log('Map -', newArrMulti);
// console.log(arr);

// *************************

// const newArrFilter = arr.filter(el => {
//   return el > 3;
// });

// console.log('Filter -', newArrFilter);
// console.log(arr);

// *************************

// const newArrReduce = arr.reduce((a, b) => {
//   return a * b;
// });

// console.log('Reduce -', newArrReduce);
// console.log(arr);

//////////////////////////////////////////////////
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUSD = 1.1;

const movementsUSD = movements.map(movement =>
  Math.trunc(movement * euroToUSD)
);

console.log(movements);
console.log(movementsUSD);

movements.map((mov, i, arr) => {});

// const movementsUSDforOfLoop = [];

// for (const mov of movements) {
//   movementsUSDforOfLoop.push(mov * euroToUSD);
// }
// console.log(movementsUSDforOfLoop);

//////////////////////////////////////////////////
