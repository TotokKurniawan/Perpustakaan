import api from "../lib/axios";
import { LoginRequest, LoginResponse } from "@/types/authType";

export const Login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post(`/login`, data);
  return response.data;
};

