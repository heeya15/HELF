import { all, fork } from "redux-saga/effects";
import user from "./user";
import mypage from "./mypage";
import myDiet from "./myDiet";
export default function* rootSaga() {
  yield all([fork(user), fork(mypage), fork(myDiet)]);
}
