import produce from "immer";
const initialState = {
  me: {
    userId: "",
    userName: "",
    userPassword: "",
    userEmail: "",
    gender: false,
    height: 0,
    weight: 0,
    birthday: "",
  },
  nutritionHistoryList: [],
  weightHistoryList: [],

  myPageLikeList: [],

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

  weightHistoryLoading: false, // 몸무게 히스토리 읽기
  weightHistoryDone: false,
  weightHistoryError: null,

  updateWeightHistoryInfoLoading: false, // 몸무게 히스토리 수정
  updateWeightHistoryInfoDone: false,
  updateWeightHistoryInfoError: false,

  registerweightHistoryLoading: false, // 몸무게 히스토리 등록 히스토리
  registerweightHistoryDone: false,
  registerweightHistoryError: null,

  deleteWeightHistoryInfoLoading: false, // 몸무게 히스토리 삭제
  deleteWeightHistoryInfoDone: false,
  deleteWeightHistoryInfoError: false,
};

export const MY_PAGE_REQUEST = "MY_PAGE_REQUEST";
export const MY_PAGE_SUCCESS = "MY_PAGE_SUCCESS";
export const MY_PAGE_FAILURE = "MY_PAGE_FAILURE";

export const UPDATE_USER_INFO_REQUEST = "UPDATE_USER_INFO_REQUEST";
export const UPDATE_USER_INFO_SUCCESS = "UPDATE_USER_INFO_SUCCESS";
export const UPDATE_USER_INFO_FAILURE = "UPDATE_USER_INFO_FAILURE";
export const UPDATE_USER_INFO_RESET = "UPDATE_USER_INFO_RESET";

export const DELETE_MEMBER_REQUEST = "DELETE_MEMBER_REQUEST";
export const DELETE_MEMBER_SUCCESS = "DELETE_MEMBER_SUCCESS";
export const DELETE_MEMBER_FAILURE = "DELETE_MEMBER_FAILURE";

export const PASSWORD_CONFIRM_REQUEST = "PASSWORD_CONFIRM_REQUEST";
export const PASSWORD_CONFIRM_SUCCESS = "PASSWORD_CONFIRM_SUCCESS";
export const PASSWORD_CONFIRM_FAILURE = "PASSWORD_CONFIRM_FAILURE";
export const PASSWORD_CONFIRM_RESET = "PASSWORD_CONFIRM_RESET";

export const NUTRITION_HISTORY_REQUEST = "NUTRITION_HISTORY_REQUEST";
export const NUTRITION_HISTORY_SUCCESS = "NUTRITION_HISTORY_SUCCESS";
export const NUTRITION_HISTORY_FAILURE = "NUTRITION_HISTORY_FAILURE";

export const WEIGHT_HISTORY_REQUEST = "WEIGHT_HISTORY_REQUEST";
export const WEIGHT_HISTORY_SUCCESS = "WEIGHT_HISTORY_SUCCESS";
export const WEIGHT_HISTORY_FAILURE = "WEIGHT_HISTORY_FAILURE";

export const REGISTER_WEIGHT_HISTORY_REQUEST =
  "REGISTER_WEIGHT_HISTORY_REQUEST";
export const REGISTER_WEIGHT_HISTORY_SUCCESS =
  "REGISTER_WEIGHT_HISTORY_SUCCESS";
export const REGISTER_WEIGHT_HISTORY_FAILURE =
  "REGISTER_WEIGHT_HISTORY_FAILURE";

export const UPDATE_WEIGHT_HISTORY_REQUEST = "UPDATE_WEIGHT_HISTORY_REQUEST";
export const UPDATE_WEIGHT_HISTORY_SUCCESS = "UPDATE_WEIGHT_HISTORY_SUCCESS";
export const UPDATE_WEIGHT_HISTORY_FAILURE = "UPDATE_WEIGHT_HISTORY_FAILURE";
export const UPDATE_WEIGHT_HISTORY_RESET = "UPDATE_WEIGHT_HISTORY_RESET";

export const DELETE_WEIGHT_HISTORY_REQUEST = "DELETE_WEIGHT_HISTORY_REQUEST";
export const DELETE_WEIGHT_HISTORY_SUCCESS = "DELETE_WEIGHT_HISTORY_SUCCESS";
export const DELETE_WEIGHT_HISTORY_FAILURE = "DELETE_WEIGHT_HISTORY_FAILURE";
export const DELETE_WEIGHT_HISTORY_RESET = "DELETE_WEIGHT_HISTORY_RESET";

export const MY_PAGE_LIKE_REQUEST = "MY_PAGE_LIKE_REQUEST";
export const MY_PAGE_LIKE_SUCCESS = "MY_PAGE_LIKE_SUCCESS";
export const MY_PAGE_LIKE_FAILURE = "MY_PAGE_LIKE_FAILURE";

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
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
        draft.me.userEmail = action.data.userEmail;
        draft.me.userName = action.data.userName;
        draft.me.gender = action.data.gender;
        draft.me.height = action.data.height;
        draft.me.weight = action.data.weight;
        draft.me.birthday = action.data.birthday;
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
      case WEIGHT_HISTORY_REQUEST:
        draft.weightHistoryLoading = true;
        draft.weightHistoryDone = false;
        draft.weightHistoryError = null;
        break;
      case WEIGHT_HISTORY_SUCCESS:
        draft.weightHistoryLoading = false;
        draft.weightHistoryDone = true;
        draft.weightHistoryList = action.data;
        break;
      case WEIGHT_HISTORY_FAILURE:
        draft.weightHistoryLoading = false;
        draft.weightHistoryError = action.error;
        break;
      case REGISTER_WEIGHT_HISTORY_REQUEST:
        draft.registerweightHistoryLoading = true;
        draft.registerweightHistoryError = null;
        draft.registerweightHistoryDone = false;
        break;
      case REGISTER_WEIGHT_HISTORY_SUCCESS:
        draft.registerweightHistoryLoading = false;
        draft.registerweightHistoryDone = true;
        break;
      case REGISTER_WEIGHT_HISTORY_FAILURE:
        draft.registerweightHistoryLoading = false;
        draft.registerweightHistoryError = action.error;
        break;

      case UPDATE_WEIGHT_HISTORY_REQUEST:
        draft.updateWeightHistoryInfoLoading = true;
        draft.updateWeightHistoryInfoErrorr = null;
        draft.updateWeightHistoryInfoDone = false;
        break;
      case UPDATE_WEIGHT_HISTORY_SUCCESS:
        draft.updateWeightHistoryInfoLoading = false;
        draft.updateWeightHistoryInfoDone = true;
        break;
      case UPDATE_WEIGHT_HISTORY_FAILURE:
        draft.updateWeightHistoryInfoLoading = false;
        draft.updateWeightHistoryInfoError = action.error;
        break;
      case UPDATE_WEIGHT_HISTORY_RESET:
        draft.updateWeightHistoryInfoLoading = false;
        draft.updateWeightHistoryInfoErrorr = null;
        draft.updateWeightHistoryInfoDone = false;
        break;

      case DELETE_WEIGHT_HISTORY_REQUEST:
        draft.deleteWeightHistoryInfoLoading = true;
        draft.deleteWeightHistoryInfoError = null;
        draft.deleteWeightHistoryInfoDone = false;
        break;
      case DELETE_WEIGHT_HISTORY_SUCCESS:
        draft.deleteWeightHistoryInfoLoading = false;
        draft.deleteWeightHistoryInfoDone = true;
        break;
      case DELETE_WEIGHT_HISTORY_FAILURE:
        draft.deleteWeightHistoryInfoLoading = false;
        draft.deleteWeightHistoryInfoError = action.error;
        break;
      case DELETE_WEIGHT_HISTORY_RESET:
        draft.deleteWeightHistoryInfoLoading = false;
        draft.deleteWeightHistoryInfoError = null;
        draft.deleteWeightHistoryInfoDone = false;
        break;
      case MY_PAGE_LIKE_REQUEST:
        break;
      case MY_PAGE_LIKE_SUCCESS:
        draft.myPageLikeList = action.data.data;
        break;
      case MY_PAGE_LIKE_FAILURE:
        break;
      default:
        break;
    }
  });
export default reducer;
