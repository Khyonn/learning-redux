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
  if (action === "incremente le compteur") return compteur + 1;
  return compteur;
}
function salutation(salutation = "", action) {
  if (action === "dis bonjour") return "Bonjour";
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

dispatch();
dispatch("incremente le compteur");
dispatch("dis bonjour");
