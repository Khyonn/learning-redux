let state;

const listeners = [];

function createGranularity(fonctionsParNom) {
  return function granularity(etatParNom = {}, action) {
    for (const nom in fonctionsParNom) {
      const getNouvelleValeur = fonctionsParNom[nom];
      const ancienneValeur = etatParNom[nom];
      const nouvelleValeur = getNouvelleValeur(etatParNom[nom], action);

      if (ancienneValeur !== nouvelleValeur) {
        etatParNom = { ...etatParNom, [nom]: nouvelleValeur };
      }
    }
    return etatParNom;
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

const getNouvelEtat = createGranularity({
  compteur,
  salutation,
});

function dispatch(action) {
  state = getNouvelEtat(state, action);
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
