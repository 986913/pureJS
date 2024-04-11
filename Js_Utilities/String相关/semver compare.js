/**
  Please implement a function to compare 2 semver strings.
 */

/*-------------------用例测试--------------------*/
compare('12.1.0', '12.0.9'); // 1, meaning first one is greater
compare('12.1.0', '12.1.2'); // -1, meaning latter one is greater
compare('5.0.1', '5.0.1'); // 0, meaning they are equal.
compare('0.1.100', '0.1.99'); // 1, meaning first one is greater

/* ------------------ Code solution ------------------ */
/**
 * @param {string} v1
 * @param {string} v2
 * @returns 0 | 1 | -1
 */

function compare(v1, v2) {
  if (v1 === v2) return 0;

  let arr1 = v1.split('.');
  let arr2 = v2.split('.');
  for (let i = 0; i < arr1.length; i++) {
    if (+arr1[i] > +arr2[i]) return 1;
    if (+arr1[i] < +arr2[i]) return -1;
  }
}
