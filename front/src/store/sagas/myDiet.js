import { all, call, put, fork, takeLatest } from "redux-saga/effects";
import {
  myDietImageAPI,
  myDietRegisterAPI,
  myDietDiaryListAPI,
  myDietDiaryDailyInfoAPI,
  myDietUpdateAPI,
  myDietDetailAPI,
  myDietDiaryItemDeleteAPI,
} from "../apis/myDiet";
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
  MY_DIET_DETAIL_REQUEST,
  MY_DIET_DETAIL_SUCCESS,
  MY_DIET_DETAIL_FAILURE,
  MY_DIET_UPDATE_REQUEST,
  MY_DIET_UPDATE_SUCCESS,
  MY_DIET_UPDATE_FAILURE,
  MY_DIET_DIARY_DELETE_REQUEST,
  MY_DIET_DIARY_DELETE_SUCCESS,
  MY_DIET_DIARY_DELETE_FAILURE,
} from "../modules/myDiet";

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
    console.log(">>>>>>>>>>>>> 목록 찾으러 왔어요", action.data);
    const result = yield call(myDietDiaryDailyInfoAPI, action.data);
    yield put({ type: MY_DIET_DIARY_DAILY_INFO_SUCCESS, data: result });
  } catch (error) {
    yield put({ type: MY_DIET_DIARY_DAILY_INFO_FAILURE });
  }
}

function* watchMyDietDiaryDailyInfo() {
  yield takeLatest(MY_DIET_DIARY_DAILY_INFO_REQUEST, loadMyDietDiaryDailyInfo);
}

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

// 식단 일지 번호를 이용하여 식단 일지 정보 삭제하기
function* loadMyDietDiaryItemDelete(action) {
  try {
    const result = yield call(myDietDiaryItemDeleteAPI, action.data);
    yield put({ type: MY_DIET_DIARY_DELETE_SUCCESS, data: result });

    // const result2 = {
    //   date: action.data.date.diaryDate
    // }
    // yield put({ type: MY_DIET_DIARY_DAILY_INFO_REQUEST, data: result2 });  // 식단일지 정보 조회
  } catch (error) {
    yield put({ type: MY_DIET_DIARY_DELETE_FAILURE });
  }
}

function* watchMyDietDiaryItemDelete() {
  yield takeLatest(MY_DIET_DIARY_DELETE_REQUEST, loadMyDietDiaryItemDelete);
}

export default function* myDietSaga() {
  yield all([
    fork(watchLoadMyDietImage),
    fork(watchLoadMyDietRegister),
    fork(watchMyDietDiaryList),
    fork(watchMyDietDiaryDailyInfo),
    fork(watchLoadMyDietDetail),
    fork(watchLoadMyDietUpdate),
    fork(watchMyDietDiaryItemDelete),
  ]);
}
