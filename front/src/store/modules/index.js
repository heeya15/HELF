import { combineReducers } from "redux";
import user from "./user";
import mypage from "./myPage";
import myDiet from "./myDiet";
import shareBoard from "./shareBoard"
export default combineReducers({
  user,
  mypage,
  myDiet,
  shareBoard,
});
