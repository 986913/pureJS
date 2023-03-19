(() => {
  const app = document.getElementById('app');
  const keyboard = document.getElementById('keyboard');
  const display = document.getElementById('display');

  keyboard.addEventListener('click', (e) => {
    const value = e.target.innerHTML;
    const displayValue = display.innerHTML;

    // get previous displayValue
    const oldvalue = app.dataset.prevNum;

    // get previous prevKeyType
    const prevKeyType = app.dataset.prevKeyType;

    // update display result
    if (prevKeyType === '+')
      display.innerHTML = parseInt(oldvalue) + parseInt(displayValue);
    else if (prevKeyType === '-')
      display.innerHTML = parseInt(oldvalue) - parseInt(displayValue);
    else if (prevKeyType === '×')
      display.innerHTML = parseInt(oldvalue) * parseInt(displayValue);
    else if (prevKeyType === '÷')
      display.innerHTML = parseInt(oldvalue) / parseInt(displayValue);

    switch (value) {
      case '+':
        app.dataset.prevKeyType = '+';
        break;
      case '-':
        app.dataset.prevKeyType = '-';
        break;
      case '×':
        app.dataset.prevKeyType = '×';
        break;
      case '÷':
        app.dataset.prevKeyType = '÷';
        break;
      case '=':
        app.dataset.prevKeyType = undefined;
        app.dataset.prevNum = 0;
        break;
      case 'AC':
        display.innerHTML = 0;
        app.dataset.prevNum = 0;
        app.dataset.prevKeyType = undefined;
        break;
      default:
        app.dataset.prevNum = displayValue;
        console.log(app.dataset.prevKeyType);

        if (displayValue == 0 && app.dataset.prevKeyType)
          display.innerHTML = value;
        else display.innerHTML += value;
    }
  });
})();
