import axios from "axios";
import { LoginRequest, LoginResponse } from "@/types/authType";

const API_URL = "http://localhost:8080";

export const Login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};
