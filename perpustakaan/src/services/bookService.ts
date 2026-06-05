import api from "../lib/axios";
import { Book } from "../types/bookType";

const API_URL = "/books";

export async function getBooks(): Promise<Book[]> {
  const response = await api.get(API_URL);
  return response.data;
}

export async function getBook(id: number): Promise<Book> {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
}

export async function createBook(book: Omit<Book, "id">): Promise<Book> {
  const response = await api.post(API_URL, book);
  return response.data;
}
export async function updateBook(
  id: number,
  book: Partial<Book>,
): Promise<Book> {
  const response = await api.put(`${API_URL}/${id}`, book);
  return response.data;
}

export async function deleteBook(id: number): Promise<void> {
  const response = await api.delete(`${API_URL}/${id}`);
  const data = await response.data;
  if (data.error) {
    throw new Error(data.error);
  }
}
