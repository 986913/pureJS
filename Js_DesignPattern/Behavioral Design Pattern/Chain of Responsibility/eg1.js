class Multiple {
  constructor(multiple) {
    this.multiple = multiple;
  }
  getMultiple() {
    return this.multiple;
  }
}

class HandlerChain {
  setNextObj(nextObjInChain) {}
  processMultiple(req) {
    console.log('No multiple for: ' + req.getMultiple()); // defaut processMultiple implementation
  }
}

class MultipleofTwoHandler extends HandlerChain {
  constructor() {
    super();
    this.nextObjInChain = new HandlerChain();
  }
  setNextObj(nextObj) {
    this.nextObjInChain = nextObj;
  }
  processMultiple(req) {
    if (req.getMultiple() % 2 == 0) {
      console.log('Multiple of 2: ' + req.getMultiple());
    } else {
      // the handler passes it to the next object in the chain
      this.nextObjInChain.processMultiple(req);
    }
  }
}
class MultipleofThreeHandler extends HandlerChain {
  constructor() {
    super();
    this.nextObjInChain = new HandlerChain();
  }
  setNextObj(nextObj) {
    this.nextObjInChain = nextObj;
  }
  processMultiple(req) {
    if (req.getMultiple() % 3 == 0) {
      console.log('Multiple of 3: ' + req.getMultiple());
    } else {
      // the handler passes it to the next object in the chain
      this.nextObjInChain.processMultiple(req);
    }
  }
}
class MultipleofFiveHandler extends HandlerChain {
  constructor() {
    super();
    this.nextObjInChain = new HandlerChain();
  }
  setNextObj(nextObj) {
    this.nextObjInChain = nextObj;
  }
  processMultiple(req) {
    if (req.getMultiple() % 5 == 0) {
      console.log('Multiple of 5: ' + req.getMultiple());
    } else {
      // the handler passes it to the next object in the chain
      this.nextObjInChain.processMultiple(req);
    }
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
// We want to give a number and let the handlers in the chain decide if they’re going to process it or pass it to the next.

//configuring the chain of handler objects
var c1 = new MultipleofTwoHandler();
var c2 = new MultipleofThreeHandler();
var c3 = new MultipleofFiveHandler();
c1.setNextObj(c2); // set chain
c2.setNextObj(c3); // set chain

//the chain handling different cases
c1.processMultiple(new Multiple(95)); // Multiple of 5: 95
c1.processMultiple(new Multiple(50)); // Multiple of 2: 50
c1.processMultiple(new Multiple(9)); // Multiple of 3: 9
c1.processMultiple(new Multiple(4)); // Multiple of 2: 4
c1.processMultiple(new Multiple(21)); // Multiple of 3: 21
c1.processMultiple(new Multiple(23)); // No multiple for: 23
