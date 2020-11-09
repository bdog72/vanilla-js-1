//
//

const container = document.querySelector('.container');

const html = `
  <h1>before begin</h1>
`;
const html1 = `
  <h1>after begin</h1>
`;
const html2 = `
  <h1>before end</h1>
`;
const html3 = `
  <h1>after end</h1>
`;

container.insertAdjacentHTML('beforebegin', html);
container.insertAdjacentHTML('afterbegin', html1);
container.insertAdjacentHTML('beforeend', html2);
container.insertAdjacentHTML('afterend', html3);
// container.style.backgroundColor = 'red';
