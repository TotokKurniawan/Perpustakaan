import { useEffect, useState } from "react";
import {
  deleteUser,
  getUsers,
  createUser,
  updateUser,
} from "../../../services/userService";
import { User } from "../../../types/userType";
import { successAlert, confirmDelete, errorAlert } from "../../../utils/alert";

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

  const handleCreateUser = async (user: Omit<User, "id">) => {
    try {
      await createUser(user);
      await successAlert("Data pengguna berhasil ditambahkan");
      await fetchUsers();
    } catch (error: any) {
      await errorAlert(error.message);
    }
  };

  const handleUpdateUser = async (id: number, user: Partial<User>) => {
    try {
      await updateUser(id, user);
      await successAlert("Data pengguna berhasil diperbarui");
      await fetchUsers();
    } catch (error: any) {
      await errorAlert(error.message);
    }
  };

  const handleDeleteUser = async (id: number) => {
    const confirmed = await confirmDelete(
      "Hapus Pengguna?",
      "Data yang sudah dihapus tidak dapat dikembalikan.",
    );
    if (!confirmed) return false;
    try {
      await deleteUser(id);
      await successAlert("Data pengguna berhasil dihapus");
      await fetchUsers();
      return true;
    } catch (error: any) {
      await errorAlert(error.message);
      return false;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    fetchUsers,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
  };
}
