class Employee {
  constructor(hr, name, position, pay) {
    this.hr = hr;
    this.name = name;
    this.position = position;
    this.pay = pay;
  }
}
class Manager extends Employee {
  constructor(hr, name, position, pay) {
    super(hr, name, position, pay);
    this.id = Math.random() * 1000;

    this.hr.registerEmployee(this); // Whenever a manager instance is created, it gets registered into the company by the hr.
  }
  receiveMessage(worker, raise) {
    console.log(`${worker.name} should get ${raise} dollar raise`);
  }
  finalizeRaise(worker, raise) {
    console.log(`${worker.name}'s ${raise} dollar raise is approved`);
    return true;
  }
}
class Worker extends Employee {
  constructor(hr, name, position, pay) {
    super(hr, name, position, pay);
    this.id = Math.random() * 1000;

    this.hr.registerEmployee(this); // Whenever a worker instance is created, it gets registered into the company by the hr.
  }
  receiveRaise(raise) {
    this.pay += raise;
    console.log(`My new pay is ${this.pay} dollars`);
  }
}

// Mediator  class
class HR {
  constructor() {
    this.employees = [];
  }
  registerEmployee(employee) {
    this.employees[employee.id] = employee;
  }
  scheduleRaise(raise, worker, manager) {
    manager.receiveMessage(worker, raise);
    const answer = manager.finalizeRaise(worker, raise);
    if (answer) {
      worker.receiveRaise(raise);
    }
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
var hr = new HR();
var employee = new Worker(hr, 'Joe', 'Developer', 1400);
var manager = new Manager(hr, 'Allen', 'Team Lead', 3000);
hr.scheduleRaise(200, employee, manager);
/**
  "Joe should get 200 dollar raise"    //HR conveying the message to the manager
  "Joe's 200 dollar raise is approved" //manager approving the raise
  "My new pay is 1600 dollars"         //worker announcing the new pay
 */
