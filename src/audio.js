import pubSub from './pubSub';
import grass from './audioD/grass.wav';
import error from './audioD/error.wav';
import pop from './audioD/pop.wav';
import judgeTree from './audioD/judgeTree.mp3';

(() => {
  // Cache DOM
  const muteBtn = document.getElementById('mute-btn');

  // Method declaration
  function createAudioNode(audioSrc, id) {
    const audNode = document.createElement('audio');
    audNode.src = audioSrc;
    audNode.id = id;
    return audNode;
  }

  function playSound(audNode) {
    if (muteBtn.classList.contains('muted')) return;
    const p = audNode;
    p.currentTime = 0;
    p.play();
  }

  function stopSound(audNode) {
    const p = audNode;
    p.pause();
    p.currentTime = 0;
  }

  // Init audio node
  const grassNode = createAudioNode(grass, 'grass');
  const errorNode = createAudioNode(error, 'error');
  const popNode = createAudioNode(pop, 'pop');
  const judgeTreeNode = createAudioNode(judgeTree, 'judgeTree');
  judgeTreeNode.volume = 0.4;
  judgeTreeNode.loop = true;

  // Event subscription
  pubSub.subscribe('updateGridPicked', () => playSound(grassNode));
  pubSub.subscribe('gridPickedRejected', () => playSound(errorNode));
  pubSub.subscribe('popClicked', () => playSound(popNode));
  pubSub.subscribe('playJudgeTree', () => {
    playSound(judgeTreeNode);
  });
  pubSub.subscribe('stopJudgeTree', () => stopSound(judgeTreeNode));
})();
