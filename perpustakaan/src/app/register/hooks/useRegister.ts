import { useState } from "react";
import { register } from "../../../services/loginService";
import { successAlert, errorAlert } from "../../../utils/alert";

export function useRegister() {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data: {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
  }) => {
    try {
      setLoading(true);

      await register(data);

      await successAlert("Registrasi berhasil");

      return true;
    } catch (error: any) {
      await errorAlert(error.message);

      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleRegister,
  };
}
