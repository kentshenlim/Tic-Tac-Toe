import pubSub from './pubSub';
import grass from './audioD/grass.wav';
import error from './audioD/error.wav';
import pop from './audioD/pop.wav';

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
    const p = audNode;
    p.currentTime = 0;
    p.play();
  }

  const grassNode = createAudioNode(grass, 'grass');
  const errorNode = createAudioNode(error, 'error');
  const popNode = createAudioNode(pop, 'pop');

  // Event subscription
  pubSub.subscribe('updateGridPicked', () => playSound(grassNode));
  pubSub.subscribe('gridPickedRejected', () => playSound(errorNode));
  pubSub.subscribe('popClicked', () => playSound(popNode));
})();
