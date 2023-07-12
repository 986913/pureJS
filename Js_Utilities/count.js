/**
  Given a non-empty string, return the most frequently ocurring character.
  If there are multiple characters with same occurrance, return an array of them.
  Follow-up: What is the time & space complexity of your approach?
 */

/*-------------------用例测试--------------------*/
count('abbccc'); // 'c'
count('abbcccddd'); // ['c', 'd']

/* ------------------ Code solution ------------------ */
function count() {
  let map = new Map();
  let maxOcurrance = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    map.set(char, map.get(char) + 1 || 1);
    maxOcurrance = Math.max(maxOcurrance, map.get(char));
  }

  let result = [];
  map.forEach((val, key) => {
    if (val === maxOcurrance) {
      result.push(key);
    }
  });

  return result.length === 1 ? result[0] : result;
}
