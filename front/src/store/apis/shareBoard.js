import axios from 'axios';
import { BASE_URL, LOCAL_URL } from '../../utils/https';

// 게시글 등록
export async function shareBoardRegisterAPI({
    diaryNo,
    shareDescription, 
    hit,
    createdAt,
}){
    console.log(diaryNo, shareDescription, )
    const result = await axios.post(`${BASE_URL}shareboard/register`, {
        diaryNo: diaryNo,
        description: shareDescription,
        hit: hit,
        createdAt: createdAt,
    });
    return result;
}

// BEST 식단 조회 -> 좋아요가 가장 많은 순으로 4개 레코드 조회
export async function ShareBoardTopLikeAPI() {
    const result = await axios.get(`${BASE_URL}shareboard/findAll/like`);
    return result;
}

// 해당 공유 게시글을 로그인한 user의 좋아요 여부 체크 및 해당 게시글 총 좋아요 개수
export async function ShareBoardIsLikeAndTotalLikeCountAPI(boardNo) {
    const token = sessionStorage.getItem("jwt");
    const result = await axios.get(`${BASE_URL}shareboard/find/isLike/${boardNo}`, {
            headers: { 
                Authorization: `Bearer ${ token }`
            }
    });
    return result.data;
}


// 해당 공유 게시글을 좋아요
export async function ShareBoardLikeAPI(boardNo) {
    const token = sessionStorage.getItem("jwt");
    const header = { headers: { Authorization: `Bearer ${token}` } };
    const result = await axios.post(
        `${BASE_URL}shareboard/like/${boardNo}`,
        null,
        header
    );
    return result;
}

// 해당 공유 게시글 상세 조회
export async function ShareBoardDetailSelectAPI(boardNo) {
    const token = sessionStorage.getItem("jwt");
    const header = { headers: { Authorization: `Bearer ${token}` } };
    const result = await axios.get(`${BASE_URL}shareboard/find/${boardNo}`,
        header
    );
    return result;
}

// 해당 공유 게시글 조회수 증가
export async function ShareBoardDetailHitIncreaseAPI(boardNo) {
    const token = sessionStorage.getItem("jwt");
    const header = { headers: { Authorization: `Bearer ${token}` } };
    const result = await axios.put(`${BASE_URL}shareboard/hit/${boardNo}`, null, header);
    return result;
}

// 해당 공유 게시글을 description 수정
export async function ShareBoardUpdateDiscriptionAPI({boardNo,description}) {
    const result = await axios.put(
        `${BASE_URL}shareboard/update/description`,
        {
            boardNo: boardNo,
            description: description,
        }   
    );
    return result;
}

// 게시글 삭제 (공유 해제)
export async function ShareBoardDeleteAPI({ diaryNo }) {
    const token = sessionStorage.getItem("jwt");
    const header = { headers: { Authorization: `Bearer ${token}` } };
    const result = await axios.delete(`${BASE_URL}shareboard/remove/${diaryNo}`, null, header);
    return result;
}