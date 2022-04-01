import produce from "immer";
import { IMAGE_URL } from "../../utils/https";

const initialState = {
  myDietDetail: {
    imagePath: null,
    diaryNo: "",
    diaryDate: "",
    mealTime: "",
    description: "",
    isShared: false,
    dietFindResList: [],
  },
  weights: [100, 150, 200, 250, 300],
  dietDetailThumbnail: null,
  dietThumbnail: null,
  imagePath: null,
  mealTime: "",
  diaryDate: "",
  description: "",
  foodName: [
    { name: "토마토", weight: 100 },
    { name: "닭가슴살", weight: 100 },
  ],
  myDietDiaryList: [],
  myDietDiaryDailyInfo: [],
  myDietDiaryDailyInfoCopy: [],
  // 식단 일지 삭제
  myDietDiaryDeleteLoading: false,
  myDietDiaryDeleteDone: false,
  myDietDiaryDeleteError: null,
  // 식단 일지
  diaryShareLoading: false,
  diaryShareDone: false,
  diaryshareError: null,
};

export const MY_DIET_IMAGE_REQUEST = "MY_DIET_IMAGE_REQUEST";
export const MY_DIET_IMAGE_SUCCESS = "MY_DIET_IMAGE_SUCCESS";
export const MY_DIET_IMAGE_FAILURE = "MY_DIET_IMAGE_FAILURE";
export const MY_DIET_REGISTER_REQUEST = "MY_DIET_REGISTER_REQUEST";
export const MY_DIET_REGISTER_SUCCESS = "MY_DIET_REGISTER_SUCCESS";
export const MY_DIET_REGISTER_FAILURE = "MY_DIET_REGISTER_FAILURE";
export const MY_DIET_DIARY_LIST_REQUEST = "MY_DIET_DIARY_LIST_REQUEST";
export const MY_DIET_DIARY_LIST_SUCCESS = "MY_DIET_DIARY_LIST_SUCCESS";
export const MY_DIET_DIARY_LIST_FAILURE = "MY_DIET_DIARY_LIST_FAILURE";
export const MY_DIET_DIARY_DAILY_INFO_REQUEST =
  "MY_DIET_DIARY_DAILY_INFO_REQUEST";
export const MY_DIET_DIARY_DAILY_INFO_SUCCESS =
  "MY_DIET_DIARY_DAILY_INFO_SUCCESS";
export const MY_DIET_DIARY_DAILY_INFO_FAILURE =
  "MY_DIET_DIARY_DAILY_INFO_FAILURE";
export const MY_DIET_DETAIL_REQUEST = "MY_DIET_DETAIL_REQUEST";
export const MY_DIET_DETAIL_SUCCESS = "MY_DIET_DETAIL_SUCCESS";
export const MY_DIET_DETAIL_FAILURE = "MY_DIET_DETAIL_FAILURE";
export const MY_DIET_UPDATE_REQUEST = "MY_DIET_UPDATE_REQUEST";
export const MY_DIET_UPDATE_SUCCESS = "MY_DIET_UPDATE_SUCCESS";
export const MY_DIET_UPDATE_FAILURE = "MY_DIET_UPDATE_FAILURE";
export const MY_DIET_DIARY_DELETE_REQUEST = "MY_DIET_DIARY_DELETE_REQUEST";
export const MY_DIET_DIARY_DELETE_SUCCESS = "MY_DIET_DIARY_DELETE_SUCCESS";
export const MY_DIET_DIARY_DELETE_FAILURE = "MY_DIET_DIARY_DELETE_FAILURE";
export const MY_DIET_DIARY_SHARE_REQUEST = "MY_DIET_DIARY_SHARE_REQUEST";
export const MY_DIET_DIARY_SHARE_SUCCESS = "MY_DIET_DIARY_SHARE_SUCCESS";
export const MY_DIET_DIARY_SHARE_FAILURE = "MY_DIET_DIARY_SHARE_REQUEST";

const SET_MY_DIET_WEIGHT = "SET_MY_DIET_WEIGHT";
export const setmyDietWeight = (state) => ({
  type: SET_MY_DIET_WEIGHT,
  state,
});

const SET_MY_DIET_DETAIL_IMAGEPATH = "SET_MY_DIET_DETAIL_IMAGEPATH";
export const setMyDietDetailImagePath = (state) => ({
  type: SET_MY_DIET_DETAIL_IMAGEPATH,
  state,
});

const SET_MY_DIET_DETAIL_MEALTIME = "SET_MY_DIET_DETAIL_MEALTIME";
export const setDietDetailMealTime = (state) => ({
  type: SET_MY_DIET_DETAIL_MEALTIME,
  state,
});

const SET_MY_DIET_DETAIL_DIARYDATE = "SET_MY_DIET_DETAIL_DIARYDATE";
export const setDietDetailDiaryDate = (state) => ({
  type: SET_MY_DIET_DETAIL_DIARYDATE,
  state,
});

const SET_MY_DIET_DETAIL_DESCRIPTION = "SET_MY_DIET_DETAIL_DESCRIPTION";
export const setDietDetailDescription = (state) => ({
  type: SET_MY_DIET_DETAIL_DESCRIPTION,
  state,
});

const SET_MY_DIET_DETAIL_REGISTERREQLIST = "SET_MY_DIET_DETAIL_REGISTERREQLIST";
export const setDietDetailDietRegisterReqList = (state) => ({
  type: SET_MY_DIET_DETAIL_REGISTERREQLIST,
  state,
});

const SET_MY_DIET_DETAIL_THUMBNAIL = "SET_MY_DIET_DETAIL_THUMBNAIL";
export const setDietDetailThumbnail = (state) => ({
  type: SET_MY_DIET_DETAIL_THUMBNAIL,
  state,
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MY_DIET_IMAGE_REQUEST:
        break;
      case MY_DIET_IMAGE_SUCCESS:
        action.data.data.forEach((foods) => {
          draft.foodName.push(foods);
        });
        break;
      case MY_DIET_IMAGE_FAILURE:
        break;
      case MY_DIET_REGISTER_REQUEST:
        break;
      case MY_DIET_REGISTER_SUCCESS:
        break;
      case MY_DIET_REGISTER_FAILURE:
        break;
      case MY_DIET_DIARY_LIST_REQUEST:
        break;
      case MY_DIET_DIARY_LIST_SUCCESS:
        draft.myDietDiaryList = action.data;
        break;
      case MY_DIET_DIARY_LIST_FAILURE:
        break;
      case MY_DIET_DIARY_DAILY_INFO_REQUEST:
        break;
      case MY_DIET_DIARY_DAILY_INFO_SUCCESS:
        draft.myDietDiaryDailyInfo = action.data;
        break;
      case MY_DIET_DIARY_DAILY_INFO_FAILURE:
        break;
      case MY_DIET_DETAIL_REQUEST:
        break;
      case MY_DIET_DETAIL_SUCCESS:
        draft.myDietDetail.description = action.data.data.description;
        draft.myDietDetail.diaryDate = action.data.data.diaryDate;
        draft.myDietDetail.diaryNo = action.data.data.diaryNo;
        draft.myDietDetail.imagePath = action.data.data.imagePath;
        draft.myDietDetail.mealTime = action.data.data.mealTime;
        draft.myDietDetail.dietFindResList = action.data.data.dietFindResList;
        draft.dietDetailThumbnail = `${IMAGE_URL}${action.data.data.imagePath}`;
        break;
      case MY_DIET_DETAIL_FAILURE:
        break;
      case MY_DIET_UPDATE_REQUEST:
        break;
      case MY_DIET_UPDATE_SUCCESS:
        break;
      case MY_DIET_UPDATE_FAILURE:
        break;
      case MY_DIET_DIARY_DELETE_REQUEST:
        draft.myDietDiaryDeleteLoading = true;
        draft.myDietDiaryDeleteDone = false;
        break;
      case MY_DIET_DIARY_DELETE_SUCCESS:
        draft.myDietDiaryDeleteLoading = false;
        draft.myDietDiaryDeleteDone = true;
        break;
      case MY_DIET_DIARY_DELETE_FAILURE:
        draft.myDietDiaryDeleteLoading = false;
        draft.myDietDiaryDeleteError = action.error;
        break;
      case SET_MY_DIET_WEIGHT:
        draft.foodName[action.state.index].weight = action.state.weight;
        break;
      case SET_MY_DIET_DETAIL_IMAGEPATH:
        draft.myDietDetail.imagePath = action.state;
        break;
      case SET_MY_DIET_DETAIL_MEALTIME:
        draft.myDietDetail.mealTime = action.state;
        break;
      case SET_MY_DIET_DETAIL_DIARYDATE:
        draft.myDietDetail.diaryDate = action.state;
        break;
      case SET_MY_DIET_DETAIL_DESCRIPTION:
        draft.myDietDetail.description = action.state;
        break;
      case SET_MY_DIET_DETAIL_REGISTERREQLIST:
        draft.myDietDetail.dietFindResList = action.state;
        break;
      case SET_MY_DIET_DETAIL_THUMBNAIL:
        draft.dietDetailThumbnail = action.state;
        break;
      case MY_DIET_DIARY_SHARE_REQUEST:
        draft.diaryShareLoading = true;
        draft.diaryShareDone = false;
        draft.diaryShareError = null;
        break;
      case MY_DIET_DIARY_SHARE_SUCCESS:
        draft.diaryShareLoading = false;
        draft.diaryShareDone = true;
        break;
      case MY_DIET_DIARY_SHARE_FAILURE:
        draft.diaryShareLoading = false;
        draft.diaryShareError = action.error;
        break;
      default:
        break;
    }
  });
export default reducer;
