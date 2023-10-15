class Model {
  constructor() {
    this.senderName = '';
    this.receiverName = '';
    this.emailTitle = '';
  }

  getSenderName() {
    return this.senderName;
  }
  getReceiverName() {
    return this.receiverName;
  }
  getEmailTitle() {
    return this.emailTitle;
  }
  setReceiverName(receiverName) {
    this.receiverName = receiverName;
  }
  setSenderName(senderName) {
    this.senderName = senderName;
  }
  setEmailTitle(emailTitle) {
    this.emailTitle = emailTitle;
  }
}
class View {
  constructor() {
    this.presenter = null;
  }
  registerWith(presenter) {
    this.presenter = presenter;
  }

  // the View is responsible for passing any user actions to the presenter
  sendEmail(to, fromWhom, emailTitle) {
    this.presenter.sendEmail(to, fromWhom, emailTitle);
  }
  displayEmailInfo(recieverName, senderName, emailTitle) {
    console.log(
      `Email From: ${senderName}
        To: ${recieverName}
        Title: ${emailTitle}`
    );
  }
}

class Presenter {
  constructor(view) {
    this.view = view;
    this.model = null;
  }
  setModel(model) {
    this.model = model;
  }
  getView() {
    return this.view;
  }

  sendEmail(to, fromWhom, emailTitle) {
    // update model
    this.model.setEmailTitle(emailTitle);
    this.model.setSenderName(fromWhom);
    this.model.setReceiverName(to);
    // call view's method
    this.view.displayEmailInfo(to, fromWhom, emailTitle);
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
const model = new Model();
const view = new View();
const presenter = new Presenter(view);

presenter.setModel(model);
view.registerWith(presenter);

// the View is responsible for passing any user actions to the presenter
presenter.getView().sendEmail('Rachel', 'Joey', 'Rent Discussion'); // "Email From: Joey To: Rachel Title: Rent Discussion"
presenter.getView().sendEmail('Monica', 'Phoebe', 'Smelly Cat Draft'); // "Email From: Phoebe To: Monica Title: Smelly Cat Draft"
