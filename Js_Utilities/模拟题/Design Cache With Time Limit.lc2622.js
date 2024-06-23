var TimeLimitedCache = function () {
  this.cache = new Map();
};
/*
  this.cache structure look like this:
    { 
      "key1": { value:42, duration: 200, expiredAt: timestamp }
      "key2": { value:20, duration: 100, expiredAt: timestamp }  
    } 
*/

/**
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
  if (this.cache.has(key)) {
    // overwritten if the key already exists:
    this.cache.set(key, {
      value,
      duration,
      expiredAt: Date.now() + duration,
    });
    return true;
  }

  // set key and its value when not exist in cache
  this.cache.set(key, {
    value,
    duration,
    expiredAt: Date.now() + duration,
  });
  return false;
};

/**
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
  // no key found
  if (!this.cache.has(key)) return -1;

  // found key, but expired.
  if (this.cache.has(key) && this.cache.get(key).expiredAt < Date.now())
    return -1;

  // found key and np expired.
  return this.cache.get(key).value;
};

/**
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
  let count = 0;
  this.cache.forEach((val, key) => {
    if (Date.now() < val.expiredAt) count += 1;
  });
  return count;
};

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */
