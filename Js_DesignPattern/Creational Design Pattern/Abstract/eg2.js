// Its purpose is to instantiate an instance of a specific loan constructor, depending on the parameters given.
class Loans {
  constructor() {
    this.loans = null;
  }
  getloan(type, amount, duration) {
    switch (type) {
      case 'home':
        this.loans = new HomeLoan(amount, duration);
        break;
      case 'student':
        this.loans = new StudentLoan(amount, duration);
        break;
      case 'personal':
        this.loans = new PersonalLoan(amount, duration);
        break;
    }
    return this.loans;
  }
}

class HomeLoan {
  constructor(amount, duration) {
    this.amount = amount;
    this.duration = duration;
    this.interest = 0.08;
  }
  calculateInterest() {
    return this.amount * this.interest * this.duration;
  }
}
class StudentLoan {
  constructor(amount, duration) {
    this.amount = amount;
    this.duration = duration;
    this.interest = 0.03;
  }
  calculateInterest() {
    return this.amount * this.interest * this.duration;
  }
}
class PersonalLoan {
  constructor(amount, duration) {
    this.amount = amount;
    this.duration = duration;
    this.interest = 0.05;
  }
  calculateInterest() {
    return this.amount * this.interest * this.duration;
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
var loan = new Loans();

var homeLoan = loan.getloan('home', 3200, 5);
console.log(homeLoan.calculateInterest()); // 1280

var studentLoan = loan.getloan('student', 1800, 4);
console.log(studentLoan.calculateInterest()); // 216

var personalLoan = loan.getloan('personal', 1200, 2);
console.log(personalLoan.calculateInterest()); // 120
