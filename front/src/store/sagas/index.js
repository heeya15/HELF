import { all, fork } from "redux-saga/effects";
import user from "./user";
import myPage from "./myPage";
import myDiet from "./myDiet";
import shareBoard from "./shareBoard";
export default function* rootSaga() {
  yield all([fork(user), fork(myPage), fork(myDiet), fork(shareBoard)]);
}
