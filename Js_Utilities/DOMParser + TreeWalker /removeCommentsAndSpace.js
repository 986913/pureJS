/**
 * @param {string} htmlStr
 * @return {string}
 */

const removeCommentsAndSpace = (htmlStr) => {
  var domParser = new DOMParser();
  var doc = domParser.parseFromString(htmlStr, 'text/html');

  // 使用原生的TreeWalker进行遍历
  var walker = document.createTreeWalker(doc);
  var nodesToRemove = [];

  // 遍历注释节点和换行文本节点
  while (walker.nextNode()) {
    var node = walker.currentNode;
    if (
      node.nodeType == Node.COMMENT_NODE ||
      (node.nodeType == Node.TEXT_NODE && node.nodeValue.trim() == '')
    ) {
      nodesToRemove.push(node);
    }
  }
  // 节点移除
  nodesToRemove.forEach(function (node) {
    node.parentNode.removeChild(node);
  });

  // 字符串还原
  return doc.body.innerHTML;
};
