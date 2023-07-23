/**
  Have you ever added i18n support to your projects?
  Take i18next as an example, generally the keys and translations are kept separately, like this JSON below.
    {
      "evaluation": "BFE.dev is {{evaluation}}"
    }
  At places where this key is used, we can then interpolate the string by passing a data object.
    t('evaluation', {evaluation: 'fantastic'}); // "BFE.dev is fantastic"
  
  Now, please create a similar t() function which accepts the translation directly.
    1. it supports {{ and }} as delimiters
        Let's make it clearer and simpler, when a new pair {{ is met, characters until the following }} are treated as the property name.
        For all the other cases, they should not be treated as delimiters.
          t('BFE.dev is {{{evaluation}', {evaluation: 'fantastic'}); // "BFE.dev is {{{evaluation}"
          t('BFE.dev is {{{evaluation}}}', {'{evaluation': 'fantastic'}); // "BFE.dev is fantastic}"
          t('BFE.dev is {{evalu ation}}', {'evalu ation': 'fantastic'}); // "BFE.dev is fantastic"
    2. if no data is passed or no property exists, just leave it empty
        t('BFE.dev is {{evaluation}}'); // "BFE.dev is "
 */

/* -------------------------- Code Solution: -------------------------------- */
/**
 * @param {string} translation
 * @param {any} data
 * @returns {string}
 */
function t(translation, data = {}) {
  let str = translation;

  while (str.includes('{{') && str.includes('}}')) {
    const bracketStartIdx = str.indexOf('{{');
    const bracketEndIdx = str.indexOf('}}', bracketStartIdx); //indexOf方法还可以接受一个可选的第二个参数，用于指定搜索的起始位置。这意味着在指定位置之后的数组元素会被搜索，而在指定位置之前的元素将被忽略。

    const word = str.slice(bracketStartIdx + 2, bracketEndIdx);
    const replaced = data[word] || '';
    str = str.replace(`{{${word}}}`, replaced);
  }

  return str;
}
