class Model {
  constructor(text) {
    this.text = text;
  }
  setText(text) {
    this.text = text;
  }
  getText() {
    return this.text;
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
  changeText(text) {
    this.presenter.changeText(text);
  }
  // the View also displays the updated data returned to it by the presenter (displayError, displayMessage)
  displayError() {
    console.log('Text is not in upper case');
  }
  displayMessage(text) {
    console.log('The text is: ' + text);
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

  changeText(text) {
    if (text !== text.toUpperCase()) {
      this.view.displayError();
    } else {
      this.model.setText(text);
      this.view.displayMessage(this.model.getText());
    }
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
const model = new Model('Hello world!');
const view = new View();
const presenter = new Presenter(view);

presenter.setModel(model);
view.registerWith(presenter);

// the View is responsible for passing any user actions to the presenter
presenter.getView().changeText('unagi'); // Text is not in upper case
presenter.getView().changeText('UNAGI'); // The text is: UNAGI
