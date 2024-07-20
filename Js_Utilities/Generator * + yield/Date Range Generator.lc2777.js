/**
 * @param {string} start
 * @param {string} end
 * @param {number} step
 * @yields {string}
 */

/******************************** Solution 1 ************************************/
var dateRangeGenerator = function* (start, end, step) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  while (startDate.getTime() <= endDate.getTime()) {
    const date = String(startDate.getDate()).padStart(2, '0');
    const month = String(startDate.getMonth() + 1).padStart(2, '0');
    const year = String(startDate.getFullYear());

    yield `${year}-${month}-${date}`;

    const next = startDate.getDate() + step;
    startDate.setDate(next); // <--- 主要在这， Date有个实例方法来设置日期.setDate()
  }
};

/******************************** Solution 2 ************************************/
var dateRangeGenerator = function* (start, end, step) {
  let startDate = new Date(start);
  let endDate = new Date(end);

  while (startDate <= endDate) {
    yield startDate.toISOString().split('T')[0]; // <--- 主要在这， Date有个实例方法.toISOString()
    startDate.setDate(startDate.getDate() + step);
  }
};

/**
 * const g = dateRangeGenerator('2023-04-01', '2023-04-04', 1);
 * g.next().value; // '2023-04-01'
 * g.next().value; // '2023-04-02'
 * g.next().value; // '2023-04-03'
 * g.next().value; // '2023-04-04'
 * g.next().done; // true
 */
