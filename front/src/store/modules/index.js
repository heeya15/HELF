import { combineReducers } from "redux";
import myDietRegister from "./myDietRegister";
import user from "./user";
import mypage from "./mypage";
import myDiet from "./MyDiet";
export default combineReducers({
  myDietRegister,
  user,
  mypage,
  myDiet,
});
