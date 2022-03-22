import axios from "axios";
import { BASE_URL } from "../../utils/https";

export async function myDietImageAPI() {
  const result = await axios.get(`${BASE_URL}`);
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
  var formData = new FormData();
  formData.append("file", imagePath);
  formData.append(
    "key",
    new Blob([JSON.stringify(dietDiaryRegisterReq)], {
      type: "application/json",
    })
  );
  // const result = await axios.post(`${BASE_URL}register`);
  const result = "SUCCESS";
  return result;
}
