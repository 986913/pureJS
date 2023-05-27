/*------------------- 用例测试 -------------------- */
textSearch('The Quick Brown Fox Jumps Over The Lazy Dog', ['fox', '  ']);
// 'The Quick Brown <b>Fox</b> Jumps Over The Lazy Dog'

textSearch('The quick brown fox jumps over the lazy dog', ['fox', 'dog']);
// 'The quick brown <b>fox</b> jumps over the lazy <b>dog</b>'

textSearch('This is Uncopyrightable!', ['copy', 'right']);
// 'This is Un<b>copyright</b>able!'

textSearch('This is Uncopyrightable!', ['copy', 'right', 'table']);
// 'This is Un<b>copyrightable</b>!'

textSearch('aaa', ['aa']);
// '<b>aa</b>a'

// This is because the second character cannot be used as a match again.
textSearch('aaaa', ['aa']);
// '<b>aaaa</b>'

/* ------------------ Solution Code ---------------------------------------------------- */
/**
 * @param {string} setence
 * @param {Array<string>} queries
 * @return {string}
 */

function textSearch(setence, queries) {
  if (setence.trim() === '') return setence;

  const boldChars = Array(setence.length).fill(false);

  // 1. identification of bold characters: 外循环quries, 内循环setence
  for (const query of queries) {
    if (query.trim() === '') continue; // edge case: '  '

    for (let i = 0; i < setence.length; ) {
      const substr = setence.slice(i, i + query.length);
      if (substr.toLowerCase() === query.toLowerCase()) {
        boldChars.fill(true, i, i + query.length);
        // Start from next character if there's a match since one character cannot match the same query more than once.
        i = i + query.length;
      } else {
        i++;
      }
    }
  }
  // console.log(boldChars);

  // 2. rendering of the <b> tags
  let result = '';
  for (let i = 0; i < setence.length; i++) {.
    const shouldAddOpeningTag = boldChars[i] && !boldChars[i - 1];
    const shouldAddClosingTag = boldChars[i] && !boldChars[i + 1];

    let char = setence[i];
    if (shouldAddOpeningTag) char = `<b>${char}`;
    if (shouldAddClosingTag) char = `${char}</b>`;

    result += char;
  }

  return result;
}
