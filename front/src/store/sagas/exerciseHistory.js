import { all, call, put, fork, takeLatest } from "redux-saga/effects";
import {
  exerciseHistoryFindAllAPI,
  exerciseHistoryRegisterAPI,
} from "../apis/exerciseHistory";
import {
  EXERCISE_HISTORY_FINDALL_REQUEST,
  EXERCISE_HISTORY_FINDALL_SUCCESS,
  EXERCISE_HISTORY_FINDALL_FAILURE,
  EXERCISE_HISTORY_REGISTER_REQUEST,
  EXERCISE_HISTORY_REGISTER_SUCCESS,
  EXERCISE_HISTORY_REGISTER_FAILURE,
} from "../modules/exerciseHistory";

import swal from "sweetalert"; // 예쁜 alert 창을 위해 사용

// 운동 통계 조회
function* loadExerciseHistoryFindAll(action) {
  try {
    const result = yield call(exerciseHistoryFindAllAPI, action.data);
    yield put({ type: EXERCISE_HISTORY_FINDALL_SUCCESS, data: result });
  } catch (error) {
    yield put({ type: EXERCISE_HISTORY_FINDALL_FAILURE });
  }
}

function* watchLoadExerciseHistoryFindAll() {
  yield takeLatest(
    EXERCISE_HISTORY_FINDALL_REQUEST,
    loadExerciseHistoryFindAll
  );
}

// 운동 통계 등록
function* loadExerciseHistoryRegister(action) {
  try {
    if(action.data.count > 0) {
      const result = yield call(exerciseHistoryRegisterAPI, action.data);
      yield put({ type: EXERCISE_HISTORY_REGISTER_SUCCESS, data: result });
    }
    swal("운동 완료", "  ", "success", {
      buttons: false,
      timer: 1800,
    });
    document.location.href = "/exercisesetting";
    // }
  } catch (error) {
    yield put({ type: EXERCISE_HISTORY_REGISTER_FAILURE });
  }
}

function* watchLoadExerciseHistoryRegister() {
  yield takeLatest(
    EXERCISE_HISTORY_REGISTER_REQUEST,
    loadExerciseHistoryRegister
  );
}

export default function* exerciseHistorySaga() {
  yield all([
    fork(watchLoadExerciseHistoryFindAll),
    fork(watchLoadExerciseHistoryRegister),
  ]);
}
