/* 
  Order:
      - Statement
      - Promise .then --> micro
      - Web worker (port/window.eventHander, etc..) --> micro
      - Settimeout --> macro
*/

console.log(1);

window.onmessage = () => {
  console.log(2);
};

Promise.resolve().then(() => {
  console.log(3);
});

setTimeout(() => {
  console.log(4);
}, 0);

console.log(5);

window.postMessage('');

console.log(6);

// Answer:  1,5,6,3,2,4
