//-----------MODEL---------------------------------------
class Model {
  constructor() {
    this.model = { name: 'Stuart' };
    this.observers = [];
  }
  subscribe(observer) {
    this.observers.push(observer);
  }
  // it calls each observer function, passing it the updated value in the Model.
  notifyObservers(attrName, newVal) {
    for (let i = 0; i < this.observers.length; i++) {
      this.observers[i](attrName, newVal);
    }
  }
  getCurrentName(nameKey) {
    console.log(this.model[nameKey]);
    return this.model[nameKey];
  }
  setNameValue(nameKey, value) {
    this.model[nameKey] = value;
    this.notifyObservers(nameKey, value);
  }
}

//-----------VIEWMODEL----------------------------------------
class ViewModel {
  //The constructor initializes the bind function that binds the view element to the model element.
  constructor(model) {
    this.bind = function (viewElement, modelElement) {
      viewElement.value = model.getCurrentName(modelElement); // set view element value

      /* 
        deals with the case where the changes made in the model are to be reflected on the user interface.
        calls the subscribe function to which it passes the callback that is invoked when a change in the model occurs.
      */
      model.subscribe(function (attrName, newValue) {
        document.getElementsByName(attrName).forEach(function (elem) {
          elem.value = newValue.toUpperCase();
        });
      });

      // when the model needs to reflect the changes made on the UI side.
      viewElement.addEventListener('input', function () {
        model.setNameValue(viewElement.name, viewElement.value);
      });
    };
  }
}

//-----------VIEW----------------------------------------
var nameInput = document.getElementById('name');
var nameCopy = document.getElementById('nameCopy');
var model = new Model();
var viewModel = new ViewModel(model);
viewModel.bind(nameInput, 'name');
viewModel.bind(nameCopy, 'name');
