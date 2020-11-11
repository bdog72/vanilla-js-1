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
  owner: 'Steven Williams',
  // owner: 'Steven Thomas Williams',
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
        <div class="movements__value">$${mov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `$${balance}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `$${incomes}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `$${Math.abs(out)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `$${Math.trunc(Math.abs(interest))}`;
};

const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(letter => letter[0])
      .join('');
  });
};

createUsernames(accounts);

// Event handler
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log(`Logged In Bozo`);

    // Display UI and Message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    // Display Movements
    displayMovements(currentAccount.movements);

    // Display Balance
    calcDisplayBalance(currentAccount.movements);

    // Display Summary
    calcDisplaySummary(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);
});

// const bozo100 = [
// // console.log(accounts);
// /////////// LECTURES /////////////
// // const currencies = new Map([
// //   ['USD', 'United States dollar'],
// //   ['EUR', 'Euro'],
// //   ['GBP', 'Pound sterling'],
// // ]);

// // const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////
// // let arr = ['a', 'b', 'c', 'd', 'e'];

// // SLICE
// // console.log(arr.slice(2));
// // console.log(arr.slice(2, 4));
// // console.log(arr.slice(-2));
// // console.log(arr.slice(-1));
// // console.log(arr.slice(1, -2));

// // SPLICE
// // console.log(arr.splice(2));
// // console.log(arr.splice(-1));
// // console.log(arr);
// // console.log(arr.splice(1, 2));
// // console.log(arr);

// // REVERSE
// // let arr2 = ['j', 'i', 'h', 'g', 'f'];
// // console.log(arr2.reverse());
// // console.log(arr2);

// // CONCAT
// // const letters = arr.concat(arr2);
// // console.log(letters);

// // JOIN
// // console.log(letters.join(' - '));

// // let str = 'bozo';
// // console.log(str);
// // console.log(str.split(''));
// // console.log(str.split('').reverse());
// // console.log(str.split('').reverse().join(''));

// // const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // let i = 0;
// // for (const movement of movements) {
// //   if (movement > 0) {
// //     i++;
// //     console.log(`${[i]}: You deposited ${movement}`);
// //   } else {
// //     i++;
// //     console.log(`${[i]}: You withdraw ${movement}`);
// //   }
// // }

// // let i = 0;
// // movements.forEach(function (movement) {
// //   if (movement > 0) {
// //     i++;
// //     console.log(`${[i]}: You deposited ${movement}`);
// //   } else {
// //     i++;
// //     console.log(`${[i]}: You withdraw ${movement}`);
// //   }
// // });

// //////////////////////////////////////////////////

// // const currencies = new Map([
// //   ['USD', 'United States dollar'],
// //   ['EUR', 'Euro'],
// //   ['GBP', 'Pound sterling'],
// // ]);

// // currencies.forEach(function (value, key, map) {
// //   console.log(value);
// //   console.log(key);
// //   console.log(map);
// // });

// // const currenciesUnique = new Set(['a', 'b', 'c', 'b', 'c']);

// // currenciesUnique.forEach(function (value, key, map) {
// //   console.log(value);
// //   console.log(key);
// //   console.log(map);
// // });

// //////////////////////////////////////////////////

// // const checkDogs = function (dogsJulia, dogsKate) {
// //   const dogsJuliaCorrected = dogsJulia.slice();
// //   dogsJuliaCorrected.splice(0, 1);
// //   dogsJuliaCorrected.splice(-2);
// //   // console.log(dogsJulia);
// //   // console.log(dogsJuliaCorrected);
// //   const dogs = dogsJuliaCorrected.concat(dogsKate);
// //   console.log(dogs);
// //   dogs.forEach((dog, i) => {
// //     if (dog >= 3) {
// //       // console.log();
// //       console.log(
// //         `Dog number ${i + 1} is an an adult. And is ${dog} years old`
// //       );
// //     } else {
// //       console.log(`Dog number ${i + 1} is still a puppy.`);
// //     }
// //   });
// // };

// // checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// // const juliasDogs = [3, 5, 2, 12, 7];
// // const newJuliasDogs = juliasDogs.slice(1, -1);

// // const katesDogs = [4, 1, 15, 8, 3];

// // function checkDogs(dogsJulia, dogsKate) {
// //   dogsJulia.forEach(function (dog, i) {
// //     const age = dog < 3 ? 'puppy' : 'adult';
// //     console.log(
// //       `Julias - Dog Number ${i + 1} is an ${age}, and is age ${
// //         newJuliasDogs[i]
// //       }`
// //     );
// //   });

// //   console.log('------------------');

// //   dogsKate.forEach(function (dog, i) {
// //     const age = dog < 3 ? 'puppy' : 'adult';
// //     console.log(
// //       `Kates - Dog Number ${i + 1} is an ${age}, and is age ${katesDogs[i]}`
// //     );
// //   });
// // }

// // checkDogs(newJuliasDogs, katesDogs);

// // const dogsJulia2 = [9, 16, 6, 8, 3];
// // const dogsKate2 = [10, 5, 6, 1, 4];

// //////////////////////////////////////////////////

// // const arr = [1, 2, 3, 4, 5];

// // const newArrMulti = arr.map(current => {
// //   return current * 2;
// // });

// // console.log('Map -', newArrMulti);
// // console.log(arr);

// // *************************

// // const newArrFilter = arr.filter(el => {
// //   return el > 3;
// // });

// // console.log('Filter -', newArrFilter);
// // console.log(arr);

// // *************************

// // const newArrReduce = arr.reduce((a, b) => {
// //   return a * b;
// // });

// // console.log('Reduce -', newArrReduce);
// // console.log(arr);

// //////////////////////////////////////////////////
// // const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // const euroToUSD = 1.1;

// // const movementsUSD = movements.map(movement =>
// //   Math.trunc(movement * euroToUSD)
// // );

// // console.log(movements);
// // console.log(movementsUSD);

// // prettier-ignore
// // const movementDescriptions = movements.map((movement, i) => {
// //   return `Movement ${[i]}:
// //     You ${movement > 0 ? 'deposited' : 'withdrew'}
// //       ${Math.abs(movement)}`;
// //   });

// // console.log(movementDescriptions);

// // console.log(Math.trunc(Math.random() * 6));

// // const movementsUSDforOfLoop = [];

// // for (const mov of movements) {
// //   movementsUSDforOfLoop.push(mov * euroToUSD);
// // }
// // console.log(movementsUSDforOfLoop);

// //////////////////////////////////////////////////
// // const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // const deposits = movements.filter(function (mov) {
// //   return mov > 0;
// // });

// // const withDraws = movements.filter(mov => mov > 0) ? '+' : '-';
// // const withDraws = movements.filter(mov => mov < 0);

// // console.log(deposits);
// // console.log(withDraws);

// //////////////////////////////////////////////////

// // const balance = movements.reduce((accumulator, current, index, array) => {
// //   console.log(`Iteration ${index}: ${accumulator}`);
// //   return accumulator + current;
// // }, 0);

// // console.log(balance);

// // const max = movements.reduce((acc, mov) => (acc > mov ? acc : mov));
// // const max = movements.reduce((acc, mov) => {
// //   if (acc > mov) {
// //     return acc;
// //   } else {
// //     return mov;
// //   }
// // });

// // console.log(max);
// ///////////////////////////////////////

// // const ages = [5, 2, 4, 1, 15, 8, 3];
// // const calcAverageHumanAge = function (ages) {
// //   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
// //   const adults = humanAges.filter(adult => adult >= 18);
// //   const averageAge = adults.reduce((a, b) => {
// //     return a + b / adults.length;
// //   }, 0);
// //   return averageAge;
// // };

// // const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// // console.log(avg1);
// // const calcAverageHumanAge = ages => {
// //   // console.log(ages);
// //   const total = ages.filter(age => {
// //     // return age <= 2 ? 2 * age : 16 + age * 4;
// //     return age <= 2;
// //   });
// //   return total;
// // };

// // console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// ///////////////////////////////////////

// // const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // const euroToUSD = 1.1;

// // const totalDepositsInUSD = movements
// //   .filter(mov => mov > 0)
// //   .map(mov => mov * euroToUSD)
// //   .reduce((a, b) => a + b, 0);

// // console.log(Math.trunc(totalDepositsInUSD));
// ///////////////////////////////////////

// // const firstWithdraw = movements.find(mov => {
// //   return mov < 0;
// // });

// // console.log(firstWithdraw);
// // console.log(accounts);

// // const account = accounts.find(acc => {
// //   // return acc.owner === 'Jessica Davis';
// //   return acc.username === 'jd';
// // });

// // console.log(account);

// // for (const account of accounts) {
// //   const result = account.owner === 'Jessica Davis';
// //   console.log(result);
// //   // console.log(account);
// // }

// ///////////////////////////////////////
// ]
