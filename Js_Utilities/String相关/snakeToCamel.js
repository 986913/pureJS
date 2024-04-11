/* -------------------用例测试--------------------- */
snakeToCamel('snake_case'); // 'snakeCase'
snakeToCamel('is_flag_on'); // 'isFlagOn'
snakeToCamel('is_IOS_or_Android'); // 'isIOSOrAndroid'
snakeToCamel('_first_underscore'); // '_firstUnderscore'
snakeToCamel('last_underscore_'); // 'lastUnderscore_'
snakeToCamel('_double__underscore_'); // '_double__underscore_'

/* ------------------------------------ Solution  -------------------------------------------- */
/**
 * @param {string} str
 * @return {string}
 */

function snakeToCamel(str) {
  return str.replace(
    /([^_])_([^_])/g, //对于"hello_world", /([^_])_([^_])/g --> 会匹配到o_w
    (_, before, after) => before + after.toUpperCase() // o_w 变成 oW
  );
}
