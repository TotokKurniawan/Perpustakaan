import { Loan } from "../types/loanType";

const API_URL = "http://localhost:8080/loans";

export async function getLoans(): Promise<Loan[]> {
  const response = await fetch(API_URL);
  return response.json();
}

export async function getLoan(id: number): Promise<Loan> {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

export async function createLoan(loan: Omit<Loan, "id">): Promise<Loan> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loan),
  });
  return response.json();
}

export async function updateLoan(
  id: number,
  loan: Partial<Loan>,
): Promise<Loan> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loan),
  });
  return response.json();
}

export async function deleteLoan(id: number): Promise<void> {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
