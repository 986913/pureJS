class Adaptee {
  sepecificRequest() {
    return '德国标准插头';
  }
}

class Target {
  constructor() {
    this.adaptee = new Adaptee();
  }
  request() {
    let info = this.adaptee.sepecificRequest();
    return `${info}-转换器-中国标准接头`;
  }
}

//测试：
let target = new Target();
console.log(target.request());
