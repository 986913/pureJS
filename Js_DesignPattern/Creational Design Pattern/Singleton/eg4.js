class LoginForm {
  constructor() {
    this.state = 'hide';
  }

  show() {
    if (this.state === 'show') {
      console.log('已经显示');
      return;
    }
    this.state = 'show';
    console.log('登陆框显示成功');
  }

  hide() {
    if (this.state === 'hide') {
      console.log('已经隐藏');
      return;
    }
    this.state = 'hide';
    console.log('登陆框隐藏成功');
  }

  static getInstance = (function () {
    let instance;
    return function () {
      if (!instance) instance = new LoginForm();
      return instance;
    };
  })();
}

/** --------------------------- 用例测试 ------------------------------- **/
let login1 = LoginForm.getInstance();
login1.show(); //登陆框显示成功
let login2 = LoginForm.getInstance();
login2.show(); //已经显示
login2.hide(); //登陆框隐藏成功
console.log(login1 === login2); //true
