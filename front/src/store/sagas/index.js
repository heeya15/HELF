import { all, fork } from "redux-saga/effects";
import myDietRegister from "./myDietRegister";
import member from "./member";
export default function* rootSaga() {
  yield all([
    fork(myDietRegister),
    fork(member)
  ]);
}
