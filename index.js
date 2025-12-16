import { createStore } from "./redux.js";

import reducer from "./reducers/index.js";

const store = createStore({
  reducer,
});

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({ type: "incremente le compteur" });
store.dispatch({ type: "incremente le compteur" });
store.dispatch({ type: "decremente le compteur" });
store.dispatch({ type: "dis bonjour" });
store.dispatch({ type: "ajoute X au compteur", payload: 5 });
