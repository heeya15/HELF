import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
  MemberDeleteAPI,
  UserModifyAPI,
  MypageAPI,
  PasswordConfirmAPI,
} from '../apis/myPage';
import {
  MY_PAGE_REQUEST,
  MY_PAGE_SUCCESS,
  MY_PAGE_FAILURE,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_FAILURE,
  UPDATE_USER_INFO_SUCCESS,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_REQUEST,
  DELETE_MEMBER_FAILURE,
  PASSWORD_CONFIRM_REQUEST,
  PASSWORD_CONFIRM_SUCCESS,
  PASSWORD_CONFIRM_FAILURE,
} from '../modules/myPage';
import swal from 'sweetalert';


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
    yield put({
      type: UPDATE_USER_INFO_SUCCESS,
      data: result,
    });
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
    const result = yield call(MemberDeleteAPI, action.data);
    yield put({
      type: DELETE_MEMBER_SUCCESS,
      data: result,
    });
    alert('정상적으로 탈퇴 되었습니다.');
    sessionStorage.clear(); // userToken 세션스토리지 삭제
    document.location.href = '/'; // 로그아웃 처리하면 새로고침 해서 세션 사라진 걸 인식 해줘야함.
  } catch (err) {
    yield put({
      type: DELETE_MEMBER_FAILURE,
    });
  }
}

function* watchLoadDeleteUser() {
  yield takeLatest(DELETE_MEMBER_REQUEST, loadDeleteUser);
}

// 비밀번호 확인
function* loadPasswordConfirm(action) {
  try {
    const result = yield call(PasswordConfirmAPI, action.data.password);
    yield put({
      type: PASSWORD_CONFIRM_SUCCESS,
      data: result,
    });
    console.log('비밀번호 일치');
  } catch (err) {
    yield put({
      type: PASSWORD_CONFIRM_FAILURE,
    });
    console.log('비밀번호 불일치');
  }
}

function* watchLoadPasswordConfirm() {
  yield takeLatest(PASSWORD_CONFIRM_REQUEST, loadPasswordConfirm);
}

export default function* myPageSaga() {
  yield all([
    fork(watchLoadMyPage),
    fork(watchLoadUpdateUser),
    fork(watchLoadDeleteUser),
    fork(watchLoadPasswordConfirm),
  ]);
}
