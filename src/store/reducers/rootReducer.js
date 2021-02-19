import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import chatReducer from './chatReducer';
const rootReducer = combineReducers({
  currentUser,
  chatReducer,
  errors
});

export default rootReducer;
