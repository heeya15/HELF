import {
    all,
    fork,
    put,
    takeLatest,
    call,
} from 'redux-saga/effects';    
import {
    shareBoardRegisterAPI,
} from '../apis/shareBoard'
import {
    SHARE_BOARD_REGISTER_REQUEST,
    SHARE_BOARD_REGISTER_SUCCESS,
    SHARE_BOARD_REGISTER_FAILURE,
} from '../modules/shareBoard';
import swal from 'sweetalert'; // 예쁜 alert 창을 위해 사용


function* loadShareBoardRegister(action) {
    try {
        const result = yield call(shareBoardRegisterAPI, action.data);
        yield put({ type: SHARE_BOARD_REGISTER_SUCCESS, data: result });
        swal('공유 완료', ' ', 'success', {
            buttons: false,
            timer: 1000,
        });
    } catch (err) {
        swal('공유 실패', '공유할 권한이 없습니다.', 'error', {
            buttons: false,
            timer: 1000,
        });
        yield put({ type: SHARE_BOARD_REGISTER_FAILURE });
    }
}

function* watchLoadShareBoardRegister() {
    yield takeLatest(SHARE_BOARD_REGISTER_REQUEST, loadShareBoardRegister);
}

export default function* ShareBoardSaga() {
    yield all([
        fork(watchLoadShareBoardRegister),
    ]);
}