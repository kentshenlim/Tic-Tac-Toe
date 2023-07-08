import pubSub from './pubSub';
import xSymbol from './img/x.png';
import oSymbol from './img/o.png';

const ui = (() => {
  // Method declaration
  function toggleOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.classList.toggle('active');
  }

  function toggleInfo() {
    const infoForm = document.getElementById('info-form');
    infoForm.classList.toggle('active');
  }

  function closePopup(event) {
    const { target } = event;
    const parent = target.parentNode.parentNode;
    parent.classList.remove('active');
  }

  function reset() {
    const imgS = document.querySelectorAll('.cell > img');
    imgS.forEach((img) => {
      img.parentNode.removeChild(img);
    });
  }

  function updateGrid([r, c, symbol]) {
    const img = symbol === 'x' ? xSymbol : oSymbol;
    const imgNode = document.createElement('img');
    imgNode.src = img;
    const cellNode = document.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);
    cellNode.appendChild(imgNode);
  }

  // Bind events
  const restartGameBtn = document.getElementById('restart-btn');
  restartGameBtn.onclick = () => {
    pubSub.publish('restartGame', null);
  };

  const playAgainBtn = document.getElementById('play-again-btn');
  playAgainBtn.onclick = (event) => {
    toggleOverlay();
    closePopup(event);
    pubSub.publish('restartGame', null);
  };

  const infoBtn = document.getElementById('info-btn');
  infoBtn.onclick = () => {
    toggleOverlay();
    toggleInfo();
  };

  const infoCrossBtns = document.querySelectorAll('.form-wrapper>span.icon-close');
  infoCrossBtns.forEach((btn) => {
    const opt = btn; // Cannot modify function param directly
    opt.onclick = (event) => {
      toggleOverlay();
      closePopup(event);
    };
  });

  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    const opt = cell;
    opt.onclick = () => {
      const r = opt.getAttribute('data-r');
      const c = opt.getAttribute('data-c');
      pubSub.publish('gridPicked', [r, c]);
    };
  });

  // Event subscription
  pubSub.subscribe('restartGame', reset);
  pubSub.subscribe('updateGridPicked', updateGrid);
})();

export default ui;
