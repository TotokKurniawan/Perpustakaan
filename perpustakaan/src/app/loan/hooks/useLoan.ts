import { useEffect, useState } from "react";
import { getLoans, deleteLoan } from "../../../services/loanService";
import { Loan } from "../../../types/loanType";
import Swal from "sweetalert2";

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
    const result = await Swal.fire({
      title: "Hapus Peminjaman?",
      text: "Data yang sudah dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return false;

    try {
      await deleteLoan(id);

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Peminjaman berhasil dihapus",
      });

      await fetchLoans();

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
    fetchLoans();
  }, []);

  return {
    loans,
    loading,
    refreshLoans: fetchLoans,
    handleDeleteLoan,
  };
}
