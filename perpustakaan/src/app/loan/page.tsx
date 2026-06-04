"use client";
import { useState } from "react";
import { useLoans } from "./hooks/useLoan";
import CreateLoanModal from "./components/createModal";
import UpdateLoanModal from "./components/updateModal";

export default function LoansPage() {
  const { loans, loading, handleDeleteLoan } = useLoans();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<any>(null);
  const [search, setSearch] = useState("");

  const filtered = loans.filter(
    (loan) =>
      loan.Borrower?.name.toLowerCase().includes(search.toLowerCase()) ||
      loan.Borrower?.alamat.toLowerCase().includes(search.toLowerCase()),
  );
  const borrowers = [
    {
      id: 1,
      name: "Lukman",
    },
  ];

  const books = [
    {
      id: 1,
      title: "Belajar React",
    },
  ];

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
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M11 4a7 7 0 100 14 7 7 0 000-14z"
                  ></path>
                </svg>
                <input
                  type="text"
                  placeholder="Cari peminjaman..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400 w-44"
                />
              </div>

              <button
                onClick={() => {
                  setIsCreateModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-500 transition"
              >
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
                Tambah
              </button>
            </div>
          </div>
          <CreateLoanModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            borrowers={borrowers}
            books={books}
            onSubmit={(data) => {
              console.log(data);
              setIsCreateModalOpen(false);
            }}
          />
          <UpdateLoanModal
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            loan={selectedLoan}
            borrowers={borrowers}
            books={books}
            onSubmit={(id, data) => {
              console.log(id, data);
              setIsUpdateModalOpen(false);
            }}
          />

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
                    <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 w-28">
                      Aksi
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

                  {!loading && filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-sm text-gray-400"
                      >
                        Tidak ada data peminjaman.
                      </td>
                    </tr>
                  )}

                  {filtered.map((l, i) => (
                    <tr
                      key={l.id}
                      className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-500 w-12">{i + 1}</td>
                      <td className="px-4 py-3 font-medium text-gray-900 truncate">
                        {l.Book?.title ?? "-"}
                      </td>
                      <td className="px-4 py-3 text-gray-500 truncate">
                        {l.Borrower?.name ?? "-"}
                      </td>
                      <td className="px-4 py-3 text-gray-500 truncate">
                        {formatDate(l.borrow_date)}
                      </td>
                      <td className="px-4 py-3 text-gray-500 truncate">
                        {formatDate(l.return_date)}
                      </td>
                      <td className="px-4 py-3 text-gray-500 truncate">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${l.status === "RETURNED" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}
                        >
                          {l.status ?? "-"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => {
                              setSelectedLoan(l);
                              setIsUpdateModalOpen(true);
                            }}
                            className="p-2 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
                            aria-label="Edit"
                          >
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
                                d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z"
                              ></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteLoan(l.id)}
                            className="p-2 rounded-md border border-gray-200 text-red-500 hover:bg-red-50 transition"
                            aria-label="Hapus"
                          >
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"
                              ></path>
                            </svg>
                          </button>
                        </div>
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
