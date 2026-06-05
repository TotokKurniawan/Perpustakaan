"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForgotPassword } from "./hooks/useForgotPassword";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const { loading, handleResetPassword } = useForgotPassword();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await handleResetPassword({
      email,
      new_password: newPassword,
      confirm_password: confirmPassword,
    });

    if (success) {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 text-black">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 text-sm mt-2 mb-6">
          Masukkan email dan password baru.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Masukkan email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password Baru
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Password baru"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Konfirmasi Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Konfirmasi password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Reset Password"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="w-full border py-2 rounded-lg"
          >
            Kembali ke Login
          </button>
        </form>
      </div>
    </div>
  );
}
