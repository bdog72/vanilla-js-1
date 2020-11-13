//
//
'use strict';

/////////// DATA /////////////
const account1 = {
  owner: 'Jona Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jess Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Stev Williams',
  // owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sara Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/////////// ELEMENTS /////////////

const modal = document.querySelector('.modal');

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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
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

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `$${acc.balance}`;
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

const updateUI = function (acc) {
  // Display Movements
  displayMovements(acc.movements);

  // Display Balance
  calcDisplayBalance(acc);

  // Display Summary
  calcDisplaySummary(acc);
};

// Event handler
btnLogin.addEventListener('click', function (e) {
  modal.classList.add('bozo');
});

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // console.log(`Logged In Bozo`);

    // Display UI and Message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  console.log(`Close Account`);
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // Delete Account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// const bozo100 = [
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// /////////////////////////////////////

// const x = new Array(7);
// console.log(x);

// x.fill(1, 3, 5);
// console.log(x);

// const y = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(y);

// const oneHundred = Array.from({ length: 100 }, (_, i) => i + 1);
// console.log(oneHundred);
// console.log(oneHundred.reverse('').join(' '));

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value')
//   );
//   console.log(movementsUI);
// });

// /////////////////////////////////////

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating ${
    dogSarah.curFood > dogSarah.recFood ? 'too much' : 'not enough'
  }`
);

// 3.
const ownersEatTooMuch = dogs
  .filter(dog => {
    return dog.curFood > dog.recFood;
  })
  .flatMap(dog => {
    return dog.owners;
  });
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => {
    return dog.curFood < dog.recFood;
  })
  .flatMap(dog => {
    return dog.owners;
  });
console.log(ownersEatTooLittle);

// 4.
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6.
const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.some(checkEatingOkay));

// 7.
console.log(dogs.filter(checkEatingOkay));

// 8.
const dogsSorted = dogs.slice().sort((a, b) => {
  return a.recFood - b.recFood;
});

console.log(dogsSorted);

// dogs.forEach(dog => {
//   const bozo = dog.weight ** 0.75 * 28;
//   console.log(bozo);
//   const bozo1 = dog.owners.includes('Sarah');
//   console.log(bozo1);
// });

// /////////////////////////////////////

// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());
// console.log(movements);

// const newSort = movements.sort((a, b) => {
//   if (a > b) {
//     return 1;
//   } else if (b > a) {
//     return -1;
//   }
// });

// console.log(newSort);

// /////////////////////////////////////

// const str = 'bozo boy';
// console.log(str);
// const newStr = str.split('').reverse().join('');
// console.log(newStr);

// /////////////////////////////////////
// const arr = [
//   [1, 2, 3],
//   [4, 5],
//   [6, 7, 8, 9],
// ];
// console.log(arr.flat());

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const overallMovements = allMovements.reduce((a, b) => a + b, 0);
// console.log(overallMovements);

// console.log(movements.includes(-130));

// const bozo = movements.some(mov => mov > 0);

// console.log(bozo);

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

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(movements.every);
