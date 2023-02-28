(() => {
  const createProgressBar = () => {
    const outter = document.createElement('div');
    const inner = document.createElement('div');
    outter.classList.add('outter');
    inner.classList.add('inner');
    outter.appendChild(inner);
    wrapper.appendChild(outter);

    fillBar(2, inner);
  };

  const fillBar = (seconds, bar) => {
    const frequency = (seconds * 1000) / 100; //calculate frequency to update width
    let value = 0;

    // set a interval timer here
    const interval = setInterval(() => {
      bar.style.width = `${value}%`;
      value++;

      if (value > 100) clearInterval(interval); // stop interval if percent is > 100
    }, frequency);
  };

  const wrapper = document.querySelector('.wrapper');
  const btn = document.getElementById('add');
  btn.addEventListener('click', createProgressBar);
})();
