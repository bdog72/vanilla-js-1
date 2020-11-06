//
//

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const btn = document.querySelector('button');
btn.textContent = 'Click Me';

btn.addEventListener('click', function (params) {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');
  // console.log(rows);

  for (const row of rows) {
    const [first, second] = row.toLowerCase.trim().split('_');
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(output);
  }
});

// underscore_case
//  first_name
// Some_Variable
//   calculate_AGE
// delayed_departure

// console.log(text);

const convertToCamelCase = str => {
  console.log(str);
};

convertToCamelCase();

const airline = `TAP Air Portugal`;
const plane = 'A320';

// const message = 'Bad weather, all departures Delayed.... ';
// const repeatMessage = message.repeat(5);
// console.log(repeatMessage);

// const message = 'Go to gate 23';
// console.log(message.padStart(25, '+').padEnd(50, '+'));

// const maskedCreditCard = function (number) {
//   const str = number + '';
//   const last = str.slice(-4);
//   const newStr = last.padStart(str.length, '*');
//   console.log(newStr);
//   // return last.padStart(str.length, '*');
//   return newStr;
// };

// maskedCreditCard(106364775985);
// console.log('bozo boy'.split('').reverse().join(''));

// const [firstName, lastName, bozo] = `Bozo Beak a`.split(' ');

// console.log(firstName);
// console.log(lastName);
// console.log(bozo);

// const capitalize = function (name) {
//   const names = name.split(' ');
//   const namesUpper = [];
//   for (const name1 of names) {
//     namesUpper.push(name1[0].toUpperCase() + name1.slice(1));
//   }
//   console.log(namesUpper.join(' '));
//   // return namesUpper;
// };

// capitalize('jessica ann smith davis');

// console.log(passenger);
// const plane = 'A320neo';
// console.log(plane.includes('A320'));

// console.log(plane.startsWith('A3'));

// if (plane.startsWith('A32') && plane.endsWith('neo')) {
//   console.log(1);
// } else {
//   console.log(2);
// }

// const checkBaggage = items => {
//   const baggage = items.toLowerCase();
//   if (baggage.includes('knife') || baggage.includes('gun')) {
//     console.log(`No Way Jose`);
//   }
//   // console.log(baggage);
// };

// checkBaggage('I have a laptop, some Food and a pocket Knife');
// checkBaggage('Socks and a camera');
// checkBaggage('Some snacks, and a Gun for protection');

// const priceUS = '299.00';
// const priceGB = priceUS.replace();
// console.log(priceGB);

// const announcement = `All passengers come to boarding door 23. Boarding door 23`;

// // console.log(announcement.replace('door', 'gate'));
// console.log(announcement.replace(/door/g, 'gate'));

// const email = 'hello@jonas.io';

// const loginEmail = ' Hello@Jonas.Io \n';
// console.log(loginEmail.length);
// const lowerCase = loginEmail.toLowerCase().trim();

// console.log(lowerCase.length);
// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());

// const passenger = 'jOnAS';
// const passengerLower = passenger.toLowerCase();
// const passengerCorrect = passengerLower.replace('j', 'J');
// const passengerCorrect =
//   passengerLower[0].toUpperCase() + passengerLower.slice(1);
// console.log(passengerCorrect);

// console.log(airline.slice(4, 7));
// console.log(airline.slice(0, airline.lastIndexOf(' ')));
// console.log(airline.slice(-2));
// console.log(airline.slice(1, -1));

// const checkMiddleSeat = seat => {
//   const s = seat.slice(-1).toLowerCase();
//   if (s === 'b' || s === 'e') {
//     console.log(`Middle Seat Bozo`);
//   } else {
//     console.log('No Middle Bozo');
//   }
// };

// checkMiddleSeat('11B');
// checkMiddleSeat('23C');
// checkMiddleSeat('3E');
