/**
  localStorage is a simple and handy client-side storage, but you should avoid using it because it is synchronous.
  Also Safari's ITP actually deletes client-side script-writable storage after 7 days of Safari use without interacting on your website, and localStorage is included.
  Unlike Cookie, localStorage doesn't expire.

  In this problem, please create a localStorage wrapper with expiration support
    myLocalStorage.setItem('bfe', 'dev', 1000)
    myLocalStorage.getItem('bfe') // 'dev'
  after 1 second:
    myLocalStorage.getItem('bfe') // null
  
  FYI:
  localStorage is replaced with our own implementation to avoid security error. But the interface is the same, actually you don't need to care :)
 */
/* -------------------用例测试--------------------*/

/* -------------------------- Code Solution ------------------------------- */
window.myLocalStorage = {
  getItem(key) {
    // your code here
  },

  setItem(key, value, maxAge) {
    // your code here
  },

  removeItem(key) {
    // your code here
  },

  clear() {
    // your code here
  },
};
