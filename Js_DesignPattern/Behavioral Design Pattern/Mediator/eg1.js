class User {
  constructor(name, userId) {
    this.name = name;
    this.userId = userId;
    this.chatbox = null; // the chatbox instance the user is sending/receiving messages from
  }
  sendMessage(message, sendTo) {
    // The chatbox acts as the mediator, invokes its send function to send the message from the user (this) to the recipient specified (sendTo).
    this.chatbox.send(message, this, sendTo);
  }
  receiveMessage(message, receiveFrom) {
    console.log(`${receiveFrom.name} sent the message: ${message}`);
  }
}

// Mediator  class
class ChatBox {
  constructor() {
    this.users = [];
  }
  register(user) {
    this.users[user.userId] = user;
    user.chatbox = this;
  }
  send(message, receiveFrom, sendTo) {
    sendTo.receiveMessage(message, receiveFrom);
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
var chatbox = new ChatBox();
var joey = new User('Joey', 1);
var phoebe = new User('Phoebe', 2);
chatbox.register(joey);
chatbox.register(phoebe);
joey.sendMessage('Hey, how you doing?', phoebe); // Joey sent the message: Hey, how you doing?
phoebe.sendMessage('Smelly Cat, Smelly Cat..', joey); // Phoebe sent the message: Smelly Cat, Smelly Cat..
joey.sendMessage('I love this song!', phoebe); // Joey sent the message: I love this song!
