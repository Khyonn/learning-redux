let state;

const listeners = [];

function combineReducers(reducersObject) {
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

function compteur(compteur = 1, action) {
  if (action.type === "incremente le compteur") return compteur + 1;
  if (action.type === "decremente le compteur") return compteur - 1;
  if (action.type === "ajoute X au compteur") return compteur + action.payload;
  return compteur;
}
function salutation(salutation = "", action) {
  if (action.type === "dis bonjour") return "Bonjour";
  return salutation;
}

const rootReducer = combineReducers({
  compteur,
  salutation,
});

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

subscribe(() => {
  console.log(state);
});

dispatch({ type: "Initialisation" });
dispatch({ type: "incremente le compteur" });
dispatch({ type: "incremente le compteur" });
dispatch({ type: "decremente le compteur" });
dispatch({ type: "dis bonjour" });
dispatch({ type: "ajoute X au compteur", payload: 5 });
