import {
  all,
  fork,
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';
import {
  EmailCheckAPI,
  LoginAPI,
  KaKaoIdCheckAPI,
  IdCheckAPI,
  ResetPasswordAPI,
  SignUpAPI,
  AdditionalUserInfoAPI,
} from '../apis/user';
import {
  KakaoLoginAPI,
  getUserInfoAPI
} from '../apis/kakaoUser';
import {
  KAKAO_LOG_IN_REQUEST,
  KAKAO_LOG_IN_SUCCESS,
  KAKAO_LOG_IN_FAILURE,
  KAKAO_LOG_OUT_REQUEST,
  KAKAO_LOG_OUT_SUCCESS,
  KAKAO_LOG_OUT_FAILURE,
  KAKAO_ID_CHECK_SUCCESS,
  KAKAO_ID_CHECK_FAILURE,
  KAKAO_ID_CHECK_REQUEST,
  KAKAO_SIGN_UP_REQUEST,
  KAKAO_SIGN_UP_SUCCESS,
  KAKAO_SIGN_UP_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  FIND_PW_REQUEST,
  FIND_PW_SUCCESS,
  FIND_PW_FAILURE,
  ID_CHECK_SUCCESS,
  ID_CHECK_FAILURE,
  ID_CHECK_REQUEST,
  ID_CHECK_RESET,
  EMAIL_CHECK_REQUEST,
  EMAIL_CHECK_FAILURE,
  EMAIL_CHECK_SUCCESS,
  USER_ADDITIONAL_INFO_REQUEST,
  USER_ADDITIONAL_INFO_SUCCESS,
  USER_ADDITIONAL_INFO_FAILURE,
} from '../modules/user';

import { MY_PAGE_REQUEST } from '../modules/myPage';
import { MY_DIET_DIARY_LIST_REQUEST } from '../modules/myDiet';
import swal from 'sweetalert'; // 예쁜 alert 창을 위해 사용
// 로그인 처리
function* loadLogin(action) {
  try { // 함수안에 yield 객체만 사용 가능.
    console.log("함수 요청");
    const result = yield call(LoginAPI, action.data); // 해당 동기 함수 호출
    console.log(result);
    yield put({ type: LOG_IN_SUCCESS, data: result }); // action dispatch
    sessionStorage.setItem('jwt', result.data.accessToken); // userToken 세션스토리지 저장
    yield put({ type: MY_PAGE_REQUEST, data: result.data.accessToken }); // mypage 정보 바로 조회
    swal('로그인 성공', '  ', 'success', {
      buttons: false,
      timer: 1800,
    });
  } catch (err) {
    swal(
      '로그인 실패',
      '아이디 또는 비밀번호가 일치하지 않거나, 이메일 인증 후 로그인 시도 바랍니다.',
      'error',
      {
        buttons: false,
        timer: 2000,
      }
    );
    yield put({ type: LOG_IN_FAILURE });
  }
}

function* watchLoadLogin() {
  console.log("함수 대기");
  yield takeLatest(LOG_IN_REQUEST, loadLogin);
}
const { Kakao } = window;
var isSignUp = false;
var data = {};
function* kakaoloadLogin(action) {
  try { // 함수안에 yield 객체만 사용 가능.
    yield call(KakaoLoginAPI); // 해당 동기 함수 호출
    console.log("카카오 로그인");
    const result = Kakao.Auth.getAccessToken();
   
    const res = yield call(getUserInfoAPI); // 해당 동기 함수 호출
    const id = res.kakao_account.email.split('@');

    data= {
      id: id[0], 
      password: res.kakao_account.email, 
      name: res.properties.nickname,
      email: res.kakao_account.email,
    }
  
    yield put({ type: KAKAO_ID_CHECK_REQUEST, id:id[0] }); // id check 여부
    console.log(data);

    } catch (err) {
    yield put({ type: KAKAO_LOG_IN_FAILURE });
  }
}

function* watchKakaoLoadLogin() {
  yield takeLatest(KAKAO_LOG_IN_REQUEST, kakaoloadLogin);
}


// 카카오아이디 중복체크 처리 및 각 동기 함수 호출.
function* kakaoloadIdCheck(action) {
  isSignUp = yield call(KaKaoIdCheckAPI, { id: action.id });
  yield put({ type:  KAKAO_ID_CHECK_SUCCESS, data: isSignUp });
  console.log("카카오 아이디 체크 중복 체크 여부 " + isSignUp);
  if (isSignUp === true) { // 중복이 없다면 해당 카카오 로그인 사용자 정보 insert
    console.log("중복이 없으니 여기로 들어옴");
    yield put({ type: KAKAO_SIGN_UP_REQUEST, data }); // id check 여부
  } else if (isSignUp === false) {
    const temp = { id: data.id, pw: data.password };
    yield put({ type: KAKAO_SIGN_UP_FAILURE, data }); 
    const result_info = yield call(LoginAPI, temp); // 해당 동기 함수 호출
    console.log(result_info);
    yield put({ type: KAKAO_LOG_IN_SUCCESS, data: result_info }); // action dispatch
    sessionStorage.setItem('jwt', result_info.data.accessToken); // userToken 세션스토리지 저장
    
    swal('카카오 로그인 성공', '  ', 'success', {
      buttons: false,
      timer: 1800,
    });
  }
}

function* watchKakaoLoadIdCheck() {
  yield takeLatest(KAKAO_ID_CHECK_REQUEST, kakaoloadIdCheck);
}


// 카카오 회원가입 처리 및 로그인
function* loadKakaoSignUp(action) {
  console.log(action);
  try {
    console.log("회원가입 성공");
    const result = yield call(SignUpAPI, action.data);
    yield put({ type: KAKAO_SIGN_UP_SUCCESS, data: result });
    const temp = { id: data.id, pw: data.password };
    const result_info = yield call(LoginAPI, temp); // 해당 동기 함수 호출
    console.log(result_info);
    yield put({ type: KAKAO_LOG_IN_SUCCESS, data: result_info }); // action dispatch
    sessionStorage.setItem('jwt', result_info.data.accessToken); // userToken 세션스토리지 저장
    yield put({ type: MY_PAGE_REQUEST, data: result.data.accessToken }); // mypage 정보 바로 조회

    swal('카카오 로그인 성공', '  ', 'success', {
      buttons: false,
      timer: 1800,
    });
  } catch (err) {
    yield put({ type: KAKAO_SIGN_UP_FAILURE });
  }
}

function* watchKakaoLoadSignUp() {
  yield takeLatest(KAKAO_SIGN_UP_REQUEST, loadKakaoSignUp);
}
// 로그아웃 처리
function* loadLogout(action) {
  try {
    // const result = yield call(LogoutAPI, action.data);
    sessionStorage.clear(); // userToken 세션스토리지 삭제
    document.location.href = '/'; // 로그아웃 처리하면 새로고침 해서 세션 사라진 걸 인식 해줘야함.
    yield put({ type: LOG_OUT_SUCCESS});
  } catch (err) {
    yield put({ type: LOG_OUT_FAILURE });
  }
}

function* watchLoadLogout() {
  yield takeLatest(LOG_OUT_REQUEST, loadLogout);
}

// 회원가입 처리
function* loadSignUp(action) {
  try {
    console.log(action.data);
    const result = yield call(SignUpAPI, action.data);
    yield put({ type: SIGN_UP_SUCCESS, data: result });
    swal('회원가입 성공', '로그인을 진행하여 서비스를 즐겨보세요!', 'success');
  } catch (err) {
    yield put({ type: SIGN_UP_FAILURE });
  }
}

function* watchLoadSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, loadSignUp);
}

// 이메일 중복체크 처리
function* loadEmailCheck(action) {
  try {
    const result = yield call(EmailCheckAPI, action.data);
    alert('사용할 수 있는 이메일 입니다.');
    yield put({ type: EMAIL_CHECK_SUCCESS, data: result });
  } catch (err) {
    alert('이미 사용중이거나 사용할 수 없는 이메일 입니다.');
    yield put({ type: EMAIL_CHECK_FAILURE });
  }
}

function* watchLoadEmailCheck() {
  yield takeLatest(EMAIL_CHECK_REQUEST, loadEmailCheck);
}

// 아이디 중복체크 처리
function* loadIdCheck(action) {
  console.log(action);
  
  const result = yield call(IdCheckAPI, action.data);
  if (result === true) {
    alert('사용할 수 있는 아이디 입니다.');
    yield put({ type: ID_CHECK_SUCCESS, data: result });
  } else {
    alert('이미 사용중이거나 사용할 수 없는 아이디 입니다.');
  }
}

function* watchLoadIdCheck() {
  yield takeLatest(ID_CHECK_REQUEST, loadIdCheck);
}

function* resetIdCheck() {
  try {
    yield put({ type: ID_CHECK_RESET });
  } catch(err) {
    alert('아이디 리셋 실패');
  }
}

function* watchResetIdCheck() {
  yield takeLatest(ID_CHECK_RESET, resetIdCheck);
}

// 비밀번호 찾기 처리
function* loadFindPw(action) {
  try {
    const result = yield call(ResetPasswordAPI, action.data);
    yield put({ type: FIND_PW_SUCCESS, data: result });
    swal(
      '비밀번호 찾기 성공',
      '이메일로 임시 비밀번호가 전송되었습니다. 로그인 후 비밀번호 변경 바랍니다.',
      'success',
      {
        timer: 1500,
      }
    );
  } catch (err) {
    swal(
      '비밀번호 찾기 실패',
      '이메일 또는 이름이 일치하지 않습니다.',
      'error',
      {
        timer: 2000,
      }
    );
    yield put({ type: FIND_PW_FAILURE });
  }
}

function* watchLoadFindPw() {
  yield takeLatest(FIND_PW_REQUEST, loadFindPw);
}

function* loadAdditionalUserInfo(action) {
  try {
    const result = yield call(AdditionalUserInfoAPI, action.data);
    yield put({ type: USER_ADDITIONAL_INFO_SUCCESS, data: result});
    swal(
      '추가 정보 등록 완료!',
      '서비스를 이용해보세요 :)',
      'success',
      {
        timer: 1500,
      }
    );
  } catch (err) {
    swal(
      '추가 정보 등록 중 오류 발생',
      'error',
      {
        timer: 1500,
      }
    );
    yield put({ type: USER_ADDITIONAL_INFO_FAILURE });
  }
}

function* watchLoadAdditionalUserInfo() {
  yield takeLatest(USER_ADDITIONAL_INFO_REQUEST, loadAdditionalUserInfo);
}

export default function* UserSaga() {
  yield all([
    fork(watchKakaoLoadSignUp),
    fork(watchKakaoLoadLogin),
    fork(watchKakaoLoadIdCheck),
    fork(watchLoadLogin),
    fork(watchLoadLogout),
    fork(watchLoadSignUp),
    fork(watchLoadFindPw),
    fork(watchLoadEmailCheck),
    fork(watchLoadIdCheck),
    fork(watchResetIdCheck),
    fork(watchLoadAdditionalUserInfo),
  ]);
}
