import produce from 'immer';

const initialState = {
  // 식단 일지 공유 게시판에 등록
  shareBoardRegisterLoading: false,
  shareBoardRegisterDone: false,
  shareBoardRegisterError: null,

  // 해당 공유 게시글 상세 조회시 조회수 증가
  shareBoardDetailHitIncreaseLoading: false,
  shareBoardDetailHitIncreaseDone: false,
  shareBoardDetailHitIncreaseError: null,

  //  해당 공유 게시글 상세 조회
  shareBoardDetailSelectLoading: false,
  shareBoardDetailSelectDone: false,
  shareBoardDetailSelectError: null,
  shareBoardDetailList: [],
  detailimagePath: null,
  detaildescription: null,
  shareUserName : '',
  shareUserId : null, // 공유한 사람의 아이디
  shareDiaryNo: 0,

  //  해당 공유 게시판 description 수정
  shareBoardUpdateLoading: false,
  shareBoardUpdateDone: false,
  shareBoardUpdateError: null,

  // 베스트 식단 조회
  shareBoardTopLikeLoading: false,
  shareBoardTopLikeDone: false,
  shareBoardTopLikeError: null,
  shareBoardTopLikeList: [],

  // 총 좋아요 개수와, 로그인 USER가 해당 공유 게시글 좋아요 여부 체크
  shareBoardIsLikeAndTotalLikeCountLoading: false,
  shareBoardIsLikeAndTotalLikeCountDone: false,
  shareBoardIsLikeAndTotalLikeCountError: null,
  isLike: false,
  totalLikeCount: 0,

  // 해당 공유 게시글 좋아요 하기
  shareBoardLikeLoading: false,
  shareBoardLikeDone: false,
  shareBoardLikeError: null,

  // 공유 게시글 삭제 (공유 해제)
  shareBoardDeleteLoading: false,
  shareBoardDeleteDone: false,
  shareBoardDeleteError: null,
};

// 게시글 등록
export const SHARE_BOARD_REGISTER_REQUEST = 'SHARE_BOARD_REGISTER_REQUEST';
export const SHARE_BOARD_REGISTER_SUCCESS = 'SHARE_BOARD_REGISTER_SUCCESS';
export const SHARE_BOARD_REGISTER_FAILURE = 'SHARE_BOARD_REGISTER_FAILURE';

// 게시글 좋아요 정보 조회
export const SHARE_BOARD_LIKE_REQUEST = 'SHARE_BOARD_LIKE_REQUEST';
export const SHARE_BOARD_LIKE_SUCCESS = 'SHARE_BOARD_LIKE_SUCCESS';
export const SHARE_BOARD_LIKE_FAILURE = 'SHARE_BOARD_LIKE_FAILURE';
export const SHARE_BOARD_LIKE_RESET = 'SHARE_BOARD_LIKE_RESET';

// 총 좋아요 개수와, 로그인 USER가 해당 공유 게시글 좋아요 여부 체크
export const SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_REQUEST = 'SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_REQUEST';
export const SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_SUCCESS = 'SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_SUCCESS';
export const SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_FAILURE = 'SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_FAILURE';
export const SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_RESET = 'SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_RESET';

// 해당 게시글 좋아요 하기
export const SHARE_BOARD_LIKE_REGISTER_REQUEST = 'SHARE_BOARD_LIKE_REGISTER_REQUEST';
export const SHARE_BOARD_LIKE_REGISTER_SUCCESS = 'SHARE_BOARD_LIKE_REGISTER_SUCCESS';
export const SHARE_BOARD_LIKE_REGISTER_FAILURE = 'SHARE_BOARD_LIKE_REGISTER_FAILURE';
export const SHARE_BOARD_LIKE_REGISTER_RESET = 'SHARE_BOARD_LIKE_REGISTER_RESET';

// 해당 게시글 discription 수정
export const SHARE_BOARD_UPDATE_REQUEST = 'SHARE_BOARD_UPDATE_REQUEST';
export const SHARE_BOARD_UPDATE_SUCCESS = 'SHARE_BOARD_UPDATE_SUCCESS';
export const SHARE_BOARD_UPDATE_FAILURE = 'SHARE_BOARD_UPDATE_FAILURE';
export const SHARE_BOARD_UPDATE_RESET = 'SHARE_BOARD_UPDATE_RESET';

// 해당 게시글 조회수 증가
export const SHARE_BOARD_DETAIL_HIT_INCREASE_REQUEST = 'SHARE_BOARD_DETAIL_HIT_INCREASE_REQUEST';
export const SHARE_BOARD_DETAIL_HIT_INCREASE_SUCCESS = 'SHARE_BOARD_DETAIL_HIT_INCREASE_SUCCESS';
export const SHARE_BOARD_DETAIL_HIT_INCREASE_FAILURE = 'SHARE_BOARD_DETAIL_HIT_INCREASE_FAILURE';

// 해당 게시글 상세 조회
export const SHARE_BOARD_DETAIL_SELECT_REQUEST = 'SHARE_BOARD_DETAIL_SELECT_REQUEST';
export const SHARE_BOARD_DETAIL_SELECT_SUCCESS = 'SHARE_BOARD_DETAIL_SELECT_SUCCESS';
export const SHARE_BOARD_DETAIL_SELECT_FAILURE = 'SHARE_BOARD_DETAIL_SELECT_FAILURE';
export const SHARE_BOARD_DETAIL_SELECT_RESET = 'SHARE_BOARD_DETAIL_SELECT_RESET';

// 게시글 삭제 (공유 해제)
export const SHARE_BOARD_DELETE_REQUEST = 'SHARE_BOARD_DELETE_REQUEST';
export const SHARE_BOARD_DELETE_SUCCESS = 'SHARE_BOARD_DELETE_SUCCESS';
export const SHARE_BOARD_DELETE_FAILURE = 'SHARE_BOARD_DELETE_FAILURE';


const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SHARE_BOARD_REGISTER_REQUEST:
        draft.shareBoardRegisterLoading = true;
        draft.shareBoardRegisterError = null;
        draft.shareBoardRegisterDone = false;
        break;
      case SHARE_BOARD_REGISTER_SUCCESS:
        draft.shareBoardRegisterLoading = false;
        draft.shareBoardRegisterDone = true;
        break;
      case SHARE_BOARD_REGISTER_FAILURE:
        draft.shareBoardRegisterLoading = false;
        draft.shareBoardRegisterError = action.error;
        break;
      case SHARE_BOARD_DETAIL_HIT_INCREASE_REQUEST:
        draft.shareBoardDetailHitIncreaseLoading = true;
        draft.shareBoardDetailHitIncreaseDone = false;
        draft.shareBoardDetailHitIncreaseError = null;
        break;
      case SHARE_BOARD_DETAIL_HIT_INCREASE_SUCCESS:
        draft.shareBoardDetailHitIncreaseLoading = false;
        draft.shareBoardDetailHitIncreaseDone = true;
        break;
      case SHARE_BOARD_DETAIL_HIT_INCREASE_FAILURE:
        draft.shareBoardDetailHitIncreaseLoading = false;
        draft.shareBoardDetailHitIncreaseError = action.error;
        break;
      case SHARE_BOARD_DETAIL_SELECT_REQUEST:
        draft.shareBoardDetailSelectLoading = true;
        draft.shareBoardDetailSelectError = null;
        draft.shareBoardDetailSelectDone = false;
        break;
      case SHARE_BOARD_DETAIL_SELECT_SUCCESS:
        draft.shareBoardDetailSelectLoading = false;
        draft.shareBoardDetailSelectDone = true;
        draft.shareBoardDetailList = action.data.data;
        draft.detailimagePath= draft.shareBoardDetailList[0].image_path;
        draft.detaildescription = draft.shareBoardDetailList[0].description;
        draft.shareUserName = draft.shareBoardDetailList[0].user_name;    
        draft.shareUserId = draft.shareBoardDetailList[0].user_id;    
        draft.shareDiaryNo = draft.shareBoardDetailList[0].diary_no;    
        // console.log(draft.detailimagePath);
        // console.log(draft.detaildescription);
        break;
      case SHARE_BOARD_DETAIL_SELECT_FAILURE:
        draft.shareBoardDetailSelectLoading = false;
        draft.shareBoardDetailSelectError = action.error;
        break;
      case SHARE_BOARD_DETAIL_SELECT_RESET:
        draft.shareBoardDetailSelectLoading = false;
        draft.shareBoardDetailSelectError = null;
        draft.shareBoardDetailSelectDone = false;
        draft.detailimagePath = null;
        draft.detaildescription = null;
        draft.shareUserId = null;
        break;

      case SHARE_BOARD_UPDATE_REQUEST:
        draft.shareBoardUpdateLoading = true;
        draft.shareBoardUpdateError = null;
        draft.shareBoardUpdateDone = false;
        break;
      case SHARE_BOARD_UPDATE_SUCCESS:
        draft.shareBoardUpdateLoading = false;
        draft.shareBoardUpdateDone = true;
        break;
      case SHARE_BOARD_UPDATE_FAILURE:
        draft.shareBoardUpdateLoading = false;
        draft.shareBoardUpdateError = action.error;
        break;
      case SHARE_BOARD_UPDATE_RESET:
        draft.shareBoardUpdateLoading = false;
        draft.shareBoardUpdateError = null;
        draft.shareBoardUpdateDone = false;
        break;

      case SHARE_BOARD_LIKE_REQUEST:
        draft.shareBoardTopLikeLoading = true;
        draft.shareBoardTopLikeError = null;
        draft.shareBoardTopLikeDone = false;
        break;
      case SHARE_BOARD_LIKE_SUCCESS:
        draft.shareBoardTopLikeLoading = false;
        draft.shareBoardTopLikeDone = true;
        draft.shareBoardTopLikeList = action.data.data;
        break;
      case SHARE_BOARD_LIKE_FAILURE:
        draft.shareBoardTopLikeLoading = false;
        draft.shareBoardTopLikeError = action.error;
        break;
      case SHARE_BOARD_LIKE_RESET:
        draft.shareBoardTopLikeLoading = false;
        draft.shareBoardTopLikeError = null;
        draft.shareBoardTopLikeDone = false;
        break;

      case SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_REQUEST:
        draft.shareBoardIsLikeAndTotalLikeCountLoading = true;
        draft.shareBoardIsLikeAndTotalLikeCountError = null;
        draft.shareBoardIsLikeAndTotalLikeCountDone = false;
        break;
      case SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_SUCCESS:
        draft.shareBoardIsLikeAndTotalLikeCountLoading = false;
        draft.shareBoardIsLikeAndTotalLikeCountDone = true;
        draft.isLike = action.data.like;
        draft.totalLikeCount = action.data.totalLikeCount;
        break;
      case SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_FAILURE:
        draft.shareBoardIsLikeAndTotalLikeCountLoading = false;
        draft.shareBoardIsLikeAndTotalLikeCountError = action.error;
        break;
      case SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_RESET:
        draft.shareBoardIsLikeAndTotalLikeCountLoading = false;
        draft.shareBoardIsLikeAndTotalLikeCountError = null;
        draft.shareBoardIsLikeAndTotalLikeCountDone = false;
        break;
      // 해당 공유 게시글 좋아요 기능.
      case SHARE_BOARD_LIKE_REGISTER_REQUEST:
        draft.shareBoardLikeLoading = true;
        draft.shareBoardLikeError = null;
        draft.shareBoardLikeDone = false;
        break;
      case SHARE_BOARD_LIKE_REGISTER_SUCCESS:
        draft.shareBoardLikeLoading = false;
        draft.shareBoardLikeDone = true;
        break;
      case SHARE_BOARD_LIKE_REGISTER_FAILURE:
        draft.shareBoardLikeLoading = false;
        draft.shareBoardLikeError = action.error;
        break;
      case SHARE_BOARD_LIKE_REGISTER_RESET:
        draft.shareBoardLikeLoading = false;
        draft.shareBoardLikeError = null;
        draft.shareBoardLikeDone = false;
        break;
      case SHARE_BOARD_DELETE_REQUEST:
        draft.shareBoardDeleteLoading = true;
        draft.shareBoardDeleteDone = false;
        draft.shareBoardDeleteError = null;
        break;
      case SHARE_BOARD_DELETE_SUCCESS:
        draft.shareBoardDeleteLoading = false;
        draft.shareBoardDeleteDone = true;
        draft.shareBoardRegisterDone = false;
        break;
      case SHARE_BOARD_DELETE_FAILURE:
        draft.shareBoardDeleteLoading = false;
        draft.shareBoardDeleteError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
