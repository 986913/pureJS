const p1 = Promise.resolve(1); //  Object=> `Promise { 1 }`
const p2 = new Promise((resolve) => resolve(p1)); // Object => `Promise { <pending> }`
const p3 = Promise.resolve(p1); // Object => pointing to same object that `p1` is pointing i.e. `Promise { 1 }`
const p4 = p2.then(() => new Promise((resolve) => resolve(p3))); // Object => `Promise { <pending> }`
const p5 = p4.then(() => p4); // Object => `Promise { <pending> }`

console.log(p1 == p2); // false as both are pointing to different object
console.log(p1 == p3); // true as both point to same object
console.log(p3 == p4); // false as both are pointing to different object
console.log(p4 == p5); // false as both are pointing to different object
