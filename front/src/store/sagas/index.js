import { all, fork } from "redux-saga/effects";
import myDietRegister from "./myDietRegister";
import member from "./member";
import mypage from './mypage';
export default function* rootSaga() {
  yield all([
    fork(myDietRegister),
    fork(member),
    fork(mypage),
  ]);
}
