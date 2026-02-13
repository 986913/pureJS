/*-----------------用例测试2--------------------*/
formatMoney(123); //  $123.00
formatMoney(0); //  $0.00
formatMoney(12.23); //  $12.23
formatMoney(-12.23); //  -$12.23
formatMoney(123.4123); //  $123.41
formatMoney(100000000); //  $100,000,000.00

/* ----------------------------- Solution  -------------------------------- */
export const formatMoney = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
