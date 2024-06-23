/**
 * @return {Generator<number>}

 * const gen = fibGenerator();
 * gen.next().value; // 0
 * gen.next().value; // 1
 */
/***************************Solution1: yield + while ***************************************************/
function* fibGenerator() {
  let a = 0;
  let b = 1;

  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

/***************************Solution2: yield + while + Destructuring Assignment **************************/
function* fibGenerator() {
  let a = 0;
  let b = 1;

  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

/***************************Solution3: yield + Recursion *************************************************/
function* fibGenerator(a = 0, b = 1) {
  // yield the first number
  yield a;
  // recursively call fibGenerator and yield the entire generator function
  yield* fibGenerator(b, a + b);
}
