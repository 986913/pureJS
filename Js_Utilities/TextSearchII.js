/*------------------- 用例测试 -------------------- */
textSearch('The Quick Brown Fox Jumps Over The Lazy Dog', ['fox']);
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
 * @param {string} string
 * @param {Array<string>} queries
 * @return {string}
 */

function textSearch(string, queries) {
  if (string.trim() === '') return string;

  const boldChars = Array(string.length).fill(false);

  // 1. identification of bold characters
  for (const query of queries) {
    if (query.trim() === '') continue;

    for (let i = 0; i < string.length; ) {
      const substr = string.slice(i, i + query.length);
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
  let highlightedString = '';
  for (let i = 0; i < string.length; i++) {
    // When the current character should be bolded and the previous character should not be bolded, append an opening tag to the final string.
    const shouldAddOpeningTag = boldChars[i] && !boldChars[i - 1];
    // When the current character should be bolded and the next character should not be bolded, append a closing tag to the final string.
    const shouldAddClosingTag = boldChars[i] && !boldChars[i + 1];

    let char = string[i];
    if (shouldAddOpeningTag) char = `<b>${char}`;
    if (shouldAddClosingTag) char = `${char}</b>`;

    highlightedString += char;
  }

  return highlightedString;
}
