import axios from 'axios';
import { BASE_URL, LOCAL_URL } from '../../utils/https';

// 자신의 정보 조회
export async function MypageAPI() {
  const result = await axios.get(`${BASE_URL}user/find/me`, {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
    },
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
    userId: userId,
    userName: userName,
    userPassword: userPassword,
    gender: gender,
    height: height,
    weight: weight,
    birthday: birthday,
  });
  return result;
}

// 회원정보 탈퇴
export async function UserDeleteAPI({ userId }) {
  const result = await axios.delete(`${BASE_URL}user/remove/${userId}`);
  return result;
}

// 비밀번호 확인
export async function PasswordConfirmAPI(password) {
  // const result = await axios.post(`${BASE_URL}user/checkPassword`, {
  const result = await axios.post(`${BASE_URL}user/checkPassword`, null, {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
    },
    params: {
      userPassword: password,
    },
  });
  return result;
}

// 영양 성분 조회
export async function NutritionHistoryAPI(createdAt) {
  const result = await axios.get(`${BASE_URL}nutritionhistory/find/${createdAt}`, {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
    },
  });
  return result.data;
}

// 가장 최근 몸무게 기록한 정보 10개 들고오는 함수
export async function WeightHistoryAPI() {
  const result = await axios.get(
    `${BASE_URL}weight/history/search/ten/weight`,
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
      },
    }
  );
  return result.data;
}

// 회원 정보 수정시 몸무게 정보 히스토리 테이블에 추가
export async function WeightHistoryUpdateAPI({ createdAt, weight }) {
  console.log('몸무게 히스토리 등록 시 뭐가 찍히는지 확인하자');
  console.log(createdAt);
  console.log(weight);
  const result = await axios.post(
    `${BASE_URL}weight/history/register/weight`,
    {
      createdAt: createdAt,
      weight: weight,
    },
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
      },
    }
  );
  console.log(result);
  return result;
}

// 선택 날짜 몸무게 정보 등록시 몸무게 정보 히스토리 테이블에 수정된 내용 반영
export async function SelectWeightHistoryRegisterAPI({ createdAt, weight }) {
  console.log('몸무게 히스토리 등록 시 뭐가 찍히는지 확인하자');
  console.log(createdAt);
  console.log(weight);
  const result = await axios.post(
    `${BASE_URL}weight/history/select/register/weight`,
    {
      createdAt: createdAt,
      weight: weight,
    },
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
      },
    }
  );
  console.log(result);
  return result;
}

// 선택 날짜 몸무게 정보 수정시 몸무게 정보 히스토리 테이블에 수정된 내용 반영
export async function SelectWeightHistoryUpdateAPI({ createdAt, weight }) {
  console.log('몸무게 히스토리 수정 시 뭐가 찍히는지 확인하자');
  console.log(createdAt);
  console.log(weight);
  const result = await axios.put(
    `${BASE_URL}weight/history/update`,
    {
      createdAt: createdAt,
      weight: weight,
    },
    {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
      },
    }
  );
  console.log(result);
  return result;
}

// 입력한 날짜 정보 Weight 히스토리 테이블에 삭제
export async function SelectWeightHistoryDeleteAPI({ createdAt }) {
  console.log('몸무게 히스토리 삭제 시 뭐가 찍히는지 확인하자');
  console.log(createdAt);
  const result = await axios.delete(`${BASE_URL}weight/history/remove/weight`, {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
    },
    params: {
      createAt: createdAt,
    },
  });
  console.log(result);
  return result;
}

// 찜목록 조회
export async function MyPageLikeAPI() {
  const token = sessionStorage.getItem('jwt');
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const result = await axios.get(`${BASE_URL}user/likeList`, header);
  return result;
}

export async function MyPageLikeDeleteAPI(boardNo) {
  const token = sessionStorage.getItem('jwt');
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const result = await axios.post(
    `${BASE_URL}shareboard/like/${boardNo}`,
    null,
    header
  );
  return result;
}
