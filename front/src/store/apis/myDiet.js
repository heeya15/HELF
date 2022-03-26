import axios from "axios";
import { BASE_URL } from "../../utils/https";
import { LOCAL_URL } from "../../utils/https";

// 이미지 보내서 음식 정보 가져오기
export async function myDietImageAPI(imagePath) {
  console.log(imagePath.imagePath);
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const formData = new FormData();
  formData.append("file", imagePath.imagePath);
  const result = await axios.post(
    `${LOCAL_URL}dietdiary/segmentation`,
    formData,
    header
  );
  return result;
}

// 식단 등록
export async function myDietRegisterAPI({
  imagePath,
  diaryDate,
  mealTime,
  description,
  dietRegisterReqList,
}) {
  const dietDiaryRegisterReq = {
    description: description,
    diaryDate: diaryDate,
    diaryNo: 0,
    dietRegisterReqList: dietRegisterReqList,
    isShared: false,
    mealTime: mealTime,
    saveImagePath: "",
  };
  const token = sessionStorage.getItem("jwt");
  const header = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const formData = new FormData();
  formData.append(
    "key",
    new Blob([JSON.stringify(dietDiaryRegisterReq)], {
      type: "application/json",
    })
  );
  formData.append("file", imagePath);
  // const result = await axios.post(`${BASE_URL}dietdiary/register`, formData, header);
  const result = await axios.post(
    `${LOCAL_URL}dietdiary/register`,
    formData,
    header
  );
  return result;
}

// 식단 일지 전체 목록 가져오기
export async function myDietDiaryListAPI() {
  const token = sessionStorage.getItem("jwt");
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const result = await axios.get(
    // `${BASE_URL}dietdiary/findAll`,
    `${LOCAL_URL}dietdiary/findAll`,
    header
  );
  return result.data;
}

// 해당 날짜에 해당하는 식단 일지 정보 가져오기
export async function myDietDiaryDailyInfoAPI({ date }) {
  const token = sessionStorage.getItem("jwt");
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const result = await axios.get(
    // `${BASE_URL}dietdiary/findAll`,
    `${LOCAL_URL}dietdiary/findAll/${date}`,
    header
  );
  return result.data;
}

// 해당 식단 일지 정보 삭제
export async function myDietDiaryItemDeleteAPI({ date }) {
  const result = await axios.delete(
    `${LOCAL_URL}dietdiary/remove/${date.diaryNo}`
  );
  return result;
}

// 식단 상세 정보 가져오기
export async function myDietDetailAPI(diaryNo) {
  const result = await axios.get(`${LOCAL_URL}dietdiary/find/${diaryNo}`);
  // const result = await axios.get(`${BASE_URL}dietdiary/find/${diaryNo}`);
  return result;
}

// 식단 수정
export async function myDietUpdateAPI({
  imagePath,
  diaryDate,
  mealTime,
  description,
  dietRegisterReqList,
  diaryNo,
  isShared,
  saveImagePath,
}) {
  const dietDiaryRegisterReq = {
    description: description,
    diaryDate: diaryDate,
    diaryNo: diaryNo,
    dietRegisterReqList: dietRegisterReqList,
    isShared: isShared,
    mealTime: mealTime,
    saveImagePath: saveImagePath,
  };
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const formData = new FormData();
  formData.append(
    "key",
    new Blob([JSON.stringify(dietDiaryRegisterReq)], {
      type: "application/json",
    })
  );
  if (typeof imagePath !== "string") {
    formData.append("file", imagePath);
  }
  const result = await axios.put(
    `${LOCAL_URL}dietdiary/update`,
    formData,
    header
  );
  return result;
}
