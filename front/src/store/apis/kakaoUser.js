export async function getUserInfoAPI() {
  const result = await window.Kakao.API.request({
      url: "/v2/user/me",
    });
  console.log(result);
  return result;
}
