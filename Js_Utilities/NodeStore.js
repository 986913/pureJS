/**

  We have Map in es6, so we could use any data as key, such as DOM element.
    const map = new Map()
    map.set(domNode, somedata)
  What if we need to support old JavaScript env like es5, how would you create your own Node Store as above?
  You are asked to implement a Node Store, which supports DOM element as key.
    class NodeStore {
      set(node, value) {}
      get(node) {}
      has(node) {}
    }

  note: Map is disabled when judging your code, it is against the goal of practicing.
  You can create a simple general Map polyfill. Or since you are asked to support specially for DOM element, what is special about DOM element?

**/

/* ---------------------- Code solution ------------------------- */
class NodeStore {
  constructor() {
    this.nodes = {};
  }

  /**
   * @param {Node} node
   * @param {any} value
   */
  set(node, value) {
    node.__hahamingKey__ = Symbol();
    this.nodes[node.__hahamingKey__] = value;
  }
  /**
   * @param {Node} node
   * @return {any}
   */
  get(node) {
    return this.nodes[node.__hahamingKey__];
  }

  /**
   * @param {Node} node
   * @return {Boolean}
   */
  has(node) {
    return !!this.nodes[node.__hahamingKey__];
  }
}

/**
这段代码定义了一个名为 NodeStore 的类，用于存储 DOM 节点（Node）对象的键值对，其中键为唯一的 Symbol 类型，值为任意类型的数据。
类中定义了以下方法：
  constructor() 方法：创建一个空对象 this.nodes，用于存储节点和值的映射。
  set(node, value) 方法：将给定节点 node 和值 value 存储在 this.nodes 中。为了避免与其他属性冲突，使用 Symbol 类型的属性作为键。
  get(node) 方法：从 this.nodes 中获取给定节点 node 对应的值。
  has(node) 方法：检查给定节点 node 是否存在于 this.nodes 中，若存在则返回 true，否则返回 false。
通过这个 NodeStore 类，我们可以轻松地为 DOM 节点对象添加自定义属性，同时不会影响到其他部分的代码

.__hahamingKey__ 是一种自定义属性的命名方式，用于为节点对象分配唯一的 Symbol 键，以便在 NodeStore 中使用, 也就是说你可以随意命名。。
**/
