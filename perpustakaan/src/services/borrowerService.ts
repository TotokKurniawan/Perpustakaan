import { Borrower } from "../types/borrowerType";
import api from "../lib/axios";

const API_URL = "/borrowers";

export async function getBorrowers(): Promise<Borrower[]> {
  const response = await api.get(API_URL);
  return response.data;
}

export async function getBorrower(id: number): Promise<Borrower> {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
}

export async function createBorrower(
  borrower: Omit<Borrower, "id">,
): Promise<Borrower> {
  const response = await api.post(API_URL, borrower);
  return response.data;
}

export async function updateBorrower(
  id: number,
  borrower: Partial<Borrower>,
): Promise<Borrower> {
  const response = await api.put(`${API_URL}/${id}`, borrower);
  return response.data;
}

export async function deleteBorrower(id: number): Promise<void> {
  await api.delete(`${API_URL}/${id}`);
}
