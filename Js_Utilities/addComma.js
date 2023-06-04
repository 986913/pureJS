/**
  Given a number, please create a function to add commas as thousand separators. Input are all valid numbers.
 */
/* --------------------- 用例测试 ----------------------- */
addComma(1); // '1'
addComma(1000); // '1,000'
addComma(-12345678); // '-12,345,678'
addComma(12345678.12345); // '12,345,678.12345'

/* ------------------ Code solution 1： use toLocaleString ------------------ */
/**
 * @param {number} num
 * @return {string}
 */
function addComma(num) {
  const numList = String(num).split('.');
  const numF = numList.length > 1 ? `.${numList[1]}` : '';
  return Number(numList[0]).toLocaleString() + numF;
}
/**
👉 知识点： toLocaleString用法
    const number = 1234567.89;
    number.toLocaleString();                  // 使用默认地区选项： 输出：1,234,567.89（根据浏览器的地区设置可能有所不同）
    const germanLocale = 'de-DE'; // 德国地区选项
    number.toLocaleString(germanLocale);      // 输出：1.234.567,89
    const frenchLocale = 'fr-FR'; // 法国地区选项
    number.toLocaleString(frenchLocale    )   // 输出：1 234 567,89（注意空格的使用）
    const options = { style: 'currency', currency: 'USD' }; // 使用货币格式
    number.toLocaleString('en-US', options)   // 输出：$1,234,567.89

    注意，toLocaleString方法的行为取决于执行代码的环境（通常是浏览器或Node.js），以及操作系统的地区设置。
    因此，同一段代码在不同的环境中可能会产生不同的结果。
    此外，还可以使用toLocaleString方法处理日期对象的本地化字符串表示。例如：
      const date = new Date();
      date.toLocaleString() // 输出日期的本地化字符串表示，例如："6/4/2023, 12:34:56 PM"（根据地区和时区的不同可能有所不同）
**/

/* ------------------------ Code solution 2 ----------------------------- */
/**
 * @param {number} num
 * @return {string}
 */
function addComma(num) {
  let [integer, float] = String(num).split('.');
  const fraction = float ? `.${float}` : '';

  for (let i = integer.length - 3; i > 0; i -= 3) {
    integer = integer.slice(0, i) + ',' + integer.slice(i);
  }
  return `${integer}${fraction}`;
}
