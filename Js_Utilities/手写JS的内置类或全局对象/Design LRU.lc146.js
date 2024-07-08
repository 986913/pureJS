/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.cache = new Map();
};
/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (!this.cache.has(key)) return -1;

  const value = this.cache.get(key);
  this.cache.delete(key); // <--- 注意先delete
  this.cache.set(key, value);
  return value;
};
/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  this.cache.delete(key); // <--- 注意先delete
  this.cache.set(key, value);

  if (this.cache.size > this.capacity) {
    // js Map实例对象的.keys(), .values(), .entries() 返回的都是generator!!! {done: true or false, value: ....}
    this.cache.delete(this.cache.keys().next().value);
  }
};
