import { combineReducers } from "redux";
import postReducer from "./backupdata";
import signupReducer from "./signupdata";
import logInReducer from "./logindata";
const rootReducer = combineReducers({
  postReducer,
  signupReducer,
  logInReducer,
});

export default rootReducer;
