"use client";

import { useState } from "react";
import { CreateLoanModalProps } from "../../../types/loanType";

export default function CreateLoanModal({
  isOpen,
  onClose,
  onSubmit,
  borrowers,
  books,
}: CreateLoanModalProps) {
  const [borrowerId, setBorrowerId] = useState("");
  const [bookId, setBookId] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [status, setStatus] = useState("BORROWED");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      borrower_id: Number(borrowerId),
      book_id: Number(bookId),
      borrow_date: borrowDate,
      return_date: returnDate,
      status,
    });

    setBorrowerId("");
    setBookId("");
    setBorrowDate("");
    setReturnDate("");
    setStatus("BORROWED");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 text-black">
        <h2 className="text-xl font-semibold mb-4">Tambah Data Peminjaman</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Buku */}
          <select
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          >
            <option value="">Pilih Buku</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>

          {/* Peminjam */}
          <select
            value={borrowerId}
            onChange={(e) => setBorrowerId(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          >
            <option value="">Pilih Peminjam</option>
            {borrowers.map((borrower) => (
              <option key={borrower.id} value={borrower.id}>
                {borrower.name}
              </option>
            ))}
          </select>

          {/* Tanggal Pinjam */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Tanggal Pinjam
            </label>
            <input
              type="date"
              value={borrowDate}
              onChange={(e) => setBorrowDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Tanggal Kembali */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Tanggal Kembali
            </label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="BORROWED">BORROWED</option>
            <option value="RETURNED">RETURNED</option>
          </select>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
