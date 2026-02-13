/**
Format Money
  Write a function called formatMoney(amount), which takes in a floating-point number amount as input and returns a string representation of the number formatted as currency.
  The output string should have the dollar sign "$" and should have two decimal places, even if the input number has fewer decimal places. 
  The output string should also include commas to separate thousands, millions, billions, and so on.

  Directions
  The input amount can be negative.
 */

/*-----------------用例测试--------------------*/
formatMoney1(123); //  $123.00
formatMoney1(0); //  $0.00
formatMoney1(12.23); //  $12.23
formatMoney1(-12.23); //  $-12.23
formatMoney1(123.4123); //  $123.41
formatMoney1(100000000); //  $100,000,000.00

/* ----------------------------- Solution  -------------------------------- */
/**
 * @param {number} amount
 * @return {string}
 * 时空复杂度都是 O(1)
 */
export const formatMoney1 = (amount) => {
  return `$${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
