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

// BEST 식단 조회 -> 좋아요가 가장 많은 순으로 5개 레코드 조회
export async function ShareBoardTopLikeAPI() {
    const result = await axios.get(`${BASE_URL}shareboard/findAll/like`);
    return result;
}