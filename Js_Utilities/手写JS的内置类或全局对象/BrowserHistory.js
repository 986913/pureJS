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
    /* 重点: 截断数组。这样做可以确保只保留当前页面及之前的历史记录 
      eg:  [ A, B, C, D, E]  ---visit F--> [ A, B, F ]  
                ↑                                  ↑
    */
    if (this.currIdx !== this.history.length - 1) {
      this.history = this.history.slice(0, this.currIdx + 1); // 因为slice(start, end) 截出来的不包括end
    }

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
    this.pointer = Math.max(0, this.pointer - 1); //  it will increment and return the value *after* 减法
  }

  // go to next visited url
  forward() {
    this.pointer = Math.min(this.history.length - 1, this.pointer + 1); //  it will increment and return the value *after* incrementing
  }
}
