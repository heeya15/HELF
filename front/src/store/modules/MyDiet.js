import produce from "immer";

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
};

export const MY_DIET_DETAIL_REQUEST = "MY_DIET_DETAIL_REQUEST";
export const MY_DIET_DETAIL_SUCCESS = "MY_DIET_DETAIL_SUCCESS";
export const MY_DIET_DETAIL_FAILURE = "MY_DIET_DETAIL_FAILURE";
export const MY_DIET_UPDATE_REQUEST = "MY_DIET_UPDATE_REQUEST";
export const MY_DIET_UPDATE_SUCCESS = "MY_DIET_UPDATE_SUCCESS";
export const MY_DIET_UPDATE_FAILURE = "MY_DIET_UPDATE_FAILURE";

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

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MY_DIET_DETAIL_REQUEST:
        break;
      case MY_DIET_DETAIL_SUCCESS:
        draft.myDietDetail.description = action.data.data.description;
        draft.myDietDetail.diaryDate = action.data.data.diaryDate;
        draft.myDietDetail.diaryNo = action.data.data.diaryNo;
        draft.myDietDetail.imagePath = action.data.data.imagePath;
        draft.myDietDetail.mealTime = action.data.data.mealTime;
        draft.myDietDetail.mealTime = action.data.data.mealTime;
        draft.myDietDetail.dietFindResList = action.data.data.dietFindResList;
        break;
      case MY_DIET_DETAIL_FAILURE:
        break;
      case MY_DIET_UPDATE_REQUEST:
        break;
      case MY_DIET_UPDATE_SUCCESS:
        break;
      case MY_DIET_UPDATE_FAILURE:
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
      default:
        break;
    }
  });
export default reducer;
