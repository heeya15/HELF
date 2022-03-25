import axios from "axios";
import { BASE_URL } from "../../../utils/https";

export async function myDietDetailAPI(diaryNo) {
  const result = await axios.get(
    `https://localhost:8443/api/dietdiary/find/${diaryNo}`
  );
  // const result = await axios.get(`${BASE_URL}dietdiary/find/${diaryNo}`);
  return result;
}

export async function myDietUpdateAPI(
  imagePath,
  diaryDate,
  mealTime,
  description,
  dietRegisterReqList,
  diaryNo
) {
  const dietDiaryRegisterReq = {
    description: description,
    diaryDate: diaryDate,
    diaryNo: diaryNo,
    dietRegisterReqList: dietRegisterReqList,
    isShared: false,
    mealTime: mealTime,
    saveImagePath: "",
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
    `${BASE_URL}dietdiary/update`,
    formData,
    header
  );
  return result;
}
