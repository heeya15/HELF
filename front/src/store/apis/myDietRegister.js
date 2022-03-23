import axios from "axios";
import { BASE_URL } from "../../utils/https";

export async function myDietImageAPI(imageFile) {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const formData = new FormData();
  formData.append("imageFile", imageFile);
  const result = await axios.post(`${BASE_URL}`, formData, header);
  return result;
}

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
    `https://localhost:8080/api/dietdiary/register`,
    formData,
    header
  );
  return result;
}
