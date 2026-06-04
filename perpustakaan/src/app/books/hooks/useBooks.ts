import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../../../services/bookService";
import { Book } from "../../../types/bookType";
import { successAlert, confirmDelete, errorAlert } from "../../../utils/alert";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (id: number) => {
    const confirmed = await confirmDelete(
      "Hapus Buku?",
      "Data yang sudah dihapus tidak dapat dikembalikan.",
    );

    if (!confirmed) return false;

    try {
      await deleteBook(id);

      await successAlert("Data buku berhasil dihapus");

      await fetchBooks();

      return true;
    } catch (error: any) {
      await errorAlert(error.message);

      return false;
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return {
    books,
    loading,
    fetchBooks,
    handleDeleteBook,
  };
}
