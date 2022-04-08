import axios from "axios";
import { BASE_URL } from "../../utils/https";
import { LOCAL_URL } from "../../utils/https";

export async function exerciseHistoryFindAllAPI(year) {
  const token = sessionStorage.getItem("jwt");
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const result = await axios.get(
    `${BASE_URL}exerciseHistory/findAll/${year}`,
    header
  );
  return result;
}

export async function exerciseHistoryRegisterAPI({ count, date, exerciseNo }) {
  const exerciseHistoryRegisterReq = {
    exerciseCount: count,
    exerciseDate: date,
    exerciseNo: exerciseNo,
    historyNo: 0,
  };
  const token = sessionStorage.getItem("jwt");
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await axios.post(
    `${BASE_URL}exerciseHistory/register`,
    exerciseHistoryRegisterReq,
    header
  );
  return result;
}
