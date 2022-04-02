import produce from "immer";

const initialState = {
    // 식단 일지 공유 게시판에 등록
    shareBoardRegisterLoading: false,
    shareBoardRegisterDone: false,
    shareBoardRegisterError: null,

    // 베스트 식단 조회
    shareBoardTopLikeLoading: false, 
    shareBoardTopLikeDone: false,
    shareBoardTopLikeError: false,
    shareBoardTopLikeList: [],

    // 총 좋아요 개수와, 로그인 USER가 해당 공유 게시글 좋아요 여부 체크
    shareBoardIsLikeAndTotalLikeCountLoading: false, 
    shareBoardIsLikeAndTotalLikeCountDone: false,
    shareBoardIsLikeAndTotalLikeCountError: false,
    isLike:false,
    totalLikeCount: 0,
    
    // 해당 공유 게시글 좋아요 하기

    shareBoardLikeLoading: false, 
    shareBoardLikeDone: false,
    shareBoardLikeError: false,
};

export const SHARE_BOARD_REGISTER_REQUEST = 'SHARE_BOARD_REGISTER_REQUEST';
export const SHARE_BOARD_REGISTER_SUCCESS = 'SHARE_BOARD_REGISTER_SUCCESS';
export const SHARE_BOARD_REGISTER_FAILURE = 'SHARE_BOARD_REGISTER_FAILURE';

export const SHARE_BOARD_LIKE_REQUEST = "SHARE_BOARD_LIKE_REQUEST";
export const SHARE_BOARD_LIKE_SUCCESS = "SHARE_BOARD_LIKE_SUCCESS";
export const SHARE_BOARD_LIKE_FAILURE = "SHARE_BOARD_LIKE_FAILURE";
export const SHARE_BOARD_LIKE_RESET = "SHARE_BOARD_LIKE_RESET";
// 총 좋아요 개수와, 로그인 USER가 해당 공유 게시글 좋아요 여부 체크
export const SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_REQUEST = "SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_REQUEST";
export const SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_SUCCESS = "SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_SUCCESS";
export const SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_FAILURE = "SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_FAILURE";
export const SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_RESET = "SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_RESET";

// 해당 게시글 좋아요 하기
export const SHARE_BOARD_LIKE_REGISTER_REQUEST = "SHARE_BOARD_LIKE_REGISTER_REQUEST";
export const SHARE_BOARD_LIKE_REGISTER_SUCCESS = "SHARE_BOARD_LIKE_REGISTER_SUCCESS";
export const SHARE_BOARD_LIKE_REGISTER_FAILURE = "SHARE_BOARD_LIKE_REGISTER_FAILURE";
export const SHARE_BOARD_LIKE_REGISTER_RESET = "SHARE_BOARD_LIKE_REGISTER_RESET";


const reducer = (state = initialState, action) => 
    produce(state, draft => {
        switch(action.type) {
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
            case SHARE_BOARD_LIKE_REGISTER_REQUEST :
                draft.shareBoardLikeLoading = true;
                draft.shareBoardLikeError = null;
                draft.shareBoardLikeDone = false;
                break;
            case SHARE_BOARD_LIKE_REGISTER_SUCCESS :
                draft.shareBoardLikeLoading = false;
                draft.shareBoardLikeDone = true;
                break;
            case SHARE_BOARD_LIKE_REGISTER_FAILURE :
                draft.shareBoardLikeLoading = false;
                draft.shareBoardLikeError = action.error;
                break;
            case SHARE_BOARD_LIKE_REGISTER_RESET :
                draft.shareBoardLikeLoading = false;
                draft.shareBoardLikeError = null;
                draft.shareBoardLikeDone = false;
                break;
            default: 
                break;
        }
    });

export default reducer;
