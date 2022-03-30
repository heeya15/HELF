import axios from 'axios';
import { BASE_URL, LOCAL_URL } from "../../utils/https";
const { Kakao } = window;

// 로그인
export async function KakaoLoginAPI() {
 
  await Kakao.Auth.login({ // 카카오 로그인 화면 팝업으로 띄우고
    success: function (authObj) { 
      // console.log(`is set?: ${window.Kakao.Auth.getAccessToken()}`);
      let ac = authObj.access_token;
      let socialAC = `Bearer ${ac}`;
      // console.log("hi");
      // console.log(socialAC);
    },
    fail: function(err) {
    },
  })
}
export async function getUserInfoAPI() {
  const result = await window.Kakao.API.request({
      url: "/v2/user/me",
    });
  console.log(result);
  return result;
}


// 비밀번호 초기화
export async function ResetPasswordAPI({ email, name, id }) {
  console.log(email, id, name);
  const result = await axios.post(`${BASE_URL}email/send`, {
    userEmail: email,
    userId : id,
    userName: name,
  });
  return result;
}