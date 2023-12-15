// This is a JavaScript Quiz from BFE.dev

function func() {
  const a = (b = c = 1);
}
func();
console.log(typeof a, typeof b, typeof c); // "undefined","number","number"

/**
  In javascript, the assignment happens from right to left. 
  So, const statement is only applicable to a, not b and c. 
  All the other variables are considered Global without the var/let/const identifier, hence b and c will be globally scoped.

  To visualize, think of it like
    const a = (b = (c = 1));
    // which effectively becomes
    const a = (window.b = ( window.c = 1))
s
  that's why a is unavailable outside the function block, while b and c are 1; 
  Hence, the output undefined, number, number
 */
