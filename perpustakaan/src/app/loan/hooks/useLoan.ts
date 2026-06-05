import { useEffect, useState } from "react";
import {
  getLoans,
  deleteLoan,
  createLoan,
  updateLoan,
} from "../../../services/loanService";
import { Loan } from "../../../types/loanType";
import { successAlert, confirmDelete, errorAlert } from "../../../utils/alert";

export function useLoans() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const data = await getLoans();
      setLoans(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLoan = async (loan: Omit<Loan, "id">) => {
    try {
      await createLoan(loan);
      await successAlert("Data peminjaman berhasil ditambahkan");
      await fetchLoans();
    } catch (error: any) {
      await errorAlert(error.message);
    }
  };

  const handleUpdateLoan = async (id: number, loan: Partial<Loan>) => {
    try {
      await updateLoan(id, loan);
      await successAlert("Data peminjaman berhasil diperbarui");
      await fetchLoans();
    } catch (error: any) {
      await errorAlert(error.message);
    }
  };

  const handleDeleteLoan = async (id: number) => {
    const confirmed = await confirmDelete(
      "Hapus Peminjaman?",
      "Data yang sudah dihapus tidak dapat dikembalikan.",
    );
    if (!confirmed) return false;

    try {
      await deleteLoan(id);
      await successAlert("Data peminjaman berhasil dihapus");
      await fetchLoans();
      return true;
    } catch (error: any) {
      await errorAlert(error.message);
      return false;
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return {
    loans,
    loading,
    fetchLoans,
    handleCreateLoan,
    handleUpdateLoan,
    handleDeleteLoan,
  };
}
