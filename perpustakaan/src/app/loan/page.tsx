"use client";

import { useEffect, useState } from "react";
import { getLoans } from "../../services/loanService";

export default function LoanPage() {
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    setLoading(true);
    try {
      const data = await getLoans();
      setLoans(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (value?: string) => {
    if (!value) return "-";
    return new Date(value).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Data Peminjaman</h1>

      <p className="text-gray-500 mt-1">
        Kelola data peminjaman di perpustakaan
      </p>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Data Peminjaman
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {loans.length} transaksi peminjaman
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
              Tambah Peminjaman
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
                      Nama Buku
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">
                      Nama Peminjam
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">
                      Tanggal Pinjam
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">
                      Tanggal Kembali
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-sm text-gray-400"
                      >
                        Memuat data...
                      </td>
                    </tr>
                  )}

                  {!loading && loans.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-sm text-gray-400"
                      >
                        Tidak ada data peminjaman.
                      </td>
                    </tr>
                  )}

                  {loans.map((l, i) => (
                    <tr
                      key={l.id}
                      className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-500 w-12">{i + 1}</td>
                      <td className="px-4 py-3 font-medium text-gray-900 truncate">
                        {l.Book?.title ??
                          l.book?.title ??
                          l.book_title ??
                          l.book_id ??
                          "-"}
                      </td>
                      <td className="px-4 py-3 text-gray-500 truncate">
                        {l.Borrower?.name ??
                          l.borrower?.name ??
                          l.borrower_name ??
                          l.borrower_id ??
                          "-"}
                      </td>
                      <td className="px-4 py-3 text-gray-500 truncate">
                        {formatDate(
                          l.borrow_date ?? l.loan_date ?? l.borrowDate,
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-500 truncate">
                        {formatDate(
                          l.return_date ?? l.returnDate ?? l.return_Date,
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-500 truncate">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${l.status === "RETURNED" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}
                        >
                          {l.status ?? "-"}
                        </span>
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
