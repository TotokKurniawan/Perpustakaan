import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getBooks, deleteBook } from "../../../services/bookService";
import { Book } from "../../../types/bookType";
import { successAlert } from "../../../utils/alert";

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
    const result = await Swal.fire({
      title: "Hapus Buku?",
      text: "Data yang sudah dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return false;

    try {
      await deleteBook(id);

      successAlert("Data peminjaman berhasil dihapus");

      await fetchBooks();

      return true;
    } catch (error: any) {
      await Swal.fire({
        icon: "error",
        title: "Tidak Bisa Dihapus",
        text: error.message,
      });

      return false;
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return {
    books,
    loading,
    refreshBooks: fetchBooks,
    handleDeleteBook,
  };
}
