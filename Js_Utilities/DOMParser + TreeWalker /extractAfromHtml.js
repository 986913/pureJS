// Given a HTML string, write a function to extract the anchor <a/> tag from it.

/* --------------------- 用例测试 ----------------------- */
extract(`
<div>
    <a>link1< / a><a href="https://bfe.dev">link1< / a>
    <div<abbr>bfe</abbr>div>
    <div>
<abbr>bfe</abbr><a href="https://bfe.dev" class="link2"> <abbr>bfe</abbr>   <span class="l">l</span><span  class="i">i</span>   nk2   </a>
    </div>
</div>
`);
/*
    [
      '<a>link1< / a>',
      '<a href="https://bfe.dev">link1< / a>',
      '<a href="https://bfe.dev" class="link2"> <abbr>bfe</abbr>   <span class="l">l</span><span  //class="i">i</span>   nk2   </a>'
    ]
  */

/* -------------------- Code solution1: reg expression -------------------- */
/**
 * @param {string} str
 * @return {string[]}
 */
function extract(str) {
  return str.match(/<a(\s[^>]*)?>.*?<\s*\/\s*a>/g) || [];
}

/* -------------------- Code solution2: DOMParser + TreeWalker: removeCommentsAndSpace变形题 -------------------- */
/**
 * @param {string} str
 * @return {string[]}
 */
function extract(str) {
  let domParser = new DOMParser(); // Create a new DOMParser object
  let doc = domParser.parseFromString(str, 'text/html'); // Parse the input string as HTML

  let walker = document.createTreeWalker(doc, NodeFilter.SHOW_ELEMENT); // Create a TreeWalker object to traverse the parsed HTML
  let curr = walker.currentNode; // Set the current node to the starting node of the TreeWalker
  let res = []; // Initialize an empty array to store the extracted strings

  while (curr) {
    // Iterate as long as there is a current node
    if (curr.nodeName === 'A') res.push(curr.outerHTML); // If the current node is an <a> element, add its outer HTML to the result array
    curr = d.nextNode(); // Move to the next node in the tree traversal
  }

  return res; // Return the array of extracted strings
}

/* -------------------- Code solution3: two pointers -------------------- */
/* Note
 * - Get indexOf start (<a) and end (a>)
 * - Get a slice of the string between these start and end
 */
function extract(str) {
  let i = 0;
  let result = [];
  while (i < str.length) {
    // find the first index of string
    let start = str.indexOf('<a', i); // Start from i

    // anchor tag not found
    if (start === -1) return result;
    // Not sure why +2 ??
    // If not empty string or closing tag '>' increment i + 2
    if (str[start + 2] !== ' ' && str[start + 2] !== '>') {
      i += 2;
    } else {
      let end = str.indexOf('a>', start + 2);
      // Anchor tag not found!
      if (end === -1) return result;
      // Push the string between anchor opening and closing tag
      result.push(str.slice(start, end + 2));
      i = end + 2;
    }
  }

  return result;
}
