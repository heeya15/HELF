import { all, call, put, fork, takeLatest } from "redux-saga/effects";
import { exerciseHistoryFindAllAPI } from "../apis/exerciseHistory";
import {
  EXERCISE_HISTORY_FINDALL_REQUEST,
  EXERCISE_HISTORY_FINDALL_SUCCESS,
  EXERCISE_HISTORY_FINDALL_FAILURE,
} from "../modules/exerciseHistory";

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

export default function* exerciseHistorySaga() {
  yield all([fork(watchLoadExerciseHistoryFindAll)]);
}
