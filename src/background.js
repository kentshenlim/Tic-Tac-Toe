import './background.css';
import xImg from './img/x.png';
import oImg from './img/o.png';

(() => {
  // Cache DOM
  const body = document.querySelector('body');

  const background = document.createElement('div');
  background.classList.add('background-wrapper');

  // Method declaration
  function createImgNode(imgSrc, classNameList) {
    const imgNode = document.createElement('img');
    imgNode.src = imgSrc;
    classNameList.forEach((className) => {
      imgNode.classList.add(className);
    });
    return imgNode;
  }

  function insertMotif(imgSrc, classNameList, r, c) {
    // Insert r by c
    const verticalGap = 100 / r;
    const horizontalGap = 100 / c;
    for (let i = 0; i < r; i += 1) {
      for (let j = 0; j < c; j += 1) {
        const node = createImgNode(imgSrc, classNameList);
        node.style.width = '10%';
        node.style.position = 'absolute';
        node.style.top = `${verticalGap * i}%`;
        node.style.left = `${horizontalGap * j}%`;
        background.appendChild(node);
      }
    }
  }

  insertMotif(oImg, [], 3, 5);

  //   const imgTest = document.createElement('img');
  //   imgTest.src = oImg;
  //   background.appendChild(createImgNode(oImg, []));

  body.appendChild(background);
})();
