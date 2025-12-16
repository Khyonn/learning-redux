export function combineReducers(reducersObject) {
  return function combinedReducer(initalState = {}, action) {
    for (const reducerName in reducersObject) {
      const reducer = reducersObject[reducerName];
      const oldValue = initalState[reducerName];
      const newValue = reducer(initalState[reducerName], action);

      if (oldValue !== newValue) {
        initalState = { ...initalState, [reducerName]: newValue };
      }
    }
    return initalState;
  };
}

export function createStore({ reducer: rootReducer }) {
  let state;

  const listeners = [];

  function dispatch(action) {
    state = rootReducer(state, action);
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

  function getState() {
    return state;
  }

  dispatch({ type: "Initialisation" });

  return { dispatch, subscribe, getState };
}
