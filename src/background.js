import './background.css';
import xImg from './img/x.png';
import oImg from './img/o.png';

(() => {
  // Method declaration
  function createImgNode(imgSrc, classNameList) {
    const imgNode = document.createElement('img');
    imgNode.src = imgSrc;
    classNameList.forEach((className) => {
      imgNode.classList.add(className);
    });
    return imgNode;
  }

  // Cache DOM
  const body = document.querySelector('body');

  const background = document.createElement('div');
  background.classList.add('background-wrapper');

  const imgTest = document.createElement('img');
  imgTest.src = oImg;
  background.appendChild(createImgNode(oImg, []));

  body.appendChild(background);
})();
