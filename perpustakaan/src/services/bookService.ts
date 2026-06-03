import axios from "axios";

const API_URL = "http://localhost:8080";

export const getBooks = async () => {
  const response = await axios.get(`${API_URL}/books`);
  return response.data;
};
