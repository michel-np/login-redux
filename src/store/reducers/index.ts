import { combineReducers } from "redux";
import { userReducer } from "./userReducer"

const GlobalReducer = combineReducers({
    user: userReducer
})

export default GlobalReducer