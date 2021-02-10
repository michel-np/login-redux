import { createStore, applyMiddleware } from "redux";
import GlobalReducer from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension"

import thunk from "redux-thunk";

const Store = createStore(GlobalReducer, composeWithDevTools(applyMiddleware(thunk)));

export type GlobalStore = ReturnType<typeof GlobalReducer>;

export default Store;