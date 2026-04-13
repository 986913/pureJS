/**
Palindrome checker
Write a function isPalindrome(str) that takes a string str and returns true if the string is a palindrome and false otherwise.

A palindrome is a word, phrase, number, or another sequence of characters that reads the same forward and backwards. For example, "racecar" is a palindrome because it reads the same way forwards and backwards.

Your implementation should not be case-sensitive, meaning that "Racecar" and "rACeCaR" should both be considered palindromes.

Directions
If the input string is empty then return true.
Your implementation should be case-insensitive.
The input string will not contain any whitespace.
You can assume that the input str will contain only letters.
 */

/*-----------------用例测试--------------------*/
isPalindrome('racecar'); // Output: true
isPalindrome('hello'); // Output: false
isPalindrome('Aa'); // Output: true

/* ------------------------ Solution : two pointers  ------------------------------- */
const isPalindrome = (str) => {
  str = str.toLowerCase();
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
};
