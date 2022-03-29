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