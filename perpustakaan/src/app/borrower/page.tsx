"use client";

import { useEffect, useState } from "react";
import { getBorrowers } from "../../services/borrowerService";

export default function BorrowerPage() {
  const [borrowers, setBorrowers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBorrowers();
  }, []);

  const fetchBorrowers = async () => {
    setLoading(true);
    try {
      const data = await getBorrowers();
      setBorrowers(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Data Peminjam</h1>

      <p className="text-gray-500 mt-1">Kelola data peminjam di perpustakaan</p>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Data Peminjam
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {borrowers.length} peminjam terdaftar
              </p>
            </div>

            <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 transition">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              Tambah Peminjam
            </button>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table
                className="min-w-full text-sm"
                style={{ tableLayout: "fixed" }}
              >
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 w-12">
                      #
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">
                      Nama
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">
                      Email
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">
                      Telepon
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-10 text-center text-sm text-gray-400"
                      >
                        Memuat data...
                      </td>
                    </tr>
                  )}

                  {!loading && borrowers.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-10 text-center text-sm text-gray-400"
                      >
                        Tidak ada peminjam ditemukan.
                      </td>
                    </tr>
                  )}

                  {borrowers.map((b, i) => (
                    <tr
                      key={b.id}
                      className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-500 w-12">{i + 1}</td>
                      <td className="px-4 py-3 font-medium text-gray-900 truncate">
                        {b.name}
                      </td>
                      <td className="px-4 py-3 text-gray-500 truncate">
                        {b.email}
                      </td>
                      <td className="px-4 py-3 text-gray-500 truncate">
                        {b.phone}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
