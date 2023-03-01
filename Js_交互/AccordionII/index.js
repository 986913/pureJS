const data = {
  sections: [
    {
      value: 'html',
      title: 'HTML',
      contents:
        'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
    },
    {
      value: 'css',
      title: 'CSS',
      contents:
        'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
    },
    {
      value: 'javascript',
      title: 'JavaScript',
      contents:
        'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
    },
  ],
};

(() => {
  // Encapsulate the ID generation so that it can only be read and is protected from external modification.
  const newID = (() => {
    let id = 0;
    return () => id++;
  })();
  const getAccordionHeaderId = (accordionId, value) =>
    accordionId + '-header-' + value;
  const getAccordionPanelId = (accordionId, value) =>
    accordionId + '-panel-' + value;

  function accordion($rootEl, { sections }) {
    const accordionId = `accordion-${newID()}`;

    function attachEvents() {
      // Use Event Delegation.
      $rootEl.addEventListener('click', (event) => {
        const target = event.target;
        if (
          target.tagName !== 'BUTTON' ||
          !target.classList.contains('accordion-item-title')
        ) {
          return;
        }

        const isExpanded = target.getAttribute('aria-expanded') === 'true'; //<--diff
        target.setAttribute('aria-expanded', !isExpanded); //<--diff

        // Find the icon and toggle the direction.
        const $icon = target.querySelector('.accordion-icon');
        $icon.classList.toggle('accordion-icon--rotated', !isExpanded); //<--diff

        //key point --->通过target.nextSibling找到内容，然后toggle内容的显示隐藏
        const $accordionContents = target.nextSibling;
        $accordionContents.hidden = !$accordionContents.hidden;
      });
    }

    function init() {
      const $accordionSections = document.createDocumentFragment();

      sections.forEach(({ value, title, contents }) => {
        const headerId = getAccordionHeaderId(accordionId, value); //<--diff
        const panelId = getAccordionPanelId(accordionId, value); //<--diff

        const $accordionSection = document.createElement('div');
        $accordionSection.classList.add('accordion-item');

        const $accordionTitleBtn = document.createElement('button');
        $accordionTitleBtn.classList.add('accordion-item-title');
        $accordionTitleBtn.type = 'button';
        $accordionTitleBtn.setAttribute('data-value', value);
        $accordionTitleBtn.id = headerId; //<--diff
        $accordionTitleBtn.setAttribute('aria-controls', panelId); //<--diff
        $accordionTitleBtn.setAttribute('aria-expanded', false); //<--diff

        const $accordionIcon = document.createElement('span');
        $accordionIcon.classList.add('accordion-icon');
        $accordionIcon.setAttribute('aria-hidden', 'true');

        $accordionTitleBtn.append(title, $accordionIcon);

        const $accordionSectionContents = document.createElement('div');
        $accordionSectionContents.classList.add('accordion-item-contents');
        $accordionSectionContents.hidden = true;
        $accordionSectionContents.textContent = contents;
        $accordionSectionContents.role = 'region'; //<--diff
        $accordionSectionContents.id = panelId; //<--diff
        $accordionSectionContents.setAttribute('aria-labelledby', headerId); //<--diff

        $accordionSection.append($accordionTitleBtn, $accordionSectionContents);
        $accordionSections.append($accordionSection);
      });

      $rootEl.appendChild($accordionSections);
    }

    init();
    attachEvents();
  }

  accordion(document.getElementById('accordion'), data);
})();
