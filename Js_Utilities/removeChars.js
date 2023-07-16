/**
 * Given a string contaning only a, b and c, remove all b and ac.
 */

/*-----------------用例测试--------------------*/
removeChars('ab'); // 'a'
removeChars('abc'); // ''
removeChars('cabbaabcca'); // 'caa'

/* ---------------------------- Solution 1: Stack ------------------------------- */
function removeChars(input) {
  const stack = [];
  for (let char of input) {
    if (stack.length && char === 'c' && stack[stack.length - 1] === 'a') {
      stack.pop();
    } else if (char !== 'b') {
      stack.push(char);
    }
  }
  return stack.join('');
}
/**
  At the stack the stack is empty
  
  Char	                     Explanation	                                             Stack
  c	          Any letter other than b should be added to the stack	                    [c]
  a	                         The same as c	                                           [c, a]
  bb	        Any b will not be added. stack still the same	                           [c, a]
  aa	                 a, a will be added to the stack	                             [c, a, a, a]
  b	                    b will not be added	                                         [c, a, a, a]
  cc	        cc will be removed with the last aa at the top of the stack	              [c, a]
  a	                Last a will be added to the stack	                                 [c, a, a]
 */

/* ---------------------------- Solution 2: Recursion ------------------------------- */
function removeChars(input) {
  const helper = (helperInput) => {
    const includesB = helperInput.includes('b');
    const includesAC = helperInput.includes('ac');

    if (!includesB && !includesAC) return helperInput;
    if (includesB) return helper(helperInput.replaceAll('b', ''));
    if (includesAC) return helper(helperInput.replaceAll('ac', ''));
  };

  return helper(input);
}
