import { useEffect, useState } from "react";
import {
  getBorrowers,
  deleteBorrower,
} from "../../../services/borrowerService";
import { Borrower } from "../../../types/borrowerType";
import Swal from "sweetalert2";

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
    const result = await Swal.fire({
      title: "Hapus Peminjam?",
      text: "Data yang sudah dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return false;

    try {
      await deleteBorrower(id);

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Peminjam berhasil dihapus",
      });

      await fetchBorrowers();

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
    fetchBorrowers();
  }, []);

  return {
    borrowers,
    loading,
    refreshBorrowers: fetchBorrowers,
    handleDeleteBorrower,
  };
}
