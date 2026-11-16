(() => {
  'use strict';
  const root = document.querySelector('.publications');
  const papers = [...root.querySelectorAll('.paper')];
  const groups = [...root.querySelectorAll('.year-group')];
  const sections = [...root.querySelectorAll('.publication-section')];
  const buttons = [...root.querySelectorAll('[data-filter]')];
  const search = root.querySelector('#publication-search');
  const result = root.querySelector('#result-count');
  const empty = root.querySelector('#empty-state');
  let active = 'all';

  function normalize(value) {
    return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  }
  // Read visible citation text too, so future text edits are immediately searchable.
  const index = new Map(papers.map(paper => [paper, normalize(paper.textContent + ' ' + (paper.dataset.search || ''))]));

  function update() {
    const terms = normalize(search.value).split(/\s+/).filter(Boolean);
    let count = 0;
    papers.forEach(paper => {
      const statusMatch = active === 'all' || paper.dataset.status === active;
      const textMatch = terms.every(term => index.get(paper).includes(term));
      paper.hidden = !(statusMatch && textMatch);
      if (!paper.hidden) count++;
    });
    groups.forEach(group => {
      group.hidden = ![...group.querySelectorAll('.paper')].some(paper => !paper.hidden);
    });
    sections.forEach(section => {
      const visible = [...section.querySelectorAll('.paper')].filter(paper => !paper.hidden).length;
      section.hidden = visible === 0;
      section.querySelector('.section-count').textContent = String(visible);
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === active)));
    result.textContent = count === papers.length && !terms.length && active === 'all'
      ? `${count} papers`
      : `${count} of ${papers.length} papers`;
    empty.hidden = count !== 0;
  }

  buttons.forEach(button => button.addEventListener('click', () => {
    active = button.dataset.filter;
    update();
  }));
  search.addEventListener('input', update);
  search.addEventListener('keydown', event => {
    if (event.key === 'Escape') { search.value = ''; update(); }
  });
  root.querySelector('#reset-filters').addEventListener('click', () => {
    search.value = '';
    active = 'all';
    update();
    search.focus();
  });
  update();
  root.querySelector('#publication-tools').hidden = false;
})();
