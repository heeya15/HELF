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
