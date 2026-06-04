import { useEffect, useState } from "react";
import {
  getBorrowers,
  deleteBorrower,
} from "../../../services/borrowerService";
import { Borrower } from "../../../types/borrowerType";
import { successAlert, confirmDelete, errorAlert } from "../../../utils/alert";

export function useBorrowers() {
  const [borrowers, setBorrowers] = useState<Borrower[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBorrowers = async () => {
    try {
      setLoading(true);
      const data = await getBorrowers();
      setBorrowers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBorrower = async (id: number) => {
    const confirmed = await confirmDelete(
      "Hapus Peminjam?",
      "Data yang sudah dihapus tidak dapat dikembalikan.",
    );
    if (!confirmed) return false;

    try {
      await deleteBorrower(id);
      await successAlert("Data peminjam berhasil dihapus");
      await fetchBorrowers();
      return true;
    } catch (error: any) {
      await errorAlert(error.message);
      return false;
    }
  };

  useEffect(() => {
    fetchBorrowers();
  }, []);

  return {
    borrowers,
    loading,
    fetchBorrowers,
    handleDeleteBorrower,
  };
}
