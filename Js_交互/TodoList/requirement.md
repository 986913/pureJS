You're given some existing HTML for a Todo List app. Add the following functionality to the app:1. Add new tasks on clicking the "Submit" button.The field should be cleared upon successful addition.2. Remove tasks from the Todo List upon clicking the "Delete" button.

### 解题思路：

就是基本的 todolist in pure JS. 值得注意的是：

1. removeChild api 的使用

2.使用 event delegation 可以提升性能（这个题目中把 delete 的操作 delegate 到了他的顶层 container 上了）

3.面试时候可以考虑 accessbility 相关的加分点
