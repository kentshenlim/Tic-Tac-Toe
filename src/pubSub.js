const pubSub = (() => {
  const map = {};

  // Method declaration
  function subscribe(event, fn) {
    if (!map[event]) map[event] = [];
    map[event].push(fn);
  }

  function publish(event, data) {
    if (map[event]) {
      map[event].array.forEach((fn) => {
        fn(data);
      });
    }
  }

  function unsubscribe(event, fn) {
    if (map[event]) {
      for (let i = 0; i < map[event].length; i += 1) {
        if (map[event][i] === fn) {
          map[event].splice(i, 1);
          return true;
        }
      }
    }
    return false;
  }

  return { subscribe, publish, unsubscribe };
})();

export default pubSub;
