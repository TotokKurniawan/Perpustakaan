import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../../services/userService";
import { User } from "../../../types/userType";
import Swal from "sweetalert2";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    const result = await Swal.fire({
      title: "Hapus User?",
      text: "Data yang sudah dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return false;

    try {
      await deleteUser(id);

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "User berhasil dihapus",
      });

      await fetchUsers();

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
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    refreshUsers: fetchUsers,
    handleDeleteUser,
  };
}
