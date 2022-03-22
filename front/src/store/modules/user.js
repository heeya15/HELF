import produce from 'immer';

const initialState = {
    signUpLoading: false, // 회원가입 시도중
    signUpSuccess: false,
    signUpError: null
};

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

const reducer = (state = initialState, action) => produce(state, draft => {
    switch (action.type) {
        case SIGN_UP_REQUEST:
            draft.signUpLoading = true;
            draft.signUpError = null;
            draft.signUpSuccess = false;
            break;
        case SIGN_UP_SUCCESS:
            draft.signUpLoading = false;
            draft.signUpSuccess = true;
            draft.nickCheckDone = false; // 닉네임 수정 중복확인을 위해 회원가입 후 nickCheckDone 초기화
            break;
        case SIGN_UP_FAILURE:
            draft.signUpLoading = false;
            draft.signUpError = action.error;
            break;
        default:
            break;
    }
});
export default reducer;