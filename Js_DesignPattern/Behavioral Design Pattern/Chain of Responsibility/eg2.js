class Employee {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }
}

class EmployeeChain {
  setNextEmp(nextEmpInChain) {}
  assignWork(req) {}
}

class EasyLevelWorkHandler extends EmployeeChain {
  constructor() {
    super();
    this.nextObjInChain = new EmployeeChain();
  }
  setNextEmp(nextObj) {
    this.nextObjInChain = nextObj;
  }
  assignWork(req) {
    if (req.level === 'Easy') {
      console.log(`Easy work assigned to: ${req.name}`);
    } else {
      // the handler passes it to the next object in the chain
      this.nextObjInChain.assignWork(req);
    }
  }
}
class MediumLevelWorkHandler extends EmployeeChain {
  constructor() {
    super();
    this.nextObjInChain = new EmployeeChain();
  }
  setNextEmp(nextObj) {
    this.nextObjInChain = nextObj;
  }
  assignWork(req) {
    if (req.level === 'Medium') {
      console.log(`Medium work assigned to: ${req.name}`);
    } else {
      // the handler passes it to the next object in the chain
      this.nextObjInChain.assignWork(req);
    }
  }
}
class HardLevelWorkHandler extends EmployeeChain {
  constructor() {
    super();
    this.nextObjInChain = new EmployeeChain();
  }
  setNextEmp(nextObj) {
    this.nextObjInChain = nextObj;
  }
  assignWork(req) {
    if (req.level === 'Hard') {
      console.log(`Hard work assigned to: ${req.name}`);
    } else {
      // the handler passes it to the next object in the chain
      this.nextObjInChain.assignWork(req);
    }
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
var w1 = new EasyLevelWorkHandler();
var w2 = new MediumLevelWorkHandler();
var w3 = new HardLevelWorkHandler();
w1.setNextEmp(w2); // set chain
w2.setNextEmp(w3); // set chain

const emp1 = new Employee('Joe', 'Easy');
const emp2 = new Employee('Anne', 'Medium');
const emp3 = new Employee('Shawn', 'Hard');

w1.assignWork(emp1); // "Easy work assigned to: Joe"
w1.assignWork(emp2); // "Medium work assigned to: Anne"
w1.assignWork(emp3); // "Hard work assigned to: Shawn"
