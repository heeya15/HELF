import { combineReducers } from "redux";
import user from "./user";
import mypage from "./myPage";
import myDiet from "./myDiet";
import shareBoard from "./shareBoard"
import kakaoUser from "./kakaoUser"
export default combineReducers({
  user,
  mypage,
  myDiet,
  shareBoard,
  kakaoUser,
});
