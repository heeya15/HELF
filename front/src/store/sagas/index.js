import { all, fork } from "redux-saga/effects";
import user from "./user";
import myPage from "./myPage";
import myDiet from "./myDiet";
export default function* rootSaga() {
  yield all([fork(user), fork(myPage), fork(myDiet)]);
}
