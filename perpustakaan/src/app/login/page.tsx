"use client";

import { useState } from "react";
import Link from "next/link";
import { useLogin } from "./hooks/useLogin";

export default function LoginPage() {
  const { login, loading, error } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-white to-indigo-50">
      <div className="min-h-screen w-full grid lg:grid-cols-2">
        <section className="hidden lg:flex items-center justify-center px-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.16),transparent_38%)]" />
          <div className="relative max-w-xl">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/70 px-4 py-2 shadow-sm border border-white/80 backdrop-blur">
              <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                P
              </div>
              <span className="text-sm font-medium text-gray-700">
                Sistem Informasi Perpustakaan
              </span>
            </div>

            <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Masuk ke ruang kerja perpustakaan dengan cepat.
            </h1>

            <p className="mt-5 text-lg text-gray-600 max-w-lg">
              Kelola buku, peminjam, dan peminjaman dari satu dashboard yang
              rapi, ringan, dan mudah digunakan.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 max-w-lg">
              <div className="rounded-2xl bg-white/80 p-5 shadow-sm border border-white/80">
                <div className="text-2xl font-bold text-indigo-600">Books</div>
                <div className="mt-1 text-sm text-gray-500">
                  Data buku terpusat dan mudah dicari.
                </div>
              </div>
              <div className="rounded-2xl bg-white/80 p-5 shadow-sm border border-white/80">
                <div className="text-2xl font-bold text-sky-600">Loans</div>
                <div className="mt-1 text-sm text-gray-500">
                  Pantau status peminjaman secara real-time.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/80 p-8 sm:p-10">
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                P
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Perpustakaan
                </h2>
                <p className="text-sm text-gray-500">Login ke dashboard</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                Welcome back
              </p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Masuk ke akun Anda
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Gunakan email dan password untuk mengakses sistem.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="contoh@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div className="flex items-center justify-between gap-3 text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Ingat saya
                </label>
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Lupa password?
                </a>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-500 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </form>

            <div className="mt-8 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
              Belum punya akun?{" "}
              <Link
                href="/"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Kembali ke landing page
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
