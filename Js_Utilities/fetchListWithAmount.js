/**
  Have you ever met some APIs with pagination, and needed to recursively fetch them based on response of previous request ?
  
  Suppose we have a `/list` API, which returns an array `items`:
    const fetchList = (since?: number) => Promise<{items: Array<{id: number}>}> // fetchList is provided for you
  1. for initial request, we just fetch `fetchList`. and get the last item id from response.
  2. for next page, we need to call `fetchList(lastItemId)`.
  3. repeat above process.
  The `/list` API only gives us 5 items at a time, with server-side filtering, it might be less than 5. 
  But if none returned, it means nothing to fetch any more and we should stop.

  You are asked to create a function that could return arbitrary amount of items:
    const fetchListWithAmount = (amount: number = 5) { }

  note: You can achieve this by regular loop, 
        even fancier solutions with [async iterators or async generators](https://javascript.info/async-iterators-generator). 
        You should try them all.
 */

/*----------------------- Solution 1: 👍 async/await loop --------------------------- */
/* fetchList is provided for you: 
    const fetchList = (since?: number) => Promise<{items: Array<{id: number}>}>
*/
async function fetchListWithAmount(amount = 5) {
  let cursor;
  const result = [];

  while (result.length < amount) {
    const { items } = await fetchList(cursor);
    if (items.length > 0) {
      result.push(...items);
      cursor = items[items.length - 1].id;
    } else {
      break;
    }
  }
  return result.slice(0, amount);
}
/*----------------------- Solution 2: async iterator --------------------------- */
/* fetchList is provided for you: 
    const fetchList = (since?: number) => Promise<{items: Array<{id: number}>}>
*/
async function fetchListWithAmount(amount = 5) {
  const result = [];

  for await (const nextItems of fetchListIterator()) {
    result.push(...nextItems);
  }
  return result.slice(0, amount);

  function fetchListIterator() {
    let totalAmountFetched = 0;
    let cursor;

    return {
      [Symbol.asyncIterator]() {
        return {
          async next() {
            const { items } = await fetchList(cursor);
            // If API is exhausted OR we reached desired amount -> stop
            if (items.length === 0 || totalAmountFetched > amount) {
              return { done: true };
            }

            totalAmountFetched += items.length;
            cursor = items[items.length - 1].id;

            return {
              done: false,
              value: items,
            };
          },
        };
      },
    };
  }
}
/*----------------------- Solution 3: async generator --------------------------- */
/* fetchList is provided for you: 
    const fetchList = (since?: number) => Promise<{items: Array<{id: number}>}>
*/
async function fetchListWithAmount(amount = 5) {
  const result = [];

  for await (const nextItems of fetchListGenerator()) {
    result.push(...nextItems);
  }
  return result.slice(0, amount);

  async function* fetchListGenerator() {
    let totalAmountFetched = 0;
    let cursor;

    while (totalAmountFetched < amount) {
      const { items } = await fetchList(cursor);
      if (items.length === 0) break;
      cursor = items[items.length - 1].id;
      totalAmountFetched += items.length;
      yield items;
    }
  }
}
/*----------------------- Solution 4: 👍 recursion and Promise --------------------------- */
/* fetchList is provided for you: 
    const fetchList = (since?: number) => Promise<{items: Array<{id: number}>}>
*/
function fetchListWithAmount(amount = 5) {
  return new Promise((resolve) => {
    const result = [];
    getItems();

    function getItems(cursor) {
      fetchList(cursor).then(({ items }) => {
        result.push(...items);
        if (items.length === 0 || items.length >= amount) {
          return resolve(result.slice(0, amount));
        }

        getItems(items[items.length - 1].id);
      });
    }
  });
}
