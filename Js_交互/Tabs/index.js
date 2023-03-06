const data = [
  {
    value: 'html',
    label: 'HTML',
    content:
      'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser',
  },
  {
    value: 'css',
    label: 'CSS',
    content:
      'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
  },
  {
    value: 'js',
    label: 'Javascript',
    content:
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
  },
];

(() => {
  const tabs = (containerEle, data) => {
    let activeValue = 'html';

    const update = (element = document.querySelector('[data-value]')) => {
      activeValue = element.getAttribute('data-value');

      for (let i = 0; i < element.parentNode.children.length; i++) {
        const label = element.parentNode.children[i];
        if (label.getAttribute('data-value') === activeValue) {
          label.classList.add('active');
        } else {
          label.classList.remove('active');
        }
      }

      for (let i = 0; i < element.parentNode.nextSibling.children.length; i++) {
        const panel = element.parentNode.nextSibling.children[i];
        if (panel.getAttribute('data-value') === activeValue) {
          panel.hidden = false;
        } else {
          panel.hidden = true;
        }
      }
    };

    const attachEvents = () => {
      // Use Event Delegation.
      containerEle.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName !== 'BUTTON') return;

        update(target);
      });
    };

    const init = () => {
      const tabItem = document.createDocumentFragment();
      const labelsContainer = document.createElement('div');
      const contentContainer = document.createElement('div');

      // generate labels
      data.forEach(({ value, label }) => {
        const labelBtn = document.createElement('button');
        labelBtn.setAttribute('type', 'button');
        labelBtn.classList.add('button');
        labelBtn.setAttribute('data-value', value);
        labelBtn.textContent = label;
        labelsContainer.append(labelBtn);
      });

      // generate contents
      data.forEach(({ value, content }) => {
        const contentP = document.createElement('p');
        contentP.textContent = content;
        contentP.setAttribute('data-value', value);
        contentContainer.append(contentP);
      });

      tabItem.append(labelsContainer);
      tabItem.append(contentContainer);
      containerEle.appendChild(tabItem);
    };

    init();
    update();
    attachEvents();
  };

  tabs(document.querySelector('#tabs'), data);
  // tabs(document.querySelector('#tabs2'), data); //----> just more test case
})();
