import { all, call, put, fork, takeLatest } from "redux-saga/effects";
import { myDietImageAPI, myDietRegisterAPI, myDietDiaryListAPI, myDietDiaryDailyInfoAPI } from "../apis/myDietRegister";
import {
  MY_DIET_IMAGE_REQUEST,
  MY_DIET_IMAGE_SUCCESS,
  MY_DIET_IMAGE_FAILURE,
  MY_DIET_REGISTER_REQUEST,
  MY_DIET_REGISTER_SUCCESS,
  MY_DIET_REGISTER_FAILURE,
  MY_DIET_DIARY_LIST_REQUEST,
  MY_DIET_DIARY_LIST_SUCCESS,
  MY_DIET_DIARY_LIST_FAILURE,
  MY_DIET_DIARY_DAILY_INFO_REQUEST,
  MY_DIET_DIARY_DAILY_INFO_SUCCESS,
  MY_DIET_DIARY_DAILY_INFO_FAILURE,
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

// 식단 일정 목록 모두 조회
function* loadMyDietDiaryList(action) {
  try {
    const result = yield call(myDietDiaryListAPI, action.data);
    yield put({ type: MY_DIET_DIARY_LIST_SUCCESS, data: result });
  } catch (error) {
    yield put({ type: MY_DIET_DIARY_LIST_FAILURE });
  }
}

function* watchMyDietDiaryList() {
  yield takeLatest(MY_DIET_DIARY_LIST_REQUEST, loadMyDietDiaryList);
}

// 해당 날짜에 해당하는 식단 일지 정보 가져오기
function* loadMyDietDiaryDailyInfo(action) {
  try {
    console.log(">>>>>>>>>>> here : ", action.data);
    const result = yield call(myDietDiaryDailyInfoAPI, action.data);
    yield put({ type: MY_DIET_DIARY_DAILY_INFO_SUCCESS, data: result });
  } catch (error) {
    yield put({ type: MY_DIET_DIARY_DAILY_INFO_FAILURE });
  }
}

function* watchMyDietDiaryDailyInfo() {
  yield takeLatest(MY_DIET_DIARY_DAILY_INFO_REQUEST, loadMyDietDiaryDailyInfo);
}

export default function* myDietImageSaga() {
  yield all([
    fork(watchLoadMyDietImage),
    fork(watchLoadMyDietRegister),
    fork(watchMyDietDiaryList),
    fork(watchMyDietDiaryDailyInfo),
  ]);
}
