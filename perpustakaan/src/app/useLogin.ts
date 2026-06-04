import { useState } from "react";
import { useRouter } from "next/navigation";
import { Login } from "@/services/loginService";

export function useLogin() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError("");

      const response = await Login({
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.user));

      router.push("/dashboard");

      return response;
    } catch (err: any) {
      setError(err?.response?.data?.message || "Email atau password salah");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
}
