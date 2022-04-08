import axios from 'axios';
import { BASE_URL, LOCAL_URL } from "../../utils/https";

// 로그인
export async function LoginAPI({ id, pw }) {
  const result = await axios.post(`${BASE_URL}auth/login`, {
    userId: id,
    userPassword: pw
  });
  return result;
}

// 회원가입
export async function SignUpAPI({
  id,
  password, 
  name,
  email,
}) {
  const result = await axios.post(`${BASE_URL}user/register/signup`, {
    userId: id,
    userPassword: password,
    userName: name,
    userEmail: email,
  });
  return result;
}

// 이메일 중복체크
export async function EmailCheckAPI({ email }) {
  const result = await axios.get(`${BASE_URL}user/emailCheck/${email}`);
  return result;
}

// 카카오 아이디 중복체크
export async function KaKaoIdCheckAPI({ id }) {
  const result = await axios.get(`${BASE_URL}user/idCheck/${id}`);
  return result.data;
}
// 아이디 중복체크
export async function IdCheckAPI({ id }) {
  const result = await axios.get(`${BASE_URL}user/idCheck/${id}`);
  // console.log(result.data);
  return result.data;
}

// 비밀번호 초기화
export async function ResetPasswordAPI({ email, name, id }) {
  // console.log(email, id, name);
  const result = await axios.post(`${BASE_URL}email/send`, {
    userEmail: email,
    userId : id,
    userName: name,
  });
  return result;
}

// 추가 정보 입력
export async function AdditionalUserInfoAPI({
  birthday,
  gender,
  height,
  weight,
}) {
  const result = await axios.post(`${BASE_URL}user/register/AdditionalInfo`, {
    birthday: birthday,
    gender: gender,
    height: height,
    weight, weight,
  },
  {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('jwt')
    },
  });
  return result.data;
}