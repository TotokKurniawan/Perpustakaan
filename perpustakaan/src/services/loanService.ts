import { Loan } from "../types/loanType";
import api from "../lib/axios";

const API_URL = "/loans";

export async function getLoans(): Promise<Loan[]> {
  const response = await api.get(API_URL);
  return response.data;
}

export async function getLoan(id: number): Promise<Loan> {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
}

export async function createLoan(loan: Omit<Loan, "id">): Promise<Loan> {
  const response = await api.post(API_URL, loan);
  return response.data;
}

export async function updateLoan(
  id: number,
  loan: Partial<Loan>,
): Promise<Loan> {
  const response = await api.put(`${API_URL}/${id}`, loan);
  return response.data;
}

export async function deleteLoan(id: number): Promise<void> {
  await api.delete(`${API_URL}/${id}`);
}
