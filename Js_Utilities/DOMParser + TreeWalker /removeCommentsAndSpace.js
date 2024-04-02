/**
 * @param {string} htmlStr
 * @return {string}
 */

const removeCommentsAndSpace = (htmlStr) => {
  var domParser = new DOMParser();
  var doc = domParser.parseFromString(htmlStr, 'text/html');

  // 使用原生的TreeWalker进行遍历
  var treeWalker = document.createTreeWalker(doc);
  var arrNodeRemove = [];
  // 遍历注释节点和换行文本节点
  while (treeWalker.nextNode()) {
    var node = treeWalker.currentNode;
    if (
      node.nodeType == Node.COMMENT_NODE ||
      (node.nodeType == Node.TEXT_NODE && node.nodeValue.trim() == '')
    ) {
      arrNodeRemove.push(node);
    }
  }
  // 节点移除
  arrNodeRemove.forEach(function (node) {
    node.parentNode.removeChild(node);
  });
  // 字符串还原
  return doc.body.innerHTML;
};
