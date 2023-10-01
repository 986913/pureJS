class GetCapital {
  getMycapital(country) {
    if (country === 'Pakistan') return 'Islamabad';
    else if (country === 'India') return 'New Delhi';
    else if (country === 'Canada') return 'Ottawa';
    else if (country === 'Egypt') return 'Cairo';
    else return '';
  }
}
// To reduce the redundant requests received by the GetCapital object, the ProxyGetCapital class is defined.
class ProxyGetCapital {
  constructor() {
    this.capital = new GetCapital();
    this.cache = {};
  }
  getMycapital(country) {
    if (!this.cache[country]) {
      var value = this.capital.getMycapital(country);
      this.cache[country] = value;
      return `${value}--Returning From GetCapital`;
    } else {
      return `${this.cache[country]}--Returning from Cache`;
    }
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
var capital = new ProxyGetCapital();
console.log(capital.getMycapital('Pakistan')); // Islamabad--Returning From GetCapital
console.log(capital.getMycapital('India')); // New Delhi--Returning From GetCapital
console.log(capital.getMycapital('Canada')); // Ottawa--Returning From GetCapital
console.log(capital.getMycapital('Egypt')); // Cairo--Returning From GetCapital
console.log(capital.getMycapital('Egypt')); // Cairo--Returning from Cache
console.log(capital.getMycapital('Egypt')); // Cairo--Returning from Cache
console.log(capital.getMycapital('Pakistan')); // Islamabad--Returning from Cache
console.log(capital.getMycapital('Pakistan')); // Islamabad--Returning from Cache
console.log(capital.getMycapital('Canada')); // Ottawa--Returning from Cache
