/* -------------------用例测试--------------------*/
join(
  [
    { id: 1, x: 1 },
    { id: 2, x: 9 },
  ],
  [{ id: 3, x: 5 }]
);
/* 
  [
    {"id": 1, "x": 1},
    {"id": 2, "x": 9},
    {"id": 3, "x": 5}
  ]
*/

join(
  [
    { id: 1, x: 2, y: 3 },
    { id: 2, x: 3, y: 6 },
  ],
  [
    { id: 2, x: 10, y: 20 },
    { id: 3, x: 0, y: 0 },
  ]
);
/* 
[
    {"id": 1, "x": 2, "y": 3},
    {"id": 2, "x": 10, "y": 20},
    {"id": 3, "x": 0, "y": 0}
]
*/

join(
  [{ id: 1, b: { b: 94 }, v: [4, 3], y: 48 }],
  [{ id: 1, b: { c: 84 }, v: [1, 3] }]
);
/* [ {"id": 1, "b": {"c": 84}, "v": [1, 3], "y": 48} ] */

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
/* ----------------------------- Code solution 1: Map ---------------------------------- */
var join = function (arr1, arr2) {
  const merged = new Map();

  const combinedArr = arr1.concat(arr2);
  combinedArr.forEach((obj) => {
    const { id } = obj;
    if (!merged.has(id)) {
      merged.set(id, obj);
    } else {
      merged.set(id, { ...merged.get(id), ...obj }); // 这里就会override
    }
  });

  return [...merged.values()].sort((a, b) => a.id - b.id);
};

/* ----------------------------- Code solution 2: Two pointers ---------------------------------- */
var join = function (arr1, arr2) {
  let result = [];

  arr1.sort((a, b) => a.id - b.id);
  arr2.sort((a, b) => a.id - b.id);

  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    const id1 = arr1[i].id;
    const id2 = arr2[j].id;

    if (id1 < id2) {
      result.push(arr1[i]);
      i++;
    } else if (id1 > id2) {
      result.push(arr2[j]);
      j++;
    } else {
      result.push({ ...arr1[i], ...arr2[j] }); //当id一样时候，在这里override
      i++;
      j++;
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    i++;
  }

  return result;
};
