// the Subject class that stores the list of all observers, and notifies them when a new article gets posted on the website.
class Subject {
  constructor() {
    this.observerList = [];
    this.newArticlePosted = false;
    this.articleName = null;
  }
  // register an observer from the subscription.
  subscribe(observer) {
    this.observerList.push(observer);
  }
  // remove an observer from the subscription.
  unsubscribe(observer) {
    this.observerList = this.observerList.filter((obs) => obs !== observer);
  }
  // How is the new article posted:
  postNewArticle(articleName) {
    this.articleName = articleName;
    this.newArticlePosted = true;
    this.notify();
  }
  /* When a new article is posted, its name is set, the variable newArticlePosted is set to true, 
    and the observer is notified about it by invoking the notify function */
  notify() {
    if (this.newArticlePosted)
      this.observerList.forEach((observer) => observer.update());
    // key point:each observer has thier own "update" implemention
    else return;
  }
  // returns the name of the new article posted
  getUpdate() {
    return this.articleName;
  }
}

//The Observer constructor initiates an instance of Subject and sets it using setSubject.
class Observer {
  constructor() {
    this.subject = new Subject();
  }
  setSubject(subject) {
    this.subject = subject;
  }
  // key point:
  update() {
    if (subject.getUpdate() == null) console.log('No new article');
    else console.log(`The new article ${subject.getUpdate()} is posted`);
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
var subject = new Subject();
var observer1 = new Observer();
var observer2 = new Observer();

observer1.setSubject(subject); // set Subject to each observer
observer2.setSubject(subject); // set Subject to each observer
subject.subscribe(observer1);
subject.subscribe(observer2);

// observer1.update(); // No new article
// observer2.update(); // No new article

subject.postNewArticle('Dark matter'); // The new article Dark matter is posted (log这条消息了2遍)
