import { ConstructionOutlined } from '@mui/icons-material';
import produce from 'immer';
const initialState = {
  me: {
    userId: '',
    userName: '',
    userPassword: '',
    gender: false,
    height: 0,
    weight: 0,
  },
  nutritionHistoryList: [],

  mymenu: 1, // 1. 나의 팬미팅 2. 추억 보관함
  meetingDetailState: false, // 이미지 상세보기 modal 버튼
  meetingRepositoryState: false, // 추억보관함 상세보기 modal 버튼
  nowId: 0, // 마이페이지 현재 선택 포스터 아이디

  myPageLoading: false, // 마이페이지 정보
  myPageDone: false,
  myPageError: false,
  updateUserInfoLoading: false, // 회원수정
  updateUserInfoDone: false,
  updateUserInfoError: false,
  deleteUserInfoLoading: false, // 회원탈퇴
  deleteUserInfoDone: false,
  deleteUserInfoError: false,
  passwordConfirmLoading: false, // 비밀번호 확인
  passwordConfirmDone: false,
  passwordConfirmError: false,
  nutritionHistoryLoading: false, // 영양 성분
  nutritionHistoryDone: false,
  nutritionHistoryError: null,
};

export const MY_PAGE_REQUEST = 'MY_PAGE_REQUEST';
export const MY_PAGE_SUCCESS = 'MY_PAGE_SUCCESS';
export const MY_PAGE_FAILURE = 'MY_PAGE_FAILURE';

export const UPDATE_USER_INFO_REQUEST = 'UPDATE_USER_INFO_REQUEST';
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_FAILURE = 'UPDATE_USER_INFO_FAILURE';
export const UPDATE_USER_INFO_RESET = 'UPDATE_USER_INFO_RESET';

export const DELETE_MEMBER_REQUEST = 'DELETE_MEMBER_REQUEST';
export const DELETE_MEMBER_SUCCESS = 'DELETE_MEMBER_SUCCESS';
export const DELETE_MEMBER_FAILURE = 'DELETE_MEMBER_FAILURE';

export const PASSWORD_CONFIRM_REQUEST = 'PASSWORD_CONFIRM_REQUEST';
export const PASSWORD_CONFIRM_SUCCESS = 'PASSWORD_CONFIRM_SUCCESS';
export const PASSWORD_CONFIRM_FAILURE = 'PASSWORD_CONFIRM_FAILURE';
export const PASSWORD_CONFIRM_RESET = 'PASSWORD_CONFIRM_RESET';

export const NUTRITION_HISTORY_REQUEST = 'NUTRITION_HISTORY_REQUEST';
export const NUTRITION_HISTORY_SUCCESS = 'NUTRITION_HISTORY_SUCCESS';
export const NUTRITION_HISTORY_FAILURE = 'NUTRITION_HISTORY_FAILURE';

const SET_MEETING_DETAIL_STATE = 'SET_MEETING_DETAIL_STATE'; // 미팅 상세보기 MODAL창 활성화 action
export const setMeetingDetailState = state => ({
  type: SET_MEETING_DETAIL_STATE,
  state,
});

const SET_MEETING_REPOSITORY_STATE = 'SET_MEETING_REPOSITORY_STATE'; // 추억보관함 MODAL창 활성화 action
export const setMeetingRepositoryState = state => ({
  type: SET_MEETING_REPOSITORY_STATE,
  state,
});

export const SET_MYMENU = 'SET_MYMENU';

const SET_NOW_ID = 'SET_NOW_ID';
export const setNowId = nowId => ({ type: SET_NOW_ID, nowId });

const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case MY_PAGE_REQUEST:
        draft.myPageLoading = true;
        draft.myPageError = null;
        draft.myPageDone = false;
        break;
      case MY_PAGE_SUCCESS:
        draft.myPageLoading = false;
        draft.myPageDone = true;
        draft.me.userId = action.data.userId;
        draft.me.userPassword = action.data.userPassword;
        draft.me.userName = action.data.userName;
        draft.me.gender = action.data.gender;
        draft.me.height = action.data.height;
        draft.me.weight = action.data.weight;
        draft.me.isLogin = action.data.isLogin;
        break;
      case MY_PAGE_FAILURE:
        draft.myPageLoading = false;
        draft.myPageError = action.error;
        break;
      case UPDATE_USER_INFO_REQUEST:
        draft.updateUserInfoLoading = true;
        draft.updateUserInfoError = null;
        draft.updateUserInfoDone = false;
        break;
      case UPDATE_USER_INFO_SUCCESS:
        draft.updateUserInfoLoading = false;
        draft.updateUserInfoDone = true;
        break;
      case UPDATE_USER_INFO_FAILURE:
        draft.updateUserInfoLoading = false;
        draft.updateUserInfoError = action.error;
        break;
      case DELETE_MEMBER_REQUEST:
        draft.deleteMemberLoading = true;
        draft.deleteMemberError = null;
        draft.deleteMemberDone = false;
        break;
      case DELETE_MEMBER_SUCCESS:
        draft.deleteMemberLoading = false;
        draft.deleteMemberDone = true;
        break;
      case DELETE_MEMBER_FAILURE:
        draft.deleteMemberLoading = false;
        draft.deleteMemberError = action.error;
        break;
      case SET_MYMENU:
        draft.mymenu = action.data; // 마이페이지 메뉴 변경
        break;
      case SET_NOW_ID:
        draft.nowId = action.nowId; // 현재 선택 포스터
        break;
      case SET_MEETING_DETAIL_STATE:
        draft.meetingDetailState = action.state;
        break;
      case SET_MEETING_REPOSITORY_STATE:
        draft.meetingRepositoryState = action.state;
        break;
      case PASSWORD_CONFIRM_REQUEST:
        draft.passwordConfirmLoading = true;
        draft.passwordConfirmError = null;
        draft.passwordConfirmDone = false;
        break;
      case PASSWORD_CONFIRM_SUCCESS:
        draft.passwordConfirmLoading = false;
        draft.passwordConfirmDone = true;
        break;
      case PASSWORD_CONFIRM_FAILURE:
        draft.passwordConfirmLoading = false;
        draft.passwordConfirmError = action.error;
        break;
      case PASSWORD_CONFIRM_RESET:
        draft.passwordConfirmLoading = false;
        draft.passwordConfirmError = null;
        draft.passwordConfirmDone = false;
        break;
      case UPDATE_USER_INFO_RESET:
        draft.updateUserInfoLoading = true;
        draft.updateUserInfoError = null;
        draft.updateUserInfoDone = false;
        draft.passwordConfirmLoading = false;
        draft.passwordConfirmError = null;
        draft.passwordConfirmDone = false;
        break;
      case NUTRITION_HISTORY_REQUEST:
        draft.nutritionHistoryLoading = true;
        draft.nutritionHistoryDone = false;
        draft.nutritionHistoryError = null;
        break;
      case NUTRITION_HISTORY_SUCCESS:
        draft.nutritionHistoryLoading = false;
        draft.nutritionHistoryDone = true;
        draft.nutritionHistoryList = action.data;
        break;
      case NUTRITION_HISTORY_FAILURE:
        draft.nutritionHistoryLoading = false;
        draft.nutritionHistoryError = action.error;
        break;
      default:
        break;
    }
  });
export default reducer;
