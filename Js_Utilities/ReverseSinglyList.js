/*-------------------------- Solution 1:  3个指针，4步走 ---------------------------- */
var reverseList = function (head) {
  if (!head || !head.next) return head;

  let curr = head;
  let prev = null;
  let next = null; //next就是临时指针

  while (curr) {
    next = curr.next; //1.用这个next临时指针存current.next值
    curr.next = prev; //2.实际改变curr指向
    prev = curr; //3. 改变指向后，移动prev
    curr = next; //4. 改变指向后，移动curr
  }
  return prev; //返回翻转后指针head
};

/*-------------------------- Solution 2: Recurrsion ---------------------------- */
// helper第1个参数相当于上面双指针法的prev, 第2个参数相当于上面双指针法的curr
var helper = function (pre, head) {
  if (!head) return pre;

  const temp = head.next; //1.用这个temp临时指针存current.next值
  head.next = pre; //2.实际改变curr指针指向
  pre = head; //3. 改变指向后，移动prev
  return helper(pre, temp); //4. 改变指向后，移动curr
};

var reverseList = function (head) {
  return helper(null, head); // helper第1个参数相当于上面双指针法的prev (初始为null), 第2个参数相当于上面双指针法的curr(初始值为head)
};
