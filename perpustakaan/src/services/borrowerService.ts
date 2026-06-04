import { Borrower } from "../types/borrowerType";

const API_URL = "http://localhost:8080/borrowers";

export async function getBorrowers(): Promise<Borrower[]> {
  const response = await fetch(API_URL);
  return response.json();
}

export async function getBorrower(id: number): Promise<Borrower> {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

export async function createBorrower(
  borrower: Omit<Borrower, "id">,
): Promise<Borrower> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(borrower),
  });
  return response.json();
}

export async function updateBorrower(
  id: number,
  borrower: Partial<Borrower>,
): Promise<Borrower> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(borrower),
  });
  return response.json();
}

export async function deleteBorrower(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
}
