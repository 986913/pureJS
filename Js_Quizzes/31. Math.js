console.log(1 / 0); // Infinity
console.log(0 / 0); // NaN
console.log(-1 / 0); // -Infinity

console.log((1 / 0) * 0); // NaN
// Infinity * 0 = NaN

console.log((1 / 0) * 1); // Infinity
// Infinity * 1 = Infinity

console.log((1 / 0) * -1); // -Infinity
// Infinity * -1 = -Infinity

console.log((1 / 0) * 1 + (1 / 0) * 1); // Infinity
// Infinity * 1 + Infinity * 1
// Infinity + Infinity = Infinity

console.log((1 / 0) * 1 - (1 / 0) * 1); // NaN
// Infinity * 1 - Infinity *1
// Infinity - Infinity = NaN

console.log((1 / 0) * 1 * ((1 / 0) * 1)); // Infinity
// Infinity * 1 * (Infinity * 1)
// Infinity * Infinity = Infinity

console.log(((1 / 0) * 1) / ((1 / 0) * 1)); // NaN
// Infinity * 1 / (Infinity * 1)
// Infinity / Infinity = NaM

console.log(0 / Infinity); // 0

console.log(0 * Infinity); // NaN
