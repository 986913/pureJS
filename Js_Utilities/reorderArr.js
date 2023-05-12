/**
 * Suppose we have an array of items - A, and another array of indexes in numbers - B
 *  const A = ['A', 'B', 'C', 'D', 'E', 'F']
 *  const B = [1,   5,   4,   3,   2,   0]
 * You need to reorder A, so that the A[i] is put at index of B[i], which means B is the new index for each item of A.
 * For above example A should be modified inline to following: ['F', 'A', 'E', 'D', 'C', 'B']
 * The input are always valid.
 * 
 * follow-up:
 *    It is fairly easy to do this by using extra O(n) space, could you solve it with O(1) space?
 */

/*-----------------用例测试--------------------*/
const A = ['A', 'B', 'C', 'D', 'E', 'F']
const B = [1,   5,   4,   3,   2,   0]
reorder(A, B) // ['F', 'A', 'E', 'D', 'C', 'B']

/* ---------------------------- Solution 1------------------------------- */
/**
 * @param {any[]} items
 * @param {number[]} newOrder
 * @return {void}
 */
function reorder(items, newOrder) {
  const result = [];
  for(let i=0; i<items.length; i++){//或者循环newOrder，效果一样
    result[newOrder[i]] = items[i]
  }
  items.length=0;
  items.push(...result)// items=[...result]不管用， 因为相当于给item重新赋值了，地址变了。 而用push不会改变数组地址
}

/* ---------------------------- Solution 2------------------------------- */
function sort(items, newOrder) {
  // keep swaping, until all elements are updated
  for (let i = 0; i < newOrder.length; i++) {
    while (newOrder[i] !== i) {
      const to = newOrder[i];
      [newOrder[i], newOrder[to]] = [newOrder[to], newOrder[i]];
      [items[i], items[to]] = [items[to], items[i]]
    }
  }
}
//The key insight is that you have to swap the newOrder array when you swap the items array so that order information is preserved. 
//Notice the inner while loop as well.