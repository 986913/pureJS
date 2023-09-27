class SimpleEarphones {
  connect() {
    console.log('Use Earphones with Type C phone');
  }
}

class TypeCPhone {
  attach() {
    console.log('Earphones attached to Type C phone');
  }
}

class EarPhoneAdapter extends SimpleEarphones {
  constructor(typeCphone) {
    super();
    this.typeCphone = typeCphone;
  }
  connect() {
    console.log('Using adapter to connect earphones');
    this.typeCphone.attach();
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
/**
 * 通过创建 EarPhoneAdapter 类的实例，你能够将 TypeCPhone 的功能与 SimpleEarphones 接口匹配，
 * 以便在使用 SimpleEarphones 接口的地方调用 TypeCPhone 的方法，从而实现适配器模式的目标。
 */
var typeCphone = new TypeCPhone(); // create adaptee
var adapter = new EarPhoneAdapter(typeCphone); // new 适配器adapter (被适配者adaptee)
adapter.connect(); // Using adapter to connect earphones;  Earphones attached to Type C phone
