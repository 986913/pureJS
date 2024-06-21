/**
 * @return {string}
 */
Date.prototype.nextDay = function () {
  const curDate = new Date(this.getTime());
  curDate.setDate(curDate.getDate() + 1); // Increment the day of the currentDate by setting the next day by using setDate.

  const year = curDate.getFullYear();
  const month = String(curDate.getMonth() + 1).padStart(2, '0'); // padStart(targetLength, padString)
  const day = String(curDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * const date = new Date("2014-06-20");
 * date.nextDay(); // "2014-06-21"

 * const date = new Date("2014-06-30");
 * date.nextDay(); // "2014-07-01"
 */
