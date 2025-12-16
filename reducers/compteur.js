export default function compteur(compteur = 1, action) {
  if (action.type === "incremente le compteur") return compteur + 1;
  if (action.type === "decremente le compteur") return compteur - 1;
  if (action.type === "ajoute X au compteur") return compteur + action.payload;
  return compteur;
}
