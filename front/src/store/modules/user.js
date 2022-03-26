import produce from 'immer';
const initialState = {
  menu: 'main',
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
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

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

export const SET_MENU = 'SET_MENU';


const SET_ADDRESS = 'SET_ADDRESS';
export const setAddress = address => ({ type: SET_ADDRESS, address });

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        console.log("요청들어옴?");
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        console.log(draft.logInDone);
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
      case SET_MENU:
        draft.menu = action.data;
        break;
      default:
        break;
    }
  });
export default reducer;
