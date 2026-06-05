import api from "../lib/axios";
import { LoginRequest, LoginResponse } from "@/types/authType";

export const Login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post(`/login`, data);
  return response.data;
};

export async function resetPassword(data: {
  email: string;
  new_password: string;
  confirm_password: string;
}) {
  const response = await api.post("/resetPassword", data);

  return response.data;
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}) {
  const response = await api.post("/register", data);
  return response.data;
}
