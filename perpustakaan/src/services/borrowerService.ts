import axios from "axios";

const API_URL = "http://localhost:8080";

export const getBorrowers = async () => {
  const response = await axios.get(`${API_URL}/borrowers`);
  return response.data;
};

