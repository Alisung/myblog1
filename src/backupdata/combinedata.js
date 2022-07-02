import { combineReducers } from "redux";
import postReducer from "./backupdata";
import signupReducer from "./signupdata";

const rootReducer = combineReducers({
  postReducer,
  signupReducer,
});

export default rootReducer;
