(() => {
  function progressBar($rootElement, initialValue) {
    const MIN = 0;
    const MAX = 100;

    const $innerBarEle = document.createElement('div');
    $innerBarEle.className = 'inner';
    // Set attributes for a11y.
    $innerBarEle.setAttribute('role', 'progressbar');
    $innerBarEle.setAttribute('aria-valuemin', MIN);
    $innerBarEle.setAttribute('aria-valuemax', MAX);

    function setValue(value) {
      // Handle invalid values and convert them to be within [0, 100].
      const clampedValue = Math.min(Math.max(value, MIN), MAX);
      $innerBarEle.style.width = `${clampedValue}%`;
      $innerBarEle.textContent = `${clampedValue}%`;
      $innerBarEle.setAttribute('aria-valuenow', clampedValue);
    }

    $rootElement.appendChild($innerBarEle);
    setValue(initialValue);

    // for slider use below
    return {
      setValue,
    };
  }

  // Initialize some examples.
  progressBar(document.querySelector('#progress-0'), 0);
  progressBar(document.querySelector('#progress-2'), 2);
  progressBar(document.querySelector('#progress-50'), 50);
  progressBar(document.querySelector('#progress-100'), 100);
  progressBar(document.querySelector('#progress--10'), -10);
  progressBar(document.querySelector('#progress-120'), 120);

  // Initialize the slider example which controls the progress of the progress bar below.
  const progressSlider = progressBar(
    document.querySelector('#progress-slider'),
    50
  );

  document.querySelector('#slider').addEventListener('change', (event) => {
    console.log(event.target);
    progressSlider.setValue(event.target.value);
  });
})();
