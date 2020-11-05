//
//

const airline = `TAP Air Portugal`;
const plane = 'A320';

// console.log(airline.slice(4, 7));
// console.log(airline.slice(0, airline.lastIndexOf(' ')));
// console.log(airline.slice(-2));
// console.log(airline.slice(1, -1));

const checkMiddleSeat = seat => {
  const s = seat.slice(-1).toLowerCase();
  if (s === 'b' || s === 'e') {
    console.log(`Middle Seat Bozo`);
  } else {
    console.log('No Middle Bozo');
  }
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');
