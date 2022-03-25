import { combineReducers } from "redux";
import user from "./user";
import mypage from "./mypage";
import myDiet from "./myDiet";
export default combineReducers({
  user,
  mypage,
  myDiet,
});
