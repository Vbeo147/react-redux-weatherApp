import { combineReducers } from "redux";
import weatherReducer from "./modules/weatherReducer";

const rootReducer = combineReducers({ weatherReducer });

export default rootReducer;
