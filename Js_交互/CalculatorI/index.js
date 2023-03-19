(() => {
  const btn = document.querySelector('button');
  const resultbox = document.getElementById('resultBox');

  btn.addEventListener('click', () => {
    const firstNum = parseInt(document.getElementById('firstNo').value);
    const secondNum = parseInt(document.getElementById('secondNo').value);
    const operator = document.querySelector('select').value;

    let result;
    switch (operator) {
      case '+':
        result = firstNum + secondNum;
        break;
      case '-':
        result = firstNum - secondNum;
        break;
      case '*':
        result = firstNum * secondNum;
        break;
      case '/':
        result = firstNum / secondNum;
        break;
      case '%':
        result = firstNum % secondNum;
        break;
      default:
        return '';
    }

    resultbox.innerHTML = `${firstNum}${operator}${secondNum}=${result}`;
  });
})();
