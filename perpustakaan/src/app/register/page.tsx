"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister } from "./hooks/useRegister";

export default function RegisterPage() {
  const router = useRouter();
  const { handleRegister } = useRegister();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await handleRegister({
      name,
      email,
      password,
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
          Register
        </h1>

        <p className="text-center text-gray-500 text-sm mt-2 mb-6">
          Buat akun baru untuk mengakses aplikasi perpustakaan.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Nama Lengkap
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email"
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Konfirmasi Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Konfirmasi password"
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition"
          >
            Daftar
          </button>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="w-full border py-2 rounded-lg hover:bg-gray-50"
          >
            Kembali ke Login
          </button>
        </form>
      </div>
    </div>
  );
}
