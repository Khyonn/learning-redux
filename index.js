let state = {
  compteur: 1,
  salutation: ''
};

const listeners = [];

function increment() {
  state.compteur++;
}

function sayHello() {
  state.salutation = "Salut !!";
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
dispatch(sayHello)