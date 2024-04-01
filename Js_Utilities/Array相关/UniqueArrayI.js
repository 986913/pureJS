/*---------------用例测试-------------------*/
uniqueArray([1, 2, 3]); // [1, 2, 3]
uniqueArray([1, 1, 2]); // [1, 2]
uniqueArray([2, 1, 2]); // [2, 1]

/**
 * @param {Array} array
 * @return {Array}
 */
/* -------- Soltion 1: 🚫 Brute force approach -------------------------------- */
function uniqueArray(array) {
  const result = [];

  array.forEach((item) => {
    if (!result.includes(item)) result.push(item);
  });

  return result;
}

/* -------- Soltion 2: ✅ Using Set to track existing elements ---------------- */
function uniqueArray(array) {
  const result = [];
  const seen = new Set();

  array.forEach((item) => {
    if (!seen.has(item)) {
      result.push(item);
      seen.add(item);
    }
  });

  return result;
}

/* --------Soltion 2: ✅ Converting to Set then back -------------------------- */
function uniqueArray(array) {
  return [...new Set(array)];
}
