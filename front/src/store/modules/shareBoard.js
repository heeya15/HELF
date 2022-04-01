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
};

export const SHARE_BOARD_REGISTER_REQUEST = 'SHARE_BOARD_REGISTER_REQUEST';
export const SHARE_BOARD_REGISTER_SUCCESS = 'SHARE_BOARD_REGISTER_SUCCESS';
export const SHARE_BOARD_REGISTER_FAILURE = 'SHARE_BOARD_REGISTER_FAILURE';

export const SHARE_BOARD_LIKE_REQUEST = "SHARE_BOARD_LIKE_REQUEST";
export const SHARE_BOARD_LIKE_SUCCESS = "SHARE_BOARD_LIKE_SUCCESS";
export const SHARE_BOARD_LIKE_FAILURE = "SHARE_BOARD_LIKE_FAILURE";
export const SHARE_BOARD_LIKE_RESET = "SHARE_BOARD_LIKE_RESET";
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
            default: 
                break;
        }
    });

export default reducer;
