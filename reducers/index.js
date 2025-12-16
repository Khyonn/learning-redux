import { combineReducers } from "../redux.js";

import compteur from "./compteur.js";
import salutation from "./salutation.js";

const rootReducer = combineReducers({
  compteur,
  salutation,
});
export default rootReducer;
