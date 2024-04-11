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

/* ---------------------------------- Code Solution ---------------------------------------- */
/**
 * @param {hex} string
 * @return {string}
 */

/* 函数接受一个字符串参数hex，表示16进制颜色值，返回一个字符串值表示转换后的 RGBA颜色值 */
const hexToRgba = (hex) => {
  // 检查字符串 hex 是否符合十六进制颜色值的格式（以#开头，后跟十六进制字符），将结果赋值给 validChars 变量
  const validChars = /^#[a-fA-F\d]+$/.test(hex);
  // 检查字符串 hex 的长度是否在 [4, 5, 7, 9] 这个数组中，将结果赋值给 validLength 变量
  const validLength = [4, 5, 7, 9].includes(hex.length);
  // 如果字符串 hex 的长度不在允许的长度范围内或者不符合十六进制颜色值的格式， 就抛出一个错误,提示传入的十六进制颜色值无效
  if (!validLength || !validChars) {
    throw new Error('Invalid HEX');
  }

  // 将传入的十六进制颜色值转换为 RGBA 值的各个分量（红、绿、蓝、透明度），并将它们赋值给变量 r、g、b 和 a
  const [r, g, b, a = 255] = hex
    .toLowerCase()
    .split('')
    .slice(1) // 移除#
    .reduce((acc, cur) => `${acc}${hex.length < 7 ? cur.repeat(2) : cur}`, '') //如果hex长度小于7，则使用 cur.repeat(2)复制当前字符两次,将复制的结果连接到累加器中。否则，将当前字符直接连接到累加器中.  这一步的目的是将每个十六进制字符展开为对应数量的字符，例如将 'ab' 转换为 'aabb'，以便后续处理。
    .match(/(..)/g) // 提取两个连续字符的组合（即每个颜色通道的值）作为数组的元素。
    .map((hex) => parseInt(hex, 16)); // 将每个匹配到的两个字符组合解析为十六进制数，并转换为对应的十进制数值。

  // 返回一个包含转换后的 RGBA 值的字符串，格式为 rgba(红,绿,蓝,透明度)
  return `rgba(${r},${g},${b},${Math.round((a / 255) * 100) / 100})`;
};
