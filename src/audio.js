import pubSub from './pubSub';
import grass from './audioD/grass.wav';
import error from './audioD/error.wav';

(() => {
  const body = document.querySelector('body');

  // Method declaration
  function createAudioNode(audioSrc, id) {
    const audNode = document.createElement('audio');
    audNode.src = audioSrc;
    audNode.id = id;
    return audNode;
  }

  function playSound(audNode) {
    audNode.play();
  }

  const grassNode = createAudioNode(grass, 'grass');
  const errorNode = createAudioNode(error, 'error');
  body.appendChild(grassNode);

  // Event subscription
  pubSub.subscribe('updateGridPicked', () => playSound(grassNode));
  pubSub.subscribe('gridPickedRejected', () => playSound(errorNode));
})();
