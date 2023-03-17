const config = {
  red: {
    duration: 4000,
    next: 'green',
  },
  yellow: {
    duration: 500,
    next: 'red',
  },
  green: {
    duration: 3000,
    next: 'yellow',
  },
};

(() => {
  const lightUI = ({ color }) => {
    const $lightEl = document.createElement('div');
    $lightEl.classList.add('light');
    $lightEl.setAttribute('aria-hidden', true);

    if (color != null) {
      $lightEl.style.backgroundColor = color;
    }

    return $lightEl;
  };

  const trafficLight = ($rootEl, { initialColor, config }) => {
    let currentColor = initialColor;
    let timer = null;

    const $containerEl = document.createElement('div');
    $containerEl.classList.add('lights-wrapper');
    $containerEl.setAttribute('aria-live', 'polite');

    const setTransition = () => {
      const { duration, next } = config[currentColor];
      timer = setTimeout(() => {
        currentColor = next;
        renderLoop();
      }, duration);
    };

    const renderLightUI = () => {
      $containerEl.innerHTML = '';
      $containerEl.setAttribute('aria-label', `Current light: ${currentColor}`);

      Object.keys(config).map((color) => {
        $containerEl.append(
          lightUI({
            color: color === currentColor ? color : undefined,
          })
        );
      });
    };

    const renderLoop = () => {
      renderLightUI();
      setTransition();
    };

    // The beforeunload event is fired before the tab/window is closed. Clear the timer when the tab/window is about to be closed.
    window.addEventListener('beforeunload', () => {
      window.clearInterval(timer);
    });

    $rootEl.append($containerEl);
    renderLoop();
  };

  trafficLight(document.getElementById('light1'), {
    initialColor: 'red',
    config,
  });
})();
