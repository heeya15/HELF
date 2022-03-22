import axios from 'axios';
import { BASE_URL } from "../../../utils/https";

// 로그인
export async function LoginAPI({ id, pw }) {
  const result = await axios.post(`${BASE_URL}auth/login`, {
    userId: id,
    userPassword: pw
  });
  return result;
}

// 로그아웃
export async function LogoutAPI({ memberId }) {
  const result = await axios.get(`${BASE_URL}members/logout/${memberId}`);
  return result;
}

// 회원가입
export async function SignupAPI({
  email,
  name,
  phoneNumber,
  password,
  nickName,
  address,
  birth,
  gender,
}) {
  const result = await axios.post(`${BASE_URL}members/register`, {
    memberAddress: address,
    memberBirth: birth,
    memberEmail: email,
    memberGender: gender,
    memberName: name,
    memberNick: nickName,
    memberPassword: password,
    memberPhone: phoneNumber,
  });
  return result;
}

// 이메일 중복체크
export async function EmailCheckAPI({ email }) {
  const result = await axios.get(`${BASE_URL}members/email-check/${email}`);
  return result;
}

// 비밀번호 초기화
export async function ResetPasswordAPI({ email, name }) {
  const result = await axios.post(`${BASE_URL}members`, {
    memberEmail: email,
    memberName: name,
  });
  return result;
}

// 닉네임 중복체크
export async function NickNameCheckAPI({ nickName }) {
  const result = await axios.get(`${BASE_URL}members/nick-check/${nickName}`);
  return result;
}
