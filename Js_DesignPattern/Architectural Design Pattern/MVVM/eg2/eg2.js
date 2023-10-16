class Model {
  constructor() {
    this.model = { color: 'red' };
    this.observers = [];
  }
  subscribe(observer) {
    this.observers.push(observer);
  }
  notifyObservers(attrNm, newVal) {
    for (var i = 0; i < this.observers.length; i++) {
      this.observers[i](attrNm, newVal);
    }
  }
  getCurrentColor(key) {
    return this.model[key];
  }
  setColor(key, value) {
    this.model[key] = value;
    this.notifyObservers(key, value);
  }
}

class ViewModel {
  constructor(model) {
    this.bind = function (viewElement, modelElement) {
      viewElement.style.color = model.getCurrentColor(modelElement);

      model.subscribe(function (attrNm, newValue) {
        var elem = document.getElementById(attrNm);
        if (newValue == 'red') elem.style.color = 'blue';
        else if (newValue == 'green') elem.style.color = 'red';
        else if (newValue == 'blue') elem.style.color = 'green';
      });

      viewElement.addEventListener('input', function () {
        model.setColor('color', viewElement.value);
      });
    };
  }
}

var nameInput = document.getElementById('color');
var model = new Model();
var viewModel = new ViewModel(model);
viewModel.bind(nameInput, 'color');
