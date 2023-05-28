/**
I believe you are very familiar about your browser you are currently visiting website with.
The common actions relating to history are:
  1. `new BrowserHistory()` - when you open a new tab, it is set with an empty history
  2. `goBack()` - go to last entry, notice the entries are kept so that `forward()` could get us back
  3. `forward()` - go to next visited entry
  4. `visit()` - when you enter a new address or click a link, this adds a new entry but truncate the entries which we could `forward()` to.
Say we start a new tab, this is the empty history： [ ]
Then visit url A, B, C in turn： 
  [ A, B, C]
          ↑
We are currently at C, we could goBack() to B, then to A
  [ A, B, C]
    ↑
forward() get us to B
  [ A, B, C]
       ↑
Now if we visit a new url D, since we are currently at B, C is truncated.
  [ A, B, D]
          ↑
You are asked to implement a BrowserHistory class to mimic the behavior.
 */

/* --------------------- 用例测试 ----------------------- */
const bh = new BrowserHistory();
bh.visit('A');
bh.visit('B');
bh.visit('C');
bh.goBack();
bh.current; // B
bh.visit('D');
bh.current; // D
bh.forward();
bh.current; // D

/* ------------------ Code solution ------------------ */
class BrowserHistory {
  /**
   * @param {string} url
   * if url is set, it means new tab with url
   * otherwise, it is empty new tab
   */
  constructor(url) {
    this.history = [url || undefined];
    this.pointer = 0;
  }
  /**
   * @param { string } url
   */
  visit(url) {
    this.history.length = this.pointer + 1; //重点： truncated here, 确保history lenth与指针位置一致,维护正确的历史记录状态。
    this.history.push(url);
    this.pointer++;
  }

  /**
   * @return {string} current url
   */
  get current() {
    return this.history[this.pointer];
  }

  // go to previous entry
  goBack() {
    this.pointer = Math.max(0, --this.pointer); //  it will increment and return the value *after* 减法
  }

  // go to next visited url
  forward() {
    this.pointer = Math.min(this.history.length - 1, ++this.pointer); //  it will increment and return the value *after* incrementing
  }
}
