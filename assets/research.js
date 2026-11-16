(() => {
  'use strict';
  const bar = document.getElementById('themes');
  const tabs = [...bar.querySelectorAll('.theme-tab')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));

  function hashIndex() {
    return panels.findIndex(panel => '#' + panel.id === window.location.hash);
  }

  function select(index, focus = false, updateHash = false) {
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
      if (selected && focus) tab.focus();
    });
    if (updateHash) window.history.replaceState(null, '', '#' + panels[index].id);
  }

  panels.forEach((panel, i) => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabs[i].id);
    panel.tabIndex = 0;
  });
  tabs.forEach((tab, i) => tab.addEventListener('click', () => select(i, false, true)));
  bar.addEventListener('keydown', event => {
    if (!event.target.closest('.theme-tab')) return;
    const current = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
    const next = {
      ArrowRight: (current + 1) % tabs.length,
      ArrowLeft: (current + tabs.length - 1) % tabs.length,
      Home: 0,
      End: tabs.length - 1
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next, true, true);
  });
  window.addEventListener('hashchange', () => {
    const index = hashIndex();
    select(index < 0 ? 0 : index);
  });
  const initial = hashIndex();
  select(initial < 0 ? 0 : initial);
  bar.hidden = false;
})();
