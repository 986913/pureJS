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

/* -------------------- Code solution2: DOMParser + TreeWalker -------------------- */
/**
 * @param {string} str
 * @return {string[]}
 */
function extract(str) {
  let a = new DOMParser(); // Create a new DOMParser object
  let c = a.parseFromString(str, 'text/html'); // Parse the input string as HTML
  let d = document.createTreeWalker(c, NodeFilter.SHOW_ELEMENT); // Create a TreeWalker object to traverse the parsed HTML

  let curr = d.currentNode; // Set the current node to the starting node of the TreeWalker
  let res = []; // Initialize an empty array to store the extracted strings

  while (curr) {
    // Iterate as long as there is a current node
    if (curr.nodeName === 'A') res.push(curr.outerHTML); // If the current node is an <a> element, add its outer HTML to the result array
    curr = d.nextNode(); // Move to the next node in the tree traversal
  }

  return res; // Return the array of extracted strings
}
