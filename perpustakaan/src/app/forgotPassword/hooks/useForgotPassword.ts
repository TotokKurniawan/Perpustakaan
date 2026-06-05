import { useState } from "react";
import { resetPassword } from "../../../services/loginService";
import { successAlert, errorAlert } from "../../../utils/alert";

export function useForgotPassword() {
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (data: {
    email: string;
    new_password: string;
    confirm_password: string;
  }) => {
    try {
      setLoading(true);

      await resetPassword(data);

      await successAlert("Password berhasil diubah");

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
    handleResetPassword,
  };
}
