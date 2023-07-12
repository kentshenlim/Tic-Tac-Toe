import './background.css';
import xImg from './img/x.png';
import oImg from './img/o.png';

(() => {
  // Cache and create DOM needed for background handling
  const body = document.querySelector('body');

  const background = document.createElement('div');
  background.classList.add('background-wrapper');

  // Method declaration
  function getAspectRatio() {
    return window.innerWidth / window.innerHeight;
  }

  function createImgNode(imgSrc, classNameList) {
    const imgNode = document.createElement('img');
    imgNode.src = imgSrc;
    classNameList.forEach((className) => {
      imgNode.classList.add(className);
    });
    return imgNode;
  }

  function insertMotif(imgSrc, classNameList, r, c, width) {
    // Insert r by c motifs
    const verticalGap = 100 / r;
    const horizontalGap = 100 / c;
    for (let i = 0; i < r; i += 1) {
      for (let j = 0; j < c; j += 1) {
        const node = createImgNode(imgSrc, classNameList);
        node.style.width = width;
        node.style.position = 'absolute';
        node.style.top = `${verticalGap * i}%`;
        node.style.left = `${horizontalGap * (j + (i % 2 ? 0.5 : 0))}%`;
        background.appendChild(node);
      }
    }
  }

  function insertBothMotif(
    activeImgSrc,
    activeClassNameList,
    inactiveImgSrc,
    inactiveClassNameList,
    r,
    c,
    width,
  ) {
    insertMotif(activeImgSrc, [...activeClassNameList, 'active'], r, c, width);
    insertMotif(inactiveImgSrc, inactiveClassNameList, r, c, width);
  }

  function deleteMotif() {
    while (background.lastChild) background.removeChild(background.firstChild);
  }

  function testSwap() {
    const activeNodes = document.querySelectorAll('.background-wrapper img.active');
    const inactiveNodes = document.querySelectorAll('.background-wrapper img:not(.active)');
    console.log(inactiveNodes);
    activeNodes.forEach((node) => { node.classList.remove('active'); });
    inactiveNodes.forEach((node) => { node.classList.add('active'); });
  }

  if (getAspectRatio() > 3 / 4) {
    insertMotif(xImg, ['xImg', 'active'], 4, 7, '10%');
    insertMotif(oImg, ['oImg'], 4, 7, '10%');
  } else {
    insertMotif(xImg, ['xImg', 'active'], 10, 4, '20%');
    insertMotif(oImg, ['oImg'], 10, 4, '20%');
  }

  window.addEventListener('resize', () => {
    deleteMotif();
    if (getAspectRatio() > 3 / 4) {
      insertMotif(xImg, ['xImg', 'active'], 4, 7, '10%');
      insertMotif(oImg, ['oImg'], 4, 7, '10%');
    } else {
      insertMotif(xImg, ['xImg', 'active'], 10, 4, '20%');
      insertMotif(oImg, ['oImg'], 10, 4, '20%');
    }
  });

  body.appendChild(background);
  window.good = testSwap;
})();
