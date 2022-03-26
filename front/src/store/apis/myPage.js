import axios from 'axios';
import { BASE_URL } from "../../utils/https";

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
export async function MemberModifyAPI({
  memberId, // 인덱스 번호
  memberAddress,
  memberNick,
  memberPassword,
  memberPhone,
}) {
  const result = await axios.put(`${BASE_URL}members/${memberId}`, {
    memberAddress: memberAddress,
    memberNick: memberNick,
    memberPassword: memberPassword,
    memberPhone: memberPhone,
  });
  return result;
}

// 회원정보 탈퇴
export async function MemberDeleteAPI({ memberId }) {
  const result = await axios.delete(`${BASE_URL}members/${memberId}`);
  return result;
}
