import { combineReducers } from "redux";
import counterReducer from "./modules/counterReducer";
import weatherReducer from "./modules/weatherReducer";

const rootReducer = combineReducers({ counterReducer, weatherReducer });

export default rootReducer;
