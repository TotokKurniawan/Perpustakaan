import axios from "axios";

const API_URL = "http://localhost:8080";

export const getLoans = async () => {
  const response = await axios.get(`${API_URL}/loans`);
  return response.data;
};
