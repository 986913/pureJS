// This is a JavaScript Quiz from BFE.dev

class Dev {
  #name;
  constructor(name) {
    this.#name = name;
  }
  get name() {
    return this.#name;
  }
}

const dev = new Dev('BFE');
console.log(dev.name); // "BFE"

const proxyDev = new Proxy(dev, {});
console.log(proxyDev.name); // Error

/**
  This question is same as #80.ProxyI

  Private class members can be created by using a hash # prefix. 
  Private fields are accessible on the class constructor from inside the class declaration itself and is not accessible from the derived Subclass.

  A proxy cannot read private member #name from the dev object.
 */
