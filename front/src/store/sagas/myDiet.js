import { all, call, put, fork, takeLatest } from "redux-saga/effects";
import { myDietUpdateAPI, myDietDetailAPI } from "../apis/Main/myDiet";
import {
  MY_DIET_DETAIL_REQUEST,
  MY_DIET_DETAIL_SUCCESS,
  MY_DIET_DETAIL_FAILURE,
  MY_DIET_UPDATE_REQUEST,
  MY_DIET_UPDATE_SUCCESS,
  MY_DIET_UPDATE_FAILURE,
} from "../modules/MyDiet";

function* loadMyDietDetail(action) {
  try {
    const result = yield call(myDietDetailAPI, action.data);
    yield put({ type: MY_DIET_DETAIL_SUCCESS, data: result });
  } catch (error) {
    yield put({ type: MY_DIET_DETAIL_FAILURE });
  }
}

function* watchLoadMyDietDetail() {
  yield takeLatest(MY_DIET_DETAIL_REQUEST, loadMyDietDetail);
}

function* loadMyDietUpdate(action) {
  try {
    const result = yield call(myDietUpdateAPI, action.data);
    yield put({ type: MY_DIET_UPDATE_SUCCESS, data: result });
  } catch (error) {
    yield put({ type: MY_DIET_UPDATE_FAILURE });
  }
}

function* watchLoadMyDietUpdate() {
  yield takeLatest(MY_DIET_UPDATE_REQUEST, loadMyDietUpdate);
}

export default function* myDietSaga() {
  yield all([fork(watchLoadMyDietDetail), fork(watchLoadMyDietUpdate)]);
}
