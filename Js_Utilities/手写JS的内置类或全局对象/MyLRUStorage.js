/**
  Chrome uses cache algorithm to evict data when it has to. Watch [this Youtube video](https://youtu.be/NNuTV-gjlZQ?t=387) for detail explanation, starting from 6:25 to 7:38.
  Now you are asked to implement similar - Implement a class `LRUStorage`.
    1. This is of course not to reflect the true implementation in Chrome.
    2. `getData` and `setData` should both be treated as data being 'used'.
    3. considering time precision issue, your class needs to accept `getTimestamp` as second argument of constructor function for our tests.
 */
/*------------------------ 用例测试 --------------------*/
const storage = new MyLRUStorage(10, Date.now());
storage.setData('a', 1);
storage.setData('b', 3);
storage.getData('a');
storage.setData('c', 7);
console.log(storage.getData('a').size);

/* -------------------------- Code Solution: -------------------------------- */
/**
 * @typedef {object} OriginData
 * @property {string} origin
 * @property {number} lastUsed
 * @property {number} size
 * @property {boolean} persistent
 */
class MyLRUStorage {
  /**
   * @param {number} capacity
   * @param {() => number} getTimestamp
   */
  constructor(capacity, getTimestamp) {
    this.cache = new Map();
    this.persistentSet = new Set();
    this.totalSize = 0;
    this.capacity = capacity;
    this.getTimestamp = getTimestamp;
  }

  /**
   * @param {string} origin
   * @returns {OriginData | undefined}
   */
  getData(origin) {
    if (!this.cache.has(origin)) return undefined;

    const size = this.cache.get(origin);
    this.cache.delete(origin);
    this.cache.set(origin, size);
    return size;
  }

  /**
   * @param {string} origin
   * @param {number} size
   * @returns {boolean}
   */
  setData(origin, size) {
    if (size > this.capacity) return false;

    const originSize = this.cache.get(origin);
    if (originSize && originSize.size >= size) {
      this.cache.delete(origin);
      this.totalSize = this.totalSize + size - originSize.size;
      this.cache.set(origin, { size });
      return true;
    }

    const keysToRemoveItr = [...this.cache.keys()]
      .filter((key) => {
        return !this.persistentSet.has(key);
      })
      .values();
    while (this.totalSize + size > this.capacity) {
      const evicted = this.evict(keysToRemoveItr);
      if (!evicted) return false;
    }
    this.cache.set(origin, { size });
    this.totalSize += size;
    return true;
  }

  evict(keysToRemoveItr) {
    const currentKey = keysToRemoveItr.next().value;
    if (!currentKey) return false;

    this.totalSize -= this.cache.get(currentKey).size;
    this.cache.delete(currentKey);
    return true;
  }

  /**
   * @param {string} origin
   * @returns {void}
   */
  clearData(origin) {
    this.persistentSet.delete(origin);
    const size = this.cache.get(origin);
    if (size && size.size) {
      this.totalSize -= size.size;
    }
    this.cache.delete(origin);
  }

  /**
   * @param {string} origin
   * @returns {void}
   */
  makePersistent(origin) {
    this.persistentSet.add(origin);
  }
}
