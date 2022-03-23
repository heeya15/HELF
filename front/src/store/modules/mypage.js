import produce from 'immer';
const initialState = {
  me: {
    memberId: 0,
    code: 0,
    managerCode: 0,
    email: '',
    name: '',
    nick: '',
    phone: '',
    address: '',
    birth: '',
    gender: '',
    isLogin: '',
  },
  mymenu: 1, // 1. 나의 팬미팅 2. 추억 보관함
  meetingDetailState: false, // 이미지 상세보기 modal 버튼
  meetingRepositoryState: false, // 추억보관함 상세보기 modal 버튼
  nowId: 0, // 마이페이지 현재 선택 포스터 아이디

  myPageLoading: false, // 마이페이지 정보
  myPageDone: false,
  myPageError: false,
  updateMemberLoading: false, // 회원수정
  updateMemberDone: false,
  updateMemberError: false,
  deleteMemberLoading: false, // 회원탈퇴
  deleteMemberDone: false,
  deleteMemberError: false,
};

export const MY_PAGE_REQUEST = 'MY_PAGE_REQUEST';
export const MY_PAGE_SUCCESS = 'MY_PAGE_SUCCESS';
export const MY_PAGE_FAILURE = 'MY_PAGE_FAILURE';

export const UPDATE_MEMBER_REQUEST = 'UPDATE_MEMBER_REQUEST';
export const UPDATE_MEMBER_SUCCESS = 'UPDATE_MEMBER_SUCCESS';
export const UPDATE_MEMBER_FAILURE = 'UPDATE_MEMBER_FAILURE';

export const DELETE_MEMBER_REQUEST = 'DELETE_MEMBER_REQUEST';
export const DELETE_MEMBER_SUCCESS = 'DELETE_MEMBER_SUCCESS';
export const DELETE_MEMBER_FAILURE = 'DELETE_MEMBER_FAILURE';

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
        draft.me.memberId = action.data.userId;
        draft.me.email = action.data.userEmail;
        draft.me.name = action.data.userName;
        // draft.me.nick = action.data.memberNick;
        // draft.me.phone = action.data.memberPhone;
        // draft.me.address = action.data.memberAddress;
        // draft.me.birth = action.data.memberBirth;
        // draft.me.gender = action.data.memberGender;
        draft.me.isLogin = action.data.isLogin;
        break;
      case MY_PAGE_FAILURE:
        draft.myPageLoading = false;
        draft.myPageError = action.error;
        break;
      case UPDATE_MEMBER_REQUEST:
        draft.updateMemberLoading = true;
        draft.updateMemberError = null;
        draft.updateMemberDone = false;
        break;
      case UPDATE_MEMBER_SUCCESS:
        draft.updateMemberLoading = false;
        draft.updateMemberDone = true;
        break;
      case UPDATE_MEMBER_FAILURE:
        draft.updateMemberLoading = false;
        draft.updateMemberError = action.error;
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
        console.log(action.data);
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
      default:
        break;
    }
  });
export default reducer;
