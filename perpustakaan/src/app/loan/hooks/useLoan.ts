import { useEffect, useState } from "react";
import { getLoans, deleteLoan } from "../../../services/loanService";
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
    handleDeleteLoan,
  };
}
