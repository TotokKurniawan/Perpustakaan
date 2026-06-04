import { User } from "../types/userType";

const API_URL = "http://localhost:8080/users";

export async function getUsers(): Promise<User[]> {
  const response = await fetch(API_URL);
  return response.json();
}

export async function getUser(id: number): Promise<User> {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

export async function createUser(user: Omit<User, "id">): Promise<User> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
}

export async function updateUser(
  id: number,
  user: Partial<User>,
): Promise<User> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
}

export async function deleteUser(id: number): Promise<void> {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
