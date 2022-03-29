import {Password} from '@mui/icons-material';
import axios from 'axios';
import {BASE_URL, LOCAL_URL} from "../../utils/https";

// 자신의 정보 조회
export async function MypageAPI() {
    const result = await axios.get(`${BASE_URL}user/find/me`, {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('jwt')
        }
    });
    console.log(result);
    return result.data;
}

// 회원정보 수정
export async function UserModifyAPI({
    userId,
    userName,
    userPassword,
    gender,
    height,
    weight,
    birthday,
}) {
    const result = await axios.put(`${BASE_URL}user/update`, {
        userId : userId,
        userName : userName,
        userPassword : userPassword, 
        gender : gender,
        height : height,
        weight : weight,
        birthday : birthday,
    });
    return result;
}

// 회원정보 탈퇴
export async function MemberDeleteAPI({memberId}) {
    const result = await axios.delete(`${BASE_URL}members/${memberId}`);
    return result;
}

// 비밀번호 확인
export async function PasswordConfirmAPI(password) {
    // const result = await axios.post(`${BASE_URL}user/checkPassword`, {
    const result = await axios.post(`${BASE_URL}user/checkPassword`, null, {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('jwt')
        },
        params: {
            userPassword: password
        }
    });
    return result;
}

// 영양 성분 조회
export async function NutritionHistoryAPI() {
    const result = await axios.get(`${BASE_URL}nutritionhistory/find`, {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('jwt')
        },
    });
    return result.data;
}