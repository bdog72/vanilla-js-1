//
//

'use strict';

const weekDays = ['mon', 'tues', 'wed', 'thur', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekDays[0]]: {
    open: 2,
    close: 3,
  },
  [weekDays[3]]: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours,

  order(starterMenu, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`${ing1} ${ing2} ${ing3}`);
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// *****************************************************
// *****************************************************

// *****************************************************
// *****************************************************
// console.log(restaurant.orderBozo?.(0, 1) ?? 'Method does not exist');

// console.log(restaurant.openingHours.tues?.open);
// console.log(restaurant.openingHours?.mon?.open);
// const days = ['mon', 'tues', 'wed', 'thur', 'fri', 'sat', 'sun'];

// for (const day of days) {
//   // console.log(day);
//   const open = restaurant.openingHours[day]?.open;
//   if (open < 12 && open > 0) {
//     console.log(`On ${day}, we open at ${open}am`);
//   } else {
//     console.log(open);
//   }
//   // if (open < 12 && open >= 0) {
//   //   console.log(`${open}am`);
//   // }
// }

// const randomColor = () => {
//   const r = Math.floor(Math.random() * 255) + 1;
//   const g = Math.floor(Math.random() * 255) + 1;
//   const b = Math.floor(Math.random() * 255) + 1;
//   return `${r},${g},${b}`;
// };
// console.log(randomColor());

// const randomColor1 = () => {
//   const bozo = Math.random().toString(16).substr(-6);
//   return `#${bozo}`;
// };

// console.log(randomColor1());

// const evenOrOdd = num => {
//   return num % 2 === 0;
// };
// console.log(evenOrOdd(10));
// *****************************************************
// *****************************************************

// *****************************************************
// *****************************************************

// numGuests: 72,

// openingHours: {
//   thu: {
//     open: 12,
//     close: 22,
//   },
//   fri: {
//     open: 11,
//     close: 23,
//   },
//   sat: {
//     open: 0, // Open 24 hours
//     close: 24,
//   },
// },

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);

// let i = 0;
// for (const item of menu) {
//   i++;
//   console.log(`${item[i]}: ${item}`);
// }

// let i = 0;
// for (const item of menu) {
//   i++;
//   console.log(`${i}: ${item}`);
// }

// for (let i = 1; i < menu.length; i++) {
//   console.log(i, menu[i]);
// }

// *****************************************************
// *****************************************************

// console.log(3 || 'Bozo');
// console.log('' || 'Bozo');
// console.log(true || 0);
// console.log(undefined || null);

// console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

// console.log(0 && 'Bozo');
// *****************************************************
// *****************************************************
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, ...others);

// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, otherFood);

// const { sat, ...weekDays } = restaurant.openingHours;
// console.log(weekDays);

// const add = function (...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     sum += numbers[i];
//   }
//   console.log(sum);
// };

// add(2, 3);
// add(5, 3, 7, 2);
// add(8, 2, 5, 3, 2, 1, 4);

// const x = [23, 5, 7];
// add(...x);

// restaurant.orderPizza('pepperoini', 'cheese', 'bacon', 'onions');

// *****************************************************
// *****************************************************

// const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Bozo' };
// console.log(newRestaurant);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Bozo"s place';

// console.log(restaurant.orderPasta(1, 2, 3));

// const ingredients = [prompt(`Enter a few favorite ingredients`)];

// restaurant.orderPasta(...ingredients);

// const arr = [7, 8, 9];
// const goodNewArray = [1, 2, ...arr];
// console.log(goodNewArray);
// console.log(...arr);
// console.log(...goodNewArray);

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// const mainMenuCopy = [...restaurant.mainMenu];

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);

// const str = 'Jonas';
// const letters = [...str, ' ', 'S.'];
// console.log(letters);

// const { name, openingHours, categories } = restaurant;

// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;

// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// let a = 111;
// let b = 999;

// const obj = { a: 23, b: 7, c: 14 };

// const { fri } = openingHours;
