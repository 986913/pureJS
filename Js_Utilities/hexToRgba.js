/**
  Suppose you write some CSS code, you need to set [colors](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). 
  You can choose hexadecimal notation `#fff` or Functional notation `rgba(255,255,255,1)`.

  Can you write a function to convert hexadecimal notation to functional notation?
    1. Alpha channel should have maximum 2 digits after decimal point, round up if needed.
    2. Don't forget to do input validation
 */

/* -------------------用例测试--------------------*/
hexToRgba('#fff'); // "rgba(255,255,255,1)"
hexToRgba('#ffffff'); // "rgba(255,255,255,1)"
hexToRgba('#0001'); // "rgba(0,0,0,0.07)"
hexToRgba('#2345'); // "rgba(34,51,68,0.33)"
hexToRgba('#ff0c2333'); //"rgba(255,12,35,0.2)"
hexToRgba('#ff0c23ff'); //'rgba(255,12,35,1)'
hexToRgba('#ABCDEFAB'); //'rgba(171,205,239,0.67)'
hexToRgba('#1116'); //'rgba(17,17,17,0.4)'
hexToRgba('ag12333'); // should throw error
hexToRgba('#12346'); // should throw error
hexToRgba('[]'); // should throw error

/* -------------------------- Code Solution -------------------------------- */

const validHexColorRegularExpression = /^# [0-9A-Fa-f]$/;
/**
 * @param {hex} string
 * @return {string}
 */
function hexToRgba(hex) {
  // 1. validate
  // 2. normalize to 8 digits
  // 3. transform to number
  // 4. compose the result
}
