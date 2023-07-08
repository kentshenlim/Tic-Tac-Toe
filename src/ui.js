import pubSub from './pubSub';

const ui = (() => {
  // Cache DOM
  const cells = document.querySelectorAll('.cell');

  // Method declaration
  function toggleOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.classList.toggle('active');
  }

  function toggleInfo() {
    const infoForm = document.getElementById('info-form');
    infoForm.classList.toggle('active');
  }

  function resetGrid() {
    const imgS = document.querySelectorAll('.cell > img');
    imgS.forEach((img) => {
      img.parentNode.removeChild(img);
    });
  }

  // Bind events
  const infoBtn = document.getElementById('info-btn');
  infoBtn.onclick = () => {
    toggleOverlay();
    toggleInfo();
  };

  const infoCrossBtn = document.querySelector('#info-form>span.icon-close');
  infoCrossBtn.onclick = () => {
    toggleOverlay();
    toggleInfo();
  };

  const restartGameBtn = document.getElementById('restart-btn');
  restartGameBtn.onclick = () => {
    pubSub.publish('restartGame', null);
  };

  // Event subscription
  pubSub.subscribe('restartGame', resetGrid);
})();

export default ui;
