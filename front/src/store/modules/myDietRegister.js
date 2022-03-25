import { DirectionsRailwayFilled } from "@mui/icons-material";
import produce from "immer";
const initialState = {
  dietThumbnail: null,
  imagePath: null,
  mealTime: "",
  diaryDate: "",
  description: "",
  foodName: [],
  myDietDiaryList: [],
  myDietDiaryDailyInfo: [],
  myDietDiaryDailyInfoCopy: [],
  // 식단 일지 삭제 
  myDietDiaryDeleteLoading: false,
  myDietDiaryDeleteDone: false,
  myDietDiaryDeleteError: null,

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
export const MY_DIET_DIARY_DAILY_INFO_REQUEST = "MY_DIET_DIARY_DAILY_INFO_REQUEST";
export const MY_DIET_DIARY_DAILY_INFO_SUCCESS = "MY_DIET_DIARY_DAILY_INFO_SUCCESS";
export const MY_DIET_DIARY_DAILY_INFO_FAILURE = "MY_DIET_DIARY_DAILY_INFO_FAILURE";

export const MY_DIET_DIARY_DELETE_REQUEST = "MY_DIET_DIARY_DELETE_REQUEST";
export const MY_DIET_DIARY_DELETE_SUCCESS = "MY_DIET_DIARY_DELETE_SUCCESS";
export const MY_DIET_DIARY_DELETE_FAILURE = "MY_DIET_DIARY_DELETE_FAILURE";


const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MY_DIET_IMAGE_REQUEST:
        break;
      case MY_DIET_IMAGE_SUCCESS:
        action.forEach((foods) => {
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
      default:
        break;
    }
  });
export default reducer;
