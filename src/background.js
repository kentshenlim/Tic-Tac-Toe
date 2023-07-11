import './background.css';
import xImg from './img/x.png';
import oImg from './img/o.png';

(() => {
  const body = document.querySelector('body');

  const background = document.createElement('div');
  background.classList.add('background-wrapper');

  const imgTest = document.createElement('img');
  imgTest.src = oImg;
  background.appendChild(imgTest);

  body.appendChild(background);
})();
