import { all, call, put, fork, takeLatest } from "redux-saga/effects";
import { myDietImageAPI, myDietRegisterAPI } from "../apis/myDietRegister";
import {
  MY_DIET_IMAGE_REQUEST,
  MY_DIET_IMAGE_SUCCESS,
  MY_DIET_IMAGE_FAILURE,
  MY_DIET_REGISTER_REQUEST,
  MY_DIET_REGISTER_SUCCESS,
  MY_DIET_REGISTER_FAILURE,
} from "../modules/myDietRegister";

function* loadMyDietImage(action) {
  try {
    const result = yield call(myDietImageAPI, action.data);
    yield put({ type: MY_DIET_IMAGE_SUCCESS, data: result });
  } catch (error) {
    yield put({ type: MY_DIET_IMAGE_FAILURE });
  }
}

function* watchLoadMyDietImage() {
  yield takeLatest(MY_DIET_IMAGE_REQUEST, loadMyDietImage);
}

function* loadMyDietRegister(action) {
  try {
    console.log(action.data);
    const result = yield call(myDietRegisterAPI, action.data);
    yield put({ type: MY_DIET_REGISTER_SUCCESS, data: result });
  } catch (error) {
    yield put({ type: MY_DIET_REGISTER_FAILURE });
  }
}

function* watchLoadMyDietRegister() {
  yield takeLatest(MY_DIET_REGISTER_REQUEST, loadMyDietRegister);
}

export default function* myDietImageSaga() {
  yield all([fork(watchLoadMyDietImage), fork(watchLoadMyDietRegister)]);
}
