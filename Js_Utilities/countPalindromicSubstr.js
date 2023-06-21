/**
  A palindromic string reads the same backward as forward, such as `'madam'`.  
  Now given a string, count how many substrings it has?
 */

/* --------------------- 用例测试 ----------------------- */
countPalindromicSubstr('madam'); // 7 --> 解释：'m','a','d','a','m','ada','madam'
countPalindromicSubstr('a'); // 1 --> 解释：'a'
countPalindromicSubstr('ab'); // 2 --> 解释：'a','b'
countPalindromicSubstr('aaa'); // 6 --> 解释：'a','a','a','aa','aaa','aa'
countPalindromicSubstr('aba'); // 4 --> 解释：'a','b','a','aba'
countPalindromicSubstr('abac'); // 5 --> 解释：'a','b','a','c','aba'

/* ------------------------ 👍 Solution 1: DP - lc5🟡变形题 ------------------------------------------- */
/*
  1. 确定dp数组以及下标的含义: dp数组是要定义成一位二维dp数组:
      布尔类型的dp[i][j]：表示区间范围[i,j]（注意是左闭右闭）的子串是否是回文子串，如果是dp[i][j]为true，否则为false。
      
  2. 确定递推公式: 整体上是两种情况，就是s[i]与s[j]相等，s[i]与s[j]不相等这两种。
      当s[i]与s[j]不相等，那没啥好说的了，dp[i][j]一定是false。
      当s[i]与s[j]相等时，这就复杂一些了，有如下三种情况:
        情况一：下标i 与 j相同，同一个字符例如a，当然是回文子串
        情况二：下标i 与 j相差为1，例如aa，也是回文子串
        情况三：下标i 与 j相差大于1的时候，例如cabac，此时s[i]与s[j]已经相同了，我们看i到j区间是不是回文子串就看aba是不是回文就可以了，那么aba的区间就是 i+1 与 j-1区间，这个区间是不是回文就看dp[i + 1][j - 1]是否为true。
      -------------------------------------------------
      if (s[i] == s[j]) {
        if (j - i <= 1 || dp[i + 1][j - 1] ) { // 情况一, 情况二 和 情况三
            count++;
            dp[i][j] = true;
        } 
      }

  3. dp数组如何初始化: let dp = Array(len).fill(false).map((x) => Array(len).fill(false));
  4. 确定遍历顺序: 从底往上，从左往右
  5. 举例推导dp数组: 
*/
const countPalindromicSubstr = (s) => {
  const len = s.length;
  let dp = Array(len)
    .fill(false)
    .map((x) => Array(len).fill(false));

  let count = 0;
  for (let j = 0; j < len; j++) {
    for (let i = 0; i <= j; i++) {
      if (s[i] === s[j]) {
        // 情况一,情况二和情况三
        if (j - i <= 1 || dp[i + 1][j - 1]) {
          count++;
          dp[i][j] = true;
        }
      }
    }
  }

  return count;
};

/* ------------------------ 👍 Solution 2: two pointers - lc5🟡变形题  ------------------------------- */
/*
  首先确定回文串，就是找中心然后向两边扩散看是不是对称的就可以了。
  在遍历中心点的时候，要注意中心点有两种情况: 一个元素可以作为中心点，两个元素也可以作为中心点。
  这两种情况可以放在一起计算，但分别计算思路更清晰，我倾向于分别计算:
 */

// main function:
const countPalindromicSubstr = (s) => {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    let count1 = countPalindrome(s, i, i); //寻找长度为奇数的回文字串(以i为中心)
    let count2 = countPalindrome(s, i, i + 1); //寻找长度为偶数的回文字串(以i和i+1为中心)
    count = count + count1 + count2;
  }
  return count;
};

/*
  helper function: 寻找(以str[left]为中心)或者(以str[left]和str[right]为中心)的回文串个数: 
    - 从str[left]开始向两端扩散，返回以str[left]为中心的回文串个数
    - 从str[left]和str[right]开始向两端扩散，返回以str[left]和str[right]为中心的回文串个数
*/
const countPalindrome = (str, left, right) => {
  let palindromeCount = 0;
  //防止索引越界
  while (left >= 0 && right < str.length && str[left] === str[right]) {
    palindromeCount++;
    left--;
    right++;
  }
  return palindromeCount;
};
