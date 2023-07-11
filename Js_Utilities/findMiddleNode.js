/* ---------------- 用例测试 ------------------ */
//list: 5->4->3->2->1
middleNode(list); // 3
//list2: 7->14->10->21
middleNode(list2); // 14

/* -------------------------------- Code solution  -------------------------------------- */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

// https://www.youtube.com/watch?v=-Dveb0lya0g&ab_channel=%E8%80%81%E6%AF%95JS

var middleNode = function (head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
};
