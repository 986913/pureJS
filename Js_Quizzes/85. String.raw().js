/* 
  static `String.raw()` method is a tag function of template literals. 
  Two types of argument can be passed to it
    - String.raw(callSite, ...substitutions)
    - String.raw`templateString`  
*/

/*
  It's used to get the raw string form of template literals, that is, 
  substitutions (e.g. ${foo}) are processed, but escapes (e.g. \n) are not 
*/
console.log(String.raw`BFE\n.${'dev'}`); // BFE\n.dev

/* 
  here it is used in form of `String.raw(callSite, ...substitutions)`
  thus each of substitute arguments will be placed between callSite letters. 
*/
console.log(String.raw({ raw: 'BFE' }, 'd', 'e', 'v')); // BdFeV (we can't place `v` because there is not space available.)
