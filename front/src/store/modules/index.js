import { combineReducers } from "redux";
import myDietRegister from "./myDietRegister";
import user from "./user";
import mypage from './mypage';
export default combineReducers({
  myDietRegister,
  user,
  mypage,
});
