import produce from "immer";

const initialState = {
    // 식단 일지 공유 게시판에 등록
    shareBoardRegisterLoading: false,
    shareBoardRegisterDone: false,
    shareBoardRegisterError: null,
};

export const SHARE_BOARD_REGISTER_REQUEST = 'SHARE_BOARD_REGISTER_REQUEST';
export const SHARE_BOARD_REGISTER_SUCCESS = 'SHARE_BOARD_REGISTER_SUCCESS';
export const SHARE_BOARD_REGISTER_FAILURE = 'SHARE_BOARD_REGISTER_FAILURE';

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
            default: 
                break;
        }
    });

export default reducer;
