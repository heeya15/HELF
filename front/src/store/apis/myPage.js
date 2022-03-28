import {Password} from '@mui/icons-material';
import axios from 'axios';
import {BASE_URL, LOCAL_URL} from "../../utils/https";

// 자신의 정보 조회
export async function MypageAPI() {
    const result = await axios.get(`${LOCAL_URL}user/find/me`, {
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
}) {
    const result = await axios.put(`${LOCAL_URL}user/update`, {
        userId : userId,
        userName : userName,
        userPassword : userPassword, 
        gender : gender,
        height : height,
        weight : weight,
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
    const result = await axios.post(`${LOCAL_URL}user/checkPassword`, null, {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('jwt')
        },
        params: {
            userPassword: password
        }
    });
    return result;
}