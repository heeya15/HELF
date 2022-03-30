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

// 가장 최근 몸무게 기록한 정보 10개 들고오는 함수
export async function WeightHistoryAPI() {
    const result = await axios.get(`${BASE_URL}weight/history/search/ten/weight`, {
        headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('jwt')
        },
    });
    console.log("상위 10개 데이터");
    console.log(result);
    return result.data;
}

// 회원정보 수정시 몸무게 정보 히스토리 테이블에 추가
export async function WeightHistoryUpdateAPI({ createdAt, weight }) {
    const token = sessionStorage.getItem("jwt");
    const header = { headers: { Authorization: `Bearer ${token}` } };
    console.log("몸무게 히스토리 등록 시 뭐가 찍히는지 확인하자");
    console.log(token);
    console.log(createdAt);
    console.log(weight);
    const result = await axios.post(`${LOCAL_URL}weight/history/register/weight`, { 
            createdAt: createdAt,
            weight: weight
        },
        {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('jwt')
            },
        },
    );
    console.log(result);
    return result;
}