/**
  If you use [css-loader](https://github.com/webpack-contrib/css-loader) in your webpack project, `localIdentName` could be used to transform class names, like below:
    localIdentName: "[path][name]__[local]--[hash:base64:5]",
  Or you can create your own function to generate class names by setting `getLocalIdent`.

  Now please create a function to generate unique class names following rules below.
    1. only use alphabets: `a` to `z` , `A` to `Z`
    2. return one unique class name each time function is called
    3. the class name sequence should first be in order of length, then in Alphabetical order(lowercase in front).
    4. should provide a function to reset the sequences
 */

/* -------------------用例测试--------------------*/
getUniqueClassName(); // 'a'
getUniqueClassName(); // 'b'
getUniqueClassName(); // 'c'
// skip cases till 'Y'
getUniqueClassName(); // 'Z'
getUniqueClassName(); // 'aa'
getUniqueClassName(); // 'ab'
getUniqueClassName(); // 'ac'
// skip more cases
getUniqueClassName(); // 'ZZ'
getUniqueClassName(); // 'aaa'
getUniqueClassName(); // 'aab'
getUniqueClassName(); // 'aac'

getUniqueClassName.reset();
getUniqueClassName(); // 'a'

/* -------------------------- Code Solution: -------------------------------- */
/**
 * SOLUTION
 * 0. This is a classic modulo and divide problem. We also need to remember how many calls have been made to find the next correct index.
 * 1. There are 52 chars from which to choose from a-zA-Z total 52 characters.
 * 3. We keep a counter of how many times function is called, this will help us find where the next char index is.
 * 4. If we go beyond 52 calls then we just mod it to cycle back from the beginning.
 */
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let maxLength = chars.length;
let globalCounter = 0; // keep track of how many classnames are already generated

function getUniqueClassName() {
  let className = '';
  let counter = globalCounter; // increment the globalCounter

  while (counter >= 0) {
    // use modulo to cycle back to front of the chars list if counter > 52 for number under 52 it will remain the same
    let index = counter % maxLength;
    className = chars[index] + className;
    counter = Math.floor(counter / maxLength) - 1;
  }
  globalCounter++;

  return className;
}

getUniqueClassName.reset = () => {
  globalCounter = 0;
};
