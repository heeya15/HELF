import produce from 'immer';
const initialState = {
  menu: 'main',
  kakaologInLoading: false, // 로그인 시도중
  kakaologInDone: false,
  kakaologInError: null,
  kakaologOutLoading: false, // 로그아웃 시도중
  kakaologOutDone: false,
  kakaologOutError: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  emailCheckLoading: false, // 이메일 인증시도중
  emailCheckDone: false,
  emailCheckError: null,
  idCheckLoading: false, // 아이디 중복체크 시도중
  idCheckDone: false,
  idCheckError: null,
  findPwLoading: false, // 비밀번호 시도중
  findPwDone: false,
  findPwError: null,
  userAdditionalInfoLoading: false,   // 유저 추가 정보
  userAdditionalInfoDone: false,
  userAdditionalInfoError: null,
};

export const KAKAO_LOG_IN_REQUEST = 'KAKAO_LOG_IN_REQUEST';
export const KAKAO_LOG_IN_SUCCESS = 'KAKAO_LOG_IN_SUCCESS';
export const KAKAO_LOG_IN_FAILURE = 'KAKAO_LOG_IN_FAILURE';

export const KAKAO_LOG_OUT_REQUEST = 'KAKAO_LOG_OUT_REQUEST';
export const KAKAO_LOG_OUT_SUCCESS = 'KAKAO_LOG_OUT_SUCCESS';
export const KAKAO_LOG_OUT_FAILURE = 'KAKAO_LOG_OUT_FAILURE';

export const KAKAO_SIGN_UP_REQUEST = 'KAKAO_SIGN_UP_REQUEST';
export const KAKAO_SIGN_UP_SUCCESS = 'KAKAO_SIGN_UP_SUCCESS';
export const KAKAO_SIGN_UP_FAILURE = 'KAKAO_SIGN_UP_FAILURE';

export const KAKAO_ID_CHECK_REQUEST = 'KAKAO_ID_CHECK_REQUEST';
export const KAKAO_ID_CHECK_SUCCESS = 'KAKAO_ID_CHECK_SUCCESS';
export const KAKAO_ID_CHECK_FAILURE = 'KAKAO_ID_CHECK_FAILURE';
export const KAKAO_ID_CHECK_RESET = 'KAKAO_ID_CHECK_RESET';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const SIGN_UP_RESET = 'SIGN_UP_RESET';

export const EMAIL_CHECK_REQUEST = 'EMAIL_CHECK_REQUEST';
export const EMAIL_CHECK_SUCCESS = 'EMAIL_CHECK_SUCCESS';
export const EMAIL_CHECK_FAILURE = 'EMAIL_CHECK_FAILURE';

export const ID_CHECK_REQUEST = 'ID_CHECK_REQUEST';
export const ID_CHECK_SUCCESS = 'ID_CHECK_SUCCESS';
export const ID_CHECK_FAILURE = 'ID_CHECK_FAILURE';
export const ID_CHECK_RESET = 'ID_CHECK_RESET';

export const FIND_PW_REQUEST = 'FIND_PW_REQUEST';
export const FIND_PW_SUCCESS = 'FIND_PW_SUCCESS';
export const FIND_PW_FAILURE = 'FIND_PW_FAILURE';

export const USER_ADDITIONAL_INFO_REQUEST = 'USER_ADDITIONAL_INFO_REQUEST';
export const USER_ADDITIONAL_INFO_SUCCESS = 'USER_ADDITIONAL_INFO_SUCCESS';
export const USER_ADDITIONAL_INFO_FAILURE = 'USER_ADDITIONAL_INFO_FAILURE';

export const SET_MENU = 'SET_MENU';


const SET_ADDRESS = 'SET_ADDRESS';
export const setAddress = address => ({ type: SET_ADDRESS, address });

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case KAKAO_LOG_IN_REQUEST:
        draft.kakaologInLoading = true;
        draft.kakaologInError = null;
        draft.kakaologInDone = false;
        break;
      case KAKAO_LOG_IN_SUCCESS:
        draft.kakaologInLoading = false;
        draft.kakaologInDone = true;
        break;
      case KAKAO_LOG_IN_FAILURE:
        draft.kakaologInLoading = false;
        draft.kakaologInError = action.error;
        break;
      case KAKAO_LOG_OUT_REQUEST:
        draft.kakaologOutLoading = true;
        draft.kakaologOutError = null;
        draft.kakaologOutDone = false;
        break;
      case KAKAO_LOG_OUT_SUCCESS:
        draft.kakaologOutLoading = false;
        draft.kakaologOutDone = true;
        draft.me = null;
        break;
      case KAKAO_LOG_OUT_FAILURE:
        draft.kakaologOutLoading = false;
        draft.kakaologOutError = action.error;
        break;
      case KAKAO_SIGN_UP_REQUEST: // 카카오 signup 요청
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case KAKAO_SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        draft.nickCheckDone = false; // 닉네임 수정 중복확인을 위해 회원가입 후 nickCheckDone 초기화
        break;
      case KAKAO_SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case KAKAO_ID_CHECK_REQUEST:
        draft.idCheckLoading = true;
        draft.idCheckError = null;
        draft.idCheckDone = false;
        break;
      case KAKAO_ID_CHECK_SUCCESS:
        draft.idCheckLoading = false;
        draft.idCheckDone = true;
        break;
      case KAKAO_ID_CHECK_FAILURE:
        draft.idCheckLoading = false;
        draft.idCheckError = action.error;
        break;
      case KAKAO_ID_CHECK_RESET:
        draft.idCheckLoading = false;
        draft.idCheckDone = false;
        draft.idCheckError = null;
        break;
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        draft.nickCheckDone = false; // 닉네임 수정 중복확인을 위해 회원가입 후 nickCheckDone 초기화
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case SIGN_UP_RESET:
        draft.signUpLoading = false;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case EMAIL_CHECK_REQUEST:
        draft.emailCheckLoading = true;
        draft.emailCheckError = null;
        draft.emailCheckDone = false;
        break;
      case EMAIL_CHECK_SUCCESS:
        draft.emailCheckLoading = false;
        draft.emailCheckDone = true;
        break;
      case EMAIL_CHECK_FAILURE:
        draft.emailCheckLoading = false;
        draft.emailCheckError = action.error;
        break;
      case ID_CHECK_REQUEST:
        draft.idCheckLoading = true;
        draft.idCheckError = null;
        draft.idCheckDone = false;
        break;
      case ID_CHECK_SUCCESS:
        draft.idCheckLoading = false;
        draft.idCheckDone = true;
        break;
      case ID_CHECK_FAILURE:
        draft.idCheckLoading = false;
        draft.idCheckError = action.error;
        break;
      case ID_CHECK_RESET:
        draft.idCheckLoading = false;
        draft.idCheckDone = false;
        draft.idCheckError = null;
        break;
      case FIND_PW_REQUEST:
        draft.findPwLoading = true;
        draft.findPwError = null;
        draft.findPwDone = false;
        break;
      case FIND_PW_SUCCESS:
        draft.findPwLoading = false;
        draft.findPwDone = true;
        break;
      case FIND_PW_FAILURE:
        draft.findPwLoading = false;
        draft.findPwError = action.error;
        break;
      case USER_ADDITIONAL_INFO_REQUEST:
        draft.userAdditionalInfoLoading = true;
        draft.userAdditionalInfoDone = false;
        draft.userAdditionalInfoError = null;
        break;
      case USER_ADDITIONAL_INFO_SUCCESS:
        draft.userAdditionalInfoLoading = false;
        draft.userAdditionalInfoDone = true;
        break;
      case USER_ADDITIONAL_INFO_FAILURE:
        draft.userAdditionalInfoLoading = false;
        draft.userAdditionalInfoError = action.error;
        break;
      case SET_MENU:
        draft.menu = action.data;
        break;
      default:
        break;
    }
  });
export default reducer;
