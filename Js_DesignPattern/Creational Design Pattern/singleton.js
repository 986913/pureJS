class SingleObj {
  login() {
    //login是实例方法
    console.log('login..');
  }
}

// getInstance是static方法，因为直接挂在了SingleObj上了
SingleObj.getInstance = (function () {
  let instance;
  return function () {
    //通过闭包
    if (!instance) instance = new SingleObj();
    return instance;
  };
})();

/**
 *****************测试****************************************************************
 */
//测试： 注意这里只能使用static函数getInstance,不能new singleObj!
let obj1 = SingleObj.getInstance();
obj1.login();
let obj2 = SingleObj.getInstance();
obj2.login();
console.log(obj1 === obj2); //true  两者必须完全相等才是单例模型

console.log('------------------------------------');
let obj3 = new SingleObj(); //没法控制
obj3.login();
console.log(obj1 === obj3); //false  就不是单例模型了。。

/**------------------example------------------------------------ */
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
}

LoginForm.getInstance = (function () {
  let instance;
  return function () {
    if (!instance) instance = new LoginForm();
    return instance;
  };
})();

//测试：
let login1 = LoginForm.getInstance();
login1.show(); //登陆框显示成功
let login2 = LoginForm.getInstance();
login2.show(); //已经显示
login2.hide(); //登陆框隐藏成功
console.log(login1 === login2); //true
