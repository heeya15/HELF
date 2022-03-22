import { all, fork } from "redux-saga/effects";
import myDietRegister from "./myDietRegister";

export default function* rootSaga() {
  yield all([fork(myDietRegister)]);
}
