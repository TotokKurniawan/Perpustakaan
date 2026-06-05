import { User } from "../types/userType";
import api from "../lib/axios";

const API_URL = "/users";

export async function getUsers(): Promise<User[]> {
  const response = await api.get(API_URL);
  return response.data;
}

export async function getUser(id: number): Promise<User> {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
}

export async function createUser(user: Omit<User, "id">): Promise<User> {
  const response = await api.post(API_URL, user);
  return response.data;
}
export async function updateUser(
  id: number,
  user: Partial<User>,
): Promise<User> {
  const response = await api.put(`${API_URL}/${id}`, user);
  return response.data;
}

export async function deleteUser(id: number): Promise<void> {
  await api.delete(`${API_URL}/${id}`);
}
