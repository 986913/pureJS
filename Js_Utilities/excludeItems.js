/* Given an input of array, which is made of items with >= 3 properties
  let items = [
    { color: 'red', type: 'tv', age: 18 },
    { color: 'silver', type: 'phone', age: 20 },
    { color: 'blue', type: 'book', age: 17 },
  ];
an exclude array made of key value pair:
  const excludes = [
    { k: 'color', v: 'silver' },
    { k: 'type', v: 'tv' },
    // ...
  ];

function excludeItems(items, excludes) {
  excludes.forEach((pair) => {
    items = items.filter((item) => item[pair.k] === item[pair.v]);
  });
  return items;
}

What does this function excludeItems do?
Is this function working as expected ?
What is the time complexity of this function?
How would you optimize it ?

note: we only judge by the result, not the time cost. please submit the best approach you can.
*/
/* ---------------用例测试 ----------------- */
let items = [
  { color: 'red', type: 'tv', age: 18 },
  { color: 'silver', type: 'phone', age: 20 },
  { color: 'blue', type: 'book', age: 17 },
];
const excludes = [
  { k: 'color', v: 'silver' },
  { k: 'type', v: 'tv' },
];
excludeItems(items, excludes); // [ { color: 'blue', type: 'book', age: 17 } ]

/* -------------------------- Solution 1: --------------------------- */
function excludeItems(items, excludes) {
  excludes.forEach((pair) => {
    items = items.filter((item) => item[pair.k] !== pair.v);
  });
  return items;
}

/* -------------------------- Solution 2: use filter + every --------------------------- */
function excludeItems(items, excludes) {
  return items.filter((item) => {
    return excludes.every((pair) => {
      return item[pair.k] !== pair.v;
    });
  });
}

/* -------------------------- Solution 3: use Map --------------------------- */
function excludeItems(items, excludes) {
  const map = new Map(); // Map<k: Set(v)>
  for (let { k, v } of excludes) {
    if (!map.has(k)) {
      map.set(k, new Set());
    }
    map.get(k).add(v);
  }
  // console.log(map); // {"color" => {'silver'} , "type" => {'tv'} }

  return items.filter((item) => {
    for (let key in item) {
      if (map.has(key) && map.get(key).has(item[key])) return false;
    }
    return true;
  });
}

/*
  1. excludeItems loop over every pair of "excludes" array, and filters out those items which have the pair.v corresponding to pair.k
  However, since we are comparing with item[pair.v], since pair.v is supposed to be the value, and not the key, it won't work as intended.

  2. No. If the intended input is given, item[pair.v] is incorrect because it is the value and not the key.
  So, we are looking for the value among the keys.
  Also, the function will INCLUDE those key-value pairs in excludes array, rather than excluding them. 
  So, if this is NOT the intended behavior, then (item[pair.k] !== pair.v) will make it work as intended.

  3. If the size of items array is M and excludes array is N, then:
  time complexity = O(N*M)
  space complexity (considering with garbage collection) = O(M)
*/
