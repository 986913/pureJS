/**
 * @param {string} string
 * @param {string} query
 * @return {string}
 */
/*------------------- 用例测试 -------------------- */
console.log(textSearch('The Quick Brown Fox Jumps Over The Lazy Dog', 'fox')); // 'The Quick Brown <b>Fox</b> Jumps Over The Lazy Dog'
console.log(textSearch('The hardworking Dog overtakes the lazy dog', 'dog')); // 'The hardworking <b>Dog</b> overtakes the lazy <b>dog</b>'
console.log(textSearch('aaa', 'aa')); // '<b>aa</b>a'  This is because the second character cannot be used as a match
console.log(textSearch('aaaa', 'aa')); // Correct: '<b>aaaa</b>'  // Wrong: '<b>aa</b><b>aa</b>'

/* ------------------ Solution Code ---------------------------------------------------- */
function textSearch(setence, query) {
  if (!setence || !query) return setence; // edge case

  const boldChars = Array(setence.length).fill(false);

  // 1. identification of bold characters
  for (let i = 0; i < setence.length; ) {
    const substr = setence.slice(i, i + query.length);
    if (substr.toLowerCase() === query.toLowerCase()) {
      //fill with true with same length as query's (from position i until position i+query.length)
      boldChars.fill(true, i, i + query.length);
      i += query.length; //if found, need jump i to query.length as unit
    } else {
      i++;
    }
  }
  // console.log(boldChars);

  // 2. rendering of the <b> tags
  let result = '';
  for (let i = 0; i < setence.length; i++) {
    const shouldOpenTag = boldChars[i] && !boldChars[i - 1];
    const shouldCloseTag = boldChars[i] && !boldChars[i + 1];

    let char = setence[i];
    if (shouldOpenTag) char = `<b>${char}`;
    if (shouldCloseTag) char = `${char}</b>`;

    result += char;
  }

  return result;
}
