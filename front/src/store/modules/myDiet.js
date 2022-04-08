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
  weights: [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600],
  foods: [],
  dietDetailThumbnail: null,
  dietThumbnail: null,
  imagePath: null,
  mealTime: "",
  diaryDate: "",
  description: "",
  foodName: [],
  imageDetectionLoading: false,
  imageDetectionListEmpty: false,
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
export const FOOD_LIST_REQUEST = "FOOD_LIST_REQUEST";
export const FOOD_LIST_SUCCESS = "FOOD_LIST_SUCCESS";
export const FOOD_LIST_FAILURE = "FOOD_LIST_FAILURE";

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

const SET_MY_DIET_DETAIL_THUMBNAIL = "SET_MY_DIET_DETAIL_THUMBNAIL";
export const setDietDetailThumbnail = (state) => ({
  type: SET_MY_DIET_DETAIL_THUMBNAIL,
  state,
});

const SET_FOOD_NAME = "SET_FOOD_NAME";
export const setFoodName = (state) => ({
  type: SET_FOOD_NAME,
  state,
});

const SET_FOOD_CHECK_BOX = "SET_FOOD_CHECK_BOX";
export const setFoodCheckBox = (state) => ({
  type: SET_FOOD_CHECK_BOX,
  state,
});

const SET_IMAGE_DETECTION_LIST_EMPTY = "SET_IMAGE_DETECTION_LIST_EMPTY";
export const setImageDetectionListEmpty = (state) => ({
  type: SET_IMAGE_DETECTION_LIST_EMPTY,
  state,
});

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MY_DIET_IMAGE_REQUEST:
        draft.imageDetectionLoading = true;
        draft.imageDetectionListEmpty = false;
        break;
      case MY_DIET_IMAGE_SUCCESS:
        draft.imageDetectionLoading = false;
        if (action.data.data.resultList.length === 0)
          draft.imageDetectionListEmpty = true;
        draft.foodName = [];
        action.data.data.resultList.forEach((foods) => {
          draft.foodName.push({ foodName: foods, weight: 100 });
        });
        // console.log(action.data.data);
        break;
      case MY_DIET_IMAGE_FAILURE:
        break;
      case MY_DIET_REGISTER_REQUEST:
        break;
      case MY_DIET_REGISTER_SUCCESS:
        draft.foodName = [];
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
        draft.myDietDetail.description = action.data.data.description;
        draft.myDietDetail.diaryDate = action.data.data.diaryDate;
        draft.myDietDetail.diaryNo = action.data.data.diaryNo;
        draft.myDietDetail.imagePath = action.data.data.imagePath;
        draft.myDietDetail.mealTime = action.data.data.mealTime;
        draft.myDietDetail.dietFindResList = action.data.data.dietFindResList;
        draft.dietDetailThumbnail = `${IMAGE_URL}${action.data.data.imagePath}`;
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
      case SET_MY_DIET_DETAIL_THUMBNAIL:
        draft.dietDetailThumbnail = action.state;
        break;
      case SET_FOOD_NAME:
        draft.foodName = [];
        action.state.forEach((food) => {
          draft.foodName.push({ foodName: food.foodName, weight: food.weight });
        });
        break;
      case SET_FOOD_CHECK_BOX:
        draft.foodName = [];
        action.state.forEach((food) => {
          draft.foodName.push({ foodName: food, weight: 100 });
        });
        break;
      case SET_IMAGE_DETECTION_LIST_EMPTY:
        draft.imageDetectionListEmpty = action.state;
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
      case FOOD_LIST_REQUEST:
        break;
      case FOOD_LIST_SUCCESS:
        draft.foods = [];
        action.data.data.forEach((food) => {
          draft.foods.push(food.foodName);
        });
        break;
      case FOOD_LIST_FAILURE:
        break;
      default:
        break;
    }
  });
export default reducer;
