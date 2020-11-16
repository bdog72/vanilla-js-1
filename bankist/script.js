//
//
'use strict';

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-11-11T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-US', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements

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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// function startLogoutTimer() {
//   // Set Time to 5 minutes
//   let time = 10;

//   // Call timer every second
//   const logoutTimer = setInterval(function () {
//     const min = String(Math.trunc(time / 60)).padStart(2, '0');
//     const sec = String(time % 60).padStart(2, '0');

//     // In each call, print remaining time to UI
//     labelTimer.textContent = `${min}:${sec}`;

//     time--;
//     // When reach 0, stop timer and logout user
//     if (time === -1) {
//       clearInterval(logoutTimer);
//       labelWelcome.textContent = 'Login To Get Started';
//       containerApp.style.opacity = 0;
//     }
//   }, 1000);
// }

function startLogoutTimer() {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');

    // In each call, print remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    time--;
    // When reach 0, stop timer and logout user
    if (time === -1) {
      clearInterval(logoutTimer);
      labelWelcome.textContent = 'Login To Get Started';
      containerApp.style.opacity = 0;
    }
  };
  // Set Time to 5 minutes
  let time = 300;

  // Call timer every second
  tick();
  const logoutTimer = setInterval(tick, 1000);
  return logoutTimer;
}

///////////////////////////////////////
// Event handlers
let currentAccount, logoutTimer;

// const init = () => {
//   currentAccount = account1;
//   updateUI(currentAccount);
//   containerApp.style.opacity = 100;
// };

// init();

btnLogin.addEventListener('click', function (e) {
  modal.classList.add('closeModal');
});

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (logoutTimer) {
      clearInterval(logoutTimer);
    }

    // Start Timer
    logoutTimer = startLogoutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
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

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset Timer
    clearInterval(logoutTimer);
    logoutTimer = startLogoutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset Timer
      clearInterval(logoutTimer);
      logoutTimer = startLogoutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete account
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

/////////////////////////////////////////////////

// const future = new Date(2037, 10, 19, 15, 23);
// const future = new Date(2020, 11, 15);
// const future = new Date(2037, 10, 19);
// const future1 = new Date(2037, 10, 26);

// const calcDaysPassed = (a, b) => {
//   return (b - a) / (1000 * 60 * 60 * 24);
//   // const totalDays = (b - a) / (1000 * 60 * 60 * 24);
//   // return totalDays / 365;
// };

// console.log(calcDaysPassed(future, future1));

// console.log(+future);

// const millisecondsInDay = 1000 * 60 * 60 * 24;
// const calcDaysPassed = (date1, date2) => {
//   return (date2 - date1) / millisecondsInDay;
// };

// console.log(calcDaysPassed(new Date(2037, 10, 19), new Date(2037, 10, 26)));

// console.log(millisecondsInDay);

/////////////////////////////////////////////////

// const randomInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min) + 1) + min;
// };
// console.log(randomInt(1, 100));

/////////////////////////////////////////////////

// console.log(6 % 3 === 0);

// const isEven = num => {
//   return num % 2 === 0;
// };

// console.log(isEven(4));

// labelBalance.addEventListener('click', () => {
//   [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
//     if (i % 2 === 0) {
//       row.style.backgroundColor = 'orangered';
//     }
//   });
// });

/////////////////////////////////////////////////

// const now = new Date();
// console.log(now);

// console.log(new Date(account1.movementsDates[0]));

/////////////////////////////////////////////////

// const ingredients = ['olives', 'spinach'];

// const pizzaTimer = setTimeout(
//   (a, b) => {
//     console.log(`Bozo ${a} ${b}`);
//   },
//   2000,
//   ...ingredients
// );

// if (ingredients.includes('spinach')) {
//   clearTimeout(pizzaTimer);
// }

// setInterval(function () {
//   const now = new Date();
//   const hours = now.getHours();
//   const minutes = now.getMinutes();
//   const seconds = now.getSeconds();

//   if (minutes < 10 && minutes > 0) {
//     console.log(`${hours}:0${minutes}:${seconds}`);
//   } else if (seconds < 10 && seconds > 0) {
//     console.log(`${hours}:${minutes}:0${seconds}`);
//   } else {
//     console.log(`${hours}:${minutes}:${seconds}`);
//   }

//   if (seconds < 10 && seconds >= 0) {
//     console.log(`${hours}:${minutes}:0${seconds}`);
//   } else {
//     console.log(`${hours}:${minutes}:${seconds}`);
//   }

//   if (minutes < 10 && minutes >= 0) {
//     console.log(`${hours}:0${minutes}:${seconds}`);
//   } else {
//     console.log(`${hours}:${minutes}:${seconds}`);
//   }
// }, 1000);

/////////////////////////////////////////////////

/////////////////////////////////////////////////
