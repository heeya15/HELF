import {
  all,
  fork,
  put,
  takeLatest,
  call,
} from 'redux-saga/effects';    
import {
  shareBoardRegisterAPI,
  ShareBoardTopLikeAPI,
  ShareBoardIsLikeAndTotalLikeCountAPI,
  ShareBoardLikeAPI,
  ShareBoardUpdateDiscriptionAPI,
  ShareBoardDetailSelectAPI,
  ShareBoardDetailHitIncreaseAPI,
  ShareBoardDeleteAPI,
} from '../apis/shareBoard'
import {
  SHARE_BOARD_REGISTER_REQUEST,
  SHARE_BOARD_REGISTER_SUCCESS,
  SHARE_BOARD_REGISTER_FAILURE,
  SHARE_BOARD_LIKE_REQUEST,
  SHARE_BOARD_LIKE_SUCCESS,
  SHARE_BOARD_LIKE_FAILURE,
  SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_REQUEST,
  SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_SUCCESS,
  SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_FAILURE,
  SHARE_BOARD_LIKE_REGISTER_REQUEST,
  SHARE_BOARD_LIKE_REGISTER_SUCCESS,
  SHARE_BOARD_LIKE_REGISTER_FAILURE,
  SHARE_BOARD_UPDATE_REQUEST,
  SHARE_BOARD_UPDATE_SUCCESS,
  SHARE_BOARD_UPDATE_FAILURE,
  SHARE_BOARD_DETAIL_SELECT_REQUEST,
  SHARE_BOARD_DETAIL_SELECT_SUCCESS,
  SHARE_BOARD_DETAIL_SELECT_FAILURE,
  SHARE_BOARD_DETAIL_HIT_INCREASE_REQUEST,
  SHARE_BOARD_DETAIL_HIT_INCREASE_SUCCESS,
  SHARE_BOARD_DETAIL_HIT_INCREASE_FAILURE,
  SHARE_BOARD_DELETE_REQUEST,   // 게시글 삭제 (공유 해제)
  SHARE_BOARD_DELETE_SUCCESS,
  SHARE_BOARD_DELETE_FAILURE,
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
// 상위 5개 좋아요 수 가진 리스트 조회
function* loadShareBoardTopLikeList() {
  try {
      const result = yield call(ShareBoardTopLikeAPI);
      // console.log("요청들어옴?");
      // console.log(result);
      yield put({
        type: SHARE_BOARD_LIKE_SUCCESS ,
        data: result,
      });
    } catch (error) {
      yield put({
        type: SHARE_BOARD_LIKE_FAILURE,
      });
    }
}

function* watchLoadShareBoardTopLike() {
  yield takeLatest(SHARE_BOARD_LIKE_REQUEST , loadShareBoardTopLikeList);
}
// 좋아요 수와, 해당 게시글 좋아요 여부 조회
function* loadShareBoardIsLikeAndTotalLikeCount(action) {
  try {   
      const result = yield call(ShareBoardIsLikeAndTotalLikeCountAPI, action.data);
      yield put({
        type: SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_SUCCESS ,
        data: result,
      });
    } catch (error) {
      yield put({
        type: SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_FAILURE,
      });
    }
}

function* watchLoadShareBoardIsLikeAndTotalLikeCount() {
  yield takeLatest(SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_REQUEST , loadShareBoardIsLikeAndTotalLikeCount);
}

// 좋아요 등록
function* loadShareBoardLike(action) {
  try {   
      // console.log(action.data);
      const result = yield call(ShareBoardLikeAPI, action.data); 
      yield put({
        type: SHARE_BOARD_LIKE_REGISTER_SUCCESS  ,
        data: result,
      });
      yield put({ type: SHARE_BOARD_ISLIKECHECK_TOTALLIKECOUNT_REQUEST, data: action.data }); 
    } catch (error) {
      yield put({
        type: SHARE_BOARD_LIKE_REGISTER_FAILURE ,
      });
    }
}

function* watchLoadShareBoardLike() {
  yield takeLatest(SHARE_BOARD_LIKE_REGISTER_REQUEST, loadShareBoardLike);
}

// 해당 공유 게시글 discription 수정
function* loadShareBoardUpdateDiscription(action) {
try {   
    // console.log(action.data);
    const result = yield call(ShareBoardUpdateDiscriptionAPI, action.data); 
    yield put({
      type: SHARE_BOARD_UPDATE_SUCCESS,
      data: result,
    });
    yield put({ type: SHARE_BOARD_DETAIL_SELECT_REQUEST, data: action.data.boardNo });
  } catch (error) {
    yield put({
      type: SHARE_BOARD_UPDATE_FAILURE,
    });
  }
}

function* watchLoadShareBoardUpdateDiscription() {
    yield takeLatest(SHARE_BOARD_UPDATE_REQUEST, loadShareBoardUpdateDiscription);
}

// 해당 공유 게시글 상세 조회
function* loadShareBoardDetailSelect(action) {
  try {   
      const result = yield call(ShareBoardDetailSelectAPI, action.data); 
      yield put({
        type: SHARE_BOARD_DETAIL_SELECT_SUCCESS ,
        data: result,
      });
    } catch (error) {
      yield put({
        type: SHARE_BOARD_DETAIL_SELECT_FAILURE ,
      });
    }
  }
  
function* watchLoadShareBoardDetailSelect() {
    yield takeLatest(SHARE_BOARD_DETAIL_SELECT_REQUEST , loadShareBoardDetailSelect);
}

// 해당 공유 게시글 조회수 증가
function* loadShareBoardDetailHitIncrease(action) {
  try {
    const result = yield call(ShareBoardDetailHitIncreaseAPI, action.data);
    yield put({ type: SHARE_BOARD_DETAIL_HIT_INCREASE_SUCCESS, data: result });
  } catch (error) {
    yield put({ type: SHARE_BOARD_DETAIL_HIT_INCREASE_FAILURE });
  }
}

function* watchLoadShareBoardDetailHitIncrease() {
  yield takeLatest(SHARE_BOARD_DETAIL_HIT_INCREASE_REQUEST, loadShareBoardDetailHitIncrease);
}

// 해당 공유 게시글 해제 (공유 해제)
function* loadShareBoardDelete(action) {
  try {
    const result = yield call(ShareBoardDeleteAPI, action.data);
    yield put({ type: SHARE_BOARD_DELETE_SUCCESS, data: result });
  } catch (error) {
    yield put({ type: SHARE_BOARD_DELETE_FAILURE });
  }
}

function* watchLoadShareBoardDelete(){
  yield takeLatest(SHARE_BOARD_DELETE_REQUEST, loadShareBoardDelete);
}

export default function* ShareBoardSaga() {
  yield all([
      fork(watchLoadShareBoardDetailSelect),
      fork(watchLoadShareBoardUpdateDiscription),
      fork(watchLoadShareBoardLike),
      fork(watchLoadShareBoardIsLikeAndTotalLikeCount),
      fork(watchLoadShareBoardRegister),
      fork(watchLoadShareBoardTopLike),
      fork(watchLoadShareBoardDetailHitIncrease),
      fork(watchLoadShareBoardDelete),
  ]);
}