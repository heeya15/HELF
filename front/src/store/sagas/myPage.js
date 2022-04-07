import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
  UserDeleteAPI,
  UserModifyAPI,
  MypageAPI,
  PasswordConfirmAPI,
  NutritionHistoryAPI,
  WeightHistoryAPI,
  WeightHistoryUpdateAPI,
  SelectWeightHistoryRegisterAPI,
  SelectWeightHistoryUpdateAPI,
  SelectWeightHistoryDeleteAPI,
  MyPageLikeAPI,
  MyPageLikeDeleteAPI,
} from '../apis/myPage';
import {
  MY_PAGE_REQUEST,
  MY_PAGE_SUCCESS,
  MY_PAGE_FAILURE,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_FAILURE,
  UPDATE_USER_INFO_SUCCESS,
  DELETE_USER_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_FAILURE,
  PASSWORD_CONFIRM_REQUEST,
  PASSWORD_CONFIRM_SUCCESS,
  PASSWORD_CONFIRM_FAILURE,
  NUTRITION_HISTORY_REQUEST,
  NUTRITION_HISTORY_SUCCESS,
  NUTRITION_HISTORY_FAILURE,
  WEIGHT_HISTORY_REQUEST,
  WEIGHT_HISTORY_SUCCESS,
  WEIGHT_HISTORY_FAILURE,
  REGISTER_WEIGHT_HISTORY_REQUEST,
  REGISTER_WEIGHT_HISTORY_SUCCESS,
  REGISTER_WEIGHT_HISTORY_FAILURE,
  SELECT_REGISTER_WEIGHT_HISTORY_REQUEST,
  SELECT_REGISTER_WEIGHT_HISTORY_SUCCESS,
  SELECT_REGISTER_WEIGHT_HISTORY_FAILURE,
  UPDATE_WEIGHT_HISTORY_REQUEST,
  UPDATE_WEIGHT_HISTORY_SUCCESS,
  UPDATE_WEIGHT_HISTORY_FAILURE,
  DELETE_WEIGHT_HISTORY_REQUEST,
  DELETE_WEIGHT_HISTORY_SUCCESS,
  DELETE_WEIGHT_HISTORY_FAILURE,
  MY_PAGE_LIKE_REQUEST,
  MY_PAGE_LIKE_SUCCESS,
  MY_PAGE_LIKE_FAILURE,
  MY_PAGE_LIKE_DELETE_REQUEST,
  MY_PAGE_LIKE_DELETE_SUCCESS,
  MY_PAGE_LIKE_DELETE_FAILURE,
} from '../modules/myPage';
import swal from 'sweetalert';
import moment from 'moment';
import 'moment/locale/ko';
// 마이페이지 회원정보 조회
function* loadMyPage(action) {
  try {
    const result = yield call(MypageAPI, action.data);
    yield put({
      type: MY_PAGE_SUCCESS,
      data: result,
    });
  } catch (err) {
    yield put({
      type: MY_PAGE_FAILURE,
    });
  }
}

function* watchLoadMyPage() {
  yield takeLatest(MY_PAGE_REQUEST, loadMyPage);
}

// 마이페이지 회원정보 수정
function* loadUpdateUser(action) {
  try {
    const result = yield call(UserModifyAPI, action.data);
    const nowTime = moment().format('YYYY-MM-DD'); // 현재 날짜 및 시간

    // console.log(nowTime);
    const data1 = {
      createdAt: nowTime,
      weight: action.data.weight,
    };

    yield put({
      type: UPDATE_USER_INFO_SUCCESS,
      data: result,
    });

    yield put({
      type: UPDATE_USER_INFO_SUCCESS,
      data: result,
    });
    yield put({ type: REGISTER_WEIGHT_HISTORY_REQUEST, data: data1 }); // mypage 정보 바로 조회
    swal('수정이 완료되었습니다.', '    ', 'success', {
      buttons: false,
      timer: 1800,
    });
  } catch (err) {
    yield put({
      type: UPDATE_USER_INFO_FAILURE,
    });
  }
}

function* watchLoadUpdateUser() {
  yield takeLatest(UPDATE_USER_INFO_REQUEST, loadUpdateUser);
}

// 회원탈퇴
function* loadDeleteUser(action) {
  try {
    const result = yield call(UserDeleteAPI, action.data);
    yield put({
      type: DELETE_USER_SUCCESS,
      data: result,
    });
    alert('정상적으로 탈퇴 되었습니다. 🖐');
    sessionStorage.clear(); // userToken 세션스토리지 삭제
    document.location.href = '/'; // 로그아웃 처리하면 새로고침 해서 세션 사라진 걸 인식 해줘야함.
  } catch (err) {
    yield put({
      type: DELETE_USER_FAILURE,
    });
  }
}

function* watchLoadDeleteUser() {
  yield takeLatest(DELETE_USER_REQUEST, loadDeleteUser);
}

// 비밀번호 확인
function* loadPasswordConfirm(action) {
  try {
    const result = yield call(PasswordConfirmAPI, action.data.password);
    yield put({
      type: PASSWORD_CONFIRM_SUCCESS,
      data: result,
    });
  } catch (err) {
    yield put({
      type: PASSWORD_CONFIRM_FAILURE,
    });
    alert('잘못된 정보입니다. 다시 입력하세요.');
  }
}

function* watchLoadPasswordConfirm() {
  yield takeLatest(PASSWORD_CONFIRM_REQUEST, loadPasswordConfirm);
}

// 영양 성분 조회
function* loadNutritionHistory(action) {
  try {
    const result = yield call(NutritionHistoryAPI, action.data.createdAt);
    yield put({
      type: NUTRITION_HISTORY_SUCCESS,
      data: result,
    });
  } catch (err) {
    yield put({
      type: NUTRITION_HISTORY_FAILURE,
    });
  }
}

function* watchLoadNutritionHistory() {
  yield takeLatest(NUTRITION_HISTORY_REQUEST, loadNutritionHistory);
}

// 가장 최근 몸무게 기록한 정보 10개 들고오는 함수
function* loadWeightHistory(action) {
  try {
    const result = yield call(WeightHistoryAPI, action.data);
    yield put({
      type: WEIGHT_HISTORY_SUCCESS,
      data: result,
    });
  } catch (err) {
    yield put({
      type: WEIGHT_HISTORY_FAILURE,
    });
    swal(
      'Weight History에 등록되지 않은 날짜를 수정하려했습니다.',
      '    ',
      'success',
      {
        buttons: false,
        timer: 1800,
      }
    );
  }
}

function* watchLoadWeightHistory() {
  yield takeLatest(WEIGHT_HISTORY_REQUEST, loadWeightHistory);
}

// 마이페이지 회원정보 수정시 수정한 몸무게 값을 WeightHistory에 수정
function* loadUpdateWeightHistory(action) {
  try {
    // console.log(action);
    const result = yield call(WeightHistoryUpdateAPI, action.data);
    yield put({
      type: REGISTER_WEIGHT_HISTORY_SUCCESS,
      data: result,
    });
  } catch (err) {
    yield put({
      type: REGISTER_WEIGHT_HISTORY_FAILURE,
    });
  }
}
function* watchLoadUpdateWeightHistory() {
  yield takeLatest(REGISTER_WEIGHT_HISTORY_REQUEST, loadUpdateWeightHistory);
}

// 선택 날짜에 몸무게 등록시 수정한 몸무게 값을 WeightHistory에 수정
function* loadSelectWeightHistoryRegister(action) {
  try {
    // console.log(action);
    const result = yield call(SelectWeightHistoryRegisterAPI, action.data);
    yield put({
      type: SELECT_REGISTER_WEIGHT_HISTORY_SUCCESS,
      data: result,
    });
    swal('등록 성공', '  ', 'success', {
      buttons: false,
      timer: 1200,
    });
  } catch (err) {
    yield put({
      type: SELECT_REGISTER_WEIGHT_HISTORY_FAILURE,
    });
    swal(
      'WeightHistory 등록 실패',
      '이미 등록된 날짜를 등록하려 했습니다. 등록되지 않은 날짜로 등록 바랍니다.',
      'error',
      {
        buttons: false,
        timer: 1500,
      }
    );
  }
}

function* watchLoadSelectWeightHistoryRegister() {
  yield takeLatest(
    SELECT_REGISTER_WEIGHT_HISTORY_REQUEST,
    loadSelectWeightHistoryRegister
  );
}

// 선택 날짜에 몸무게 수정시 수정한 몸무게 값을 WeightHistory에 수정
function* loadSelectWeightHistoryUpdate(action) {
  try {
    // console.log(action);
    const result = yield call(SelectWeightHistoryUpdateAPI, action.data);
    yield put({
      type: UPDATE_WEIGHT_HISTORY_SUCCESS,
      data: result,
    });
    swal('수정 성공', '  ', 'success', {
      buttons: false,
      timer: 1200,
    });
  } catch (err) {
    yield put({
      type: UPDATE_WEIGHT_HISTORY_FAILURE,
    });
    swal(
      'WeightHistory 수정 실패',
      '등록되지 않은 날짜를 수정하려 했습니다. 등록된 날짜를 수정 바랍니다.',
      'error',
      {
        buttons: false,
        timer: 1500,
      }
    );
  }
}
function* watchLoadSelectWeightHistoryUpdate() {
  yield takeLatest(
    UPDATE_WEIGHT_HISTORY_REQUEST,
    loadSelectWeightHistoryUpdate
  );
}

//  입력한 날짜 back에 삭제 요청시 WeightHistory에 해당 데이터 삭제
function* loadSelectWeightHistoryDelete(action) {
  try {
    // console.log(action);
    const result = yield call(SelectWeightHistoryDeleteAPI, action.data);
    yield put({
      type: DELETE_WEIGHT_HISTORY_SUCCESS,
      data: result,
    });
    swal('삭제 성공', '  ', 'success', {
      buttons: false,
      timer: 1200,
    });
  } catch (err) {
    yield put({
      type: DELETE_WEIGHT_HISTORY_FAILURE,
    });
    swal(
      'WeightHistory 삭제 실패',
      '등록되지 않은 날짜를 삭제하려 했습니다. 등록된 날짜를 입력 바랍니다.',
      'error',
      {
        buttons: false,
        timer: 1500,
      }
    );
  }
}
function* watchLoadSelectWeightHistoryDelete() {
  yield takeLatest(
    DELETE_WEIGHT_HISTORY_REQUEST,
    loadSelectWeightHistoryDelete
  );
}

// 찜목록 조회
function* loadMyPageLikeList() {
  try {
    const result = yield call(MyPageLikeAPI);
    yield put({
      type: MY_PAGE_LIKE_SUCCESS,
      data: result,
    });
  } catch (error) {
    yield put({
      type: MY_PAGE_LIKE_FAILURE,
    });
  }
}
function* watchLoadMyPageLikeList() {
  yield takeLatest(MY_PAGE_LIKE_REQUEST, loadMyPageLikeList);
}

// 찜목록 삭제
function* loadMyPageLikeDelete(action) {
  try {
    const result = yield call(MyPageLikeDeleteAPI, action.data);
    yield put({
      type: MY_PAGE_LIKE_DELETE_SUCCESS,
      data: result,
    });
  } catch (error) {
    yield put({
      type: MY_PAGE_LIKE_DELETE_FAILURE,
    });
  }
}
function* watchLoadMyPageLikeDelete() {
  yield takeLatest(MY_PAGE_LIKE_DELETE_REQUEST, loadMyPageLikeDelete);
}

export default function* myPageSaga() {
  yield all([
    fork(watchLoadSelectWeightHistoryRegister),
    fork(watchLoadSelectWeightHistoryUpdate),
    fork(watchLoadSelectWeightHistoryDelete),
    fork(watchLoadUpdateWeightHistory),
    fork(watchLoadWeightHistory),
    fork(watchLoadMyPage),
    fork(watchLoadUpdateUser),
    fork(watchLoadDeleteUser),
    fork(watchLoadPasswordConfirm),
    fork(watchLoadNutritionHistory),
    fork(watchLoadMyPageLikeList),
    fork(watchLoadMyPageLikeDelete),
  ]);
}
