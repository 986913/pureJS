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

/* -------------------------- Code Solution ------------------------------- */
window.myLocalStorage = {
  getItem(key) {
    return window.localStorage.getItem(key);
  },

  setItem(key, value, maxAge) {
    window.localStorage.setItem(key, value);

    if (maxAge === 0) {
      window.localStorage.removeItem(key);
    } else if (maxAge > 0) {
      setTimeout(() => {
        window.localStorage.removeItem(key);
      }, maxAge);
    }
  },

  removeItem(key) {
    window.localStorage.removeItem(key);
  },

  clear() {
    window.localStorage.clear();
  },
};

/**
  window.localStorage API的基本使用：
    1. window.localStorage.getItem('key'); 从本地存储中获取数据:
    2. window.localStorage.setItem('key', 'value'); 存储数据到本地存储:
    3. window.localStorage.removeItem('key');
    4. window.localStorage.clear();

  需要注意的是，localStorage 只能存储字符串类型的数据。
  如果要存储其他类型的数据，可以使用 JSON.stringify() 方法将其转换为字符串，再使用 JSON.parse() 方法将其转换回原始类型。
 */
