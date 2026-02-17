/**
Check password strength
Write a function checkPasswordStrength(password), which takes a string password as input and returns a string indicating the strength of the password: 'weak', 'medium', or 'strong'.

Directions
A weak password - is less than 8 characters long
A medium password -is at least 8 characters long, but contains no uppercase letters or no lowercase letters
A strong password - is at least 8 characters long, contains at least one uppercase letter and at least one lowercase letter
 */

/* --------------------- 用例测试 ----------------------- */
checkPasswordStrength('madam'); // weak
checkPasswordStrength('a'); // weak
checkPasswordStrength('abcdefgh'); // weak
checkPasswordStrength('abcdefgH'); // medium
checkPasswordStrength('password123'); // medium
checkPasswordStrength('123sacd'); // medium
checkPasswordStrength('ABCDEFGH'); // weak
checkPasswordStrength('12345678'); // weak
checkPasswordStrength('1@3$567'); // medium
checkPasswordStrength('ssword'); // weak
checkPasswordStrength('My$tr0ngP@ssword'); // strong

/* --------------------- 代码实现 ----------------------- */
export const checkPasswordStrength = (password) => {
  let strength = 0;

  if (password.length < 6) return 'weak';
  if (password.match(/[a-z]+/)) strength += 1;
  if (password.match(/[A-Z]+/)) strength += 1;
  if (password.match(/[0-9]+/)) strength += 1;
  if (password.match(/[^a-zA-Z0-9]+/)) strength += 1;

  if (strength < 2) {
    return 'weak';
  } else if (strength === 2) {
    return 'medium';
  } else {
    return 'strong';
  }
};
