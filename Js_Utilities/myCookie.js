/**
  We can get and set cookie by document.cookie.
    document.cookie = 'bfe=dev' // "bfe=dev"
    document.cookie = 'bfe1=dev1' // "bfe1=dev1"
    document.cookie // "bfe=dev; bfe1=dev1"
  
  Please create your own myCookie.
  1. it should support get and set.
        document.myCookie = 'bfe=dev' // "bfe=dev"
        document.myCookie = 'bfe1=dev1' // "bfe1=dev1"
        document.myCookie // "bfe=dev; bfe1=dev1"
  2. there a few options to cookie, but in this problem, you only need to support max-age which means the cookie should be deleted after certain time(in seconds).
        document.myCookie = 'bfe=dev; max-age=1' // "bfe=dev; max-age=1"
        document.myCookie // "bfe=dev"
        after 1 second
        document.myCookie // ""
  
  in your code, please enable myCookie in install() and remove the logic in uninstall(), these are used in judging.
 */
/* -------------------用例测试--------------------*/

/* -------------------------- Code Solution ------------------------------- */
// enable myCookie
function install() {
  // your code here
}

// disable myCookie
function uninstall() {
  // your code here
}
