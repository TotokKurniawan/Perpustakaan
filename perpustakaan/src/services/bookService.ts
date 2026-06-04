import { Book } from "../types/bookType";

const API_URL = "http://localhost:8080/books";

export async function getBooks(): Promise<Book[]> {
  const response = await fetch(API_URL);
  return response.json();
}

export async function getBook(id: number): Promise<Book> {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

export async function createBook(book: Omit<Book, "id">): Promise<Book> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  return response.json();
}

export async function updateBook(
  id: number,
  book: Partial<Book>,
): Promise<Book> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  return response.json();
}

export async function deleteBook(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
}
