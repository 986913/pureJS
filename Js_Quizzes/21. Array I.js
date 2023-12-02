const a = [0];
console.log(a.length); // 1 Since array contains one element
a[3] = 3; // a = [0, empty, empty, 3]
console.log(a.length); // 4 Since array contains four elements now(even though only 2 elements are defined)

for (let item of a) {
  console.log(item); // prints all the array items
}
// 0
// undefined
// undefined
// 3

a.map((item) => {
  console.log(item);
}); // only called for assigned values
// 0
// 3

a.forEach((item) => {
  console.log(item);
}); // only called for assigned values
// 0
// 3

console.log(Object.keys(a)); // ["0","3"] only defined indexes are retuned

delete a[3]; // deletes/unassigns that index
// a = [0, empty, empty, empty]
console.log(a.length); // 4 since length remains unaffected

a[2] = 2; // a = [0, empty, 2, empty]

a.length = 1; // this actually truncates the array so that length is only 1 now
// a = [0]

console.log(a[0], a[1], a[2]); // 0,undefined,undefined

/**
  In JavaScript, arrays aren't primitives but are instead Array objects

  The length property of an Array sets or returns the number of elements in that array. You can set the length property to truncate an array at any time. 
  The thing to remember is that the length property does not necessarily indicate the number of defined values in the array

  In Array.map() callback is invoked only for indexes of the array which have assigned values (including undefined). It is not called for missing elements of the array
  Similarly, Array.forEach() is not invoked for index properties that have been deleted or are uninitialized

  Arrays being very similar to Objects allow Object.keys to be called on it returning the indexes as an array. 
  However, for sparse arrays, only the defined indexes are returned

  Deleting array element using delete just unassigns the value (making it empty) at that index
 */
