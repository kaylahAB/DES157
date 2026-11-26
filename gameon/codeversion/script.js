(function () {
  'use strict';
  console.log('reading js');

  const setup        = document.querySelector('#setup');
  const table        = document.querySelector('#table');
  const wheel        = document.querySelector('.wheel');
  const infoPanels   = document.querySelectorAll('#info article');
  const backButton   = document.querySelector('#back');
  const tablePlayers = document.querySelectorAll('#players li');
  const quitGame     = document.querySelector('#quit');

  /* menu */
  const menuState = { level: 'main', index: 0, turn: 0 };

  function menuItems() {
    return Array.from(wheel.querySelectorAll('button[data-menu="' + menuState.level + '"]'));
  }

  function updateMenu(shouldFocus) {
    setup.style.setProperty('--turn', menuState.turn + 'deg');

    menuItems().forEach(function (item, i) {
      const selected = i === menuState.index;
      item.tabIndex = selected ? 0 : -1;

      if (selected) {
        item.setAttribute('aria-current', 'true');
        infoPanels.forEach(function (panel) {
          panel.hidden = panel.dataset.info !== item.dataset.info;
        });
        if (shouldFocus) item.focus({ preventScroll: true });
      } else {
        item.removeAttribute('aria-current');
      }
    });
  }

  function showLevel(level) {
    menuState.level = level;
    menuState.index = 0;
    menuState.turn = Math.round(menuState.turn / 360) * 360;

    wheel.querySelectorAll('button').forEach(function (item) {
      item.hidden = item.dataset.menu !== level;
    });

    backButton.hidden = level === 'main';
    updateMenu(false);
  }

  function selectItem(i, shouldFocus) {
    const count = menuItems().length;
    let step = ((i - menuState.index) % count + count) % count;
    if (step === count - 1) step = -1;

    menuState.turn -= step * 120;
    menuState.index = i;
    updateMenu(shouldFocus);
  }

  function moveSelection(direction) {
    const count = menuItems().length;
    selectItem((menuState.index + direction + count) % count, true);
  }

  function showTable(playerCount) {
    tablePlayers.forEach(function (player, i) {
      player.hidden = i >= playerCount;
    });

    setup.hidden = true;
    table.hidden = false;
    document.body.classList.add('playing');
  }

  function showTitle() {
    table.hidden = true;
    setup.hidden = false;
    document.body.classList.remove('playing');
    showLevel('main');
    menuItems()[0].focus({ preventScroll: true });
  }

  /* listeners */

  wheel.querySelectorAll('button').forEach(function (item) {
    item.addEventListener('click', function () {

      if (item.dataset.players) {
        showTable(Number(item.dataset.players));
        return;
      }

      if (item.dataset.info === 'quit') {
        window.location.href = '../../index.html';
        return;
      }

      selectItem(menuItems().indexOf(item), false);

      if (item.dataset.info === 'play') {
        showLevel('players');
        menuItems()[0].focus({ preventScroll: true });
      }
    });
  });

  backButton.addEventListener('click', function () {
    showLevel('main');
    menuItems()[0].focus({ preventScroll: true });
  });

  quitGame.addEventListener('click', function () {
    window.location.href = '../../index.html';
  });

  showLevel('main');

})();

/* going to add the game function later */