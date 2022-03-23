import { combineReducers } from "redux";
import myDietRegister from "./myDietRegister";
import member from "./member";
import mypage from './mypage';
export default combineReducers({
  myDietRegister,
  member,
  mypage,
});
