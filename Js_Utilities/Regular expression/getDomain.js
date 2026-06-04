/**
  Get domain name
  
  In this coding challenge, you will implement a function called getDomain(url), 
  which takes a string url as input. The function should return the domain name.

  Directions
    The function should be able to handle URLs starting with both http and https protocols.
    For simplicity, you may assume that all URLs will include www and will always be ending with a forward slash /.
 */

/*---------------------------- 用例测试 ----------------------------*/
getDomain('https://www.google.com/'); // Output: 'google.com'
getDomain('https://www.facebook.com/reacterry/'); // Output: 'facebook.com'
getDomain('http://www.reddit.com/user/reacterry/'); // Output: 'reddit.com'
getDomain('http://www.reddit.co.uk/user/reacterry/'); // Output: 'reddit.co.uk'
getDomain('http://www.reddit.info/user/reacterry/'); // Output: 'reddit.info'
getDomain('https://www.example.com/'); // Output: 'example.com'

/***************************** Solution 1- 数组操作 ********************************/
// time O(n), space O(1)
export const getDomain = (url) => {
  const protocolRemoved = url.slice(url.indexOf('://') + 3);

  const wwwRemoved = protocolRemoved.startsWith('www.')
    ? protocolRemoved.slice(4)
    : protocolRemoved;

  const domain = wwwRemoved.slice(0, wwwRemoved.indexOf('/'));

  return domain;
};

/***************************** Solution 2 - 正则 ********************************/
const getDomain = (url) => {
  // 正则末尾不需要加 /g，因为我们只需要匹配一次完整的域名结构
  const regex = /https?:\/\/(?:www\.)?([^\/]+)/;
  const match = url.match(regex);

  // match[1] 拿到的就是上面捕获组 () 里的纯域名
  return match ? match[1] : null;
};
/**
 * 拆解这个正则表达式：/https?:\/\/(?:www\.)?([^\/]+)/
 * * * http      : 精准匹配固定的四个字母 "http"。
 * * * s?        : 字母 "s" 后面加问号，表示字母 s “可有可无”（出现 0 次或 1 次）。
 * 👉 【解决规则】：兼容 "http://" 和 "https://" 两种协议。
 * * * :\/       : 精准匹配冒号和一个斜杠 ":/"。由于斜杠在正则中是定界符，
 * 这里的 \/ 进行了转义，代表真正的斜杠字符。
 * * * (?:www\.)?: 圆括号 () 表示分组，? 在括号外表示整个“www.”结构可有可无。
 * 括号内的 ?: 是“非捕获组”，意思是把它当整体看，但不要单独提取它。
 * 👉 【解决规则】：兼容带 www 的域名（如 www.google.com）和不带 www 的干净域名。
 * * * (         : 【核心捕获组开始】。这个左括号代表我们要开始“装口袋”了，
 * 括号里匹配到的内容，会被 match[1] 单独提取出来。
 * * * [^\/]+    : 中括号里的 ^ 表示“非/排除”。[^\/] 表示“只要不是斜杠(/)的任意字符”。
 * 后面的 + 表示“至少得有一个（1次或多次）”。
 * 👉 【解决规则】：从 www. 后面开始往后抓取字符，直到遇到下一个斜杠（即路径的开始）就立刻停住。
 * 这样就能完美把 "google.com"、"reddit.co.uk" 或 "reddit.info" 整个揪出来！
 * * * )         : 【核心捕获组结束】。
 */
