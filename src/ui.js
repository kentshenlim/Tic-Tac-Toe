import pubSub from './pubSub';
import xSymbol from './img/x.png';
import oSymbol from './img/o.png';

(() => {
  // Method declaration
  function toggleElement(id) {
    const form = document.getElementById(id);
    form.classList.toggle('active');
  }

  function closePopup(event) {
    const { target } = event;
    const parent = target.parentNode.parentNode;
    parent.classList.remove('active');
    if (parent.id === 'result-form') { // Need to clear result added
      const resImgWrapper = document.getElementById('res-img-wrapper');
      while (resImgWrapper.firstChild) resImgWrapper.removeChild(resImgWrapper.lastChild);
    }
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

  function displayResult(winner) {
    const resImgWrapper = document.getElementById('res-img-wrapper');
    const resultText = document.getElementById('result-text');
    if (winner === 'draw') {
      const imgNode1 = document.createElement('img');
      const imgNode2 = document.createElement('img');
      imgNode1.src = xSymbol;
      imgNode2.src = oSymbol;
      resImgWrapper.appendChild(imgNode1);
      resImgWrapper.appendChild(imgNode2);
      resultText.textContent = 'DRAW!';
    } else {
      const img = winner === 'x' ? xSymbol : oSymbol;
      const imgNode = document.createElement('img');
      imgNode.src = img;
      resImgWrapper.appendChild(imgNode);
      resultText.textContent = 'WINNER!';
    }
    toggleElement('result-form');
    toggleElement('overlay');
  }

  function debounce(fn, t) {
    let timeId;
    return function debounced(...args) {
      clearTimeout(timeId);
      timeId = setTimeout(() => {
        fn(...args);
      }, t);
    };
  }

  function shakeCell([r, c]) {
    const cellNode = document.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);
    cellNode.classList.add('shake');
    debounce(() => {
      cellNode.classList.remove('shake');
    }, 1000)();
  }

  // Cache DOM and bind events
  const restartGameBtn = document.getElementById('restart-btn');
  restartGameBtn.onclick = () => {
    pubSub.publish('restartGame', null);
    pubSub.publish('popClicked', null);
  };

  const playAgainBtn = document.getElementById('play-again-btn');
  playAgainBtn.onclick = (event) => {
    toggleElement('overlay');
    closePopup(event);
    pubSub.publish('restartGame', null);
  };

  const modeBtn = document.getElementById('mode-btn');
  modeBtn.onclick = () => {
    toggleElement('overlay');
    toggleElement('mode-form');
    pubSub.publish('popClicked', null);
  };

  const infoBtn = document.getElementById('info-btn');
  infoBtn.onclick = () => {
    toggleElement('overlay');
    toggleElement('info-form');
    pubSub.publish('popClicked', null);
  };

  const infoCrossBtns = document.querySelectorAll('.form-wrapper>span.icon-close');
  infoCrossBtns.forEach((btn) => {
    const opt = btn; // Cannot modify function param directly
    opt.onclick = (event) => {
      toggleElement('overlay');
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
  pubSub.subscribe('gridPickedRejected', shakeCell);
  pubSub.subscribe('gameEnded', displayResult);
})();
