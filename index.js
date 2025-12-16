let state = 1;

const listeners = [];

function increment() {
  state++;
}

function dispatch(actionFunction) {
  if (actionFunction) actionFunction();
  // inform listeners
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.push(listener);
  return function unsubscribe() {
    const index = listeners.indexOf(listener);
    if (index !== -1) listeners.splice(index, 1);
  };
}

subscribe(() => {
  console.log(state);
});

dispatch()
dispatch(increment)
dispatch(increment)