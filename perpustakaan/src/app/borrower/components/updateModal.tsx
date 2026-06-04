"use client";

import { useEffect, useState } from "react";
import { UpdateModalProps } from "../../../types/borrowerType";

export default function UpdateModal({
  isOpen,
  borrower,
  onClose,
  onSubmit,
}: UpdateModalProps) {
  const [name, setName] = useState("");
  const [alamat, setAlamat] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (borrower) {
      setName(borrower.name);
      setAlamat(borrower.alamat);
      setPhone(borrower.phone);
    }
  }, [borrower]);

  if (!isOpen || !borrower) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      id: borrower.id,
      name,
      alamat,
      phone,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 text-black">
        <h2 className="text-xl font-semibold mb-4">Edit Peminjam</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Peminjam"
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          <input
            type="text"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            placeholder="Alamat"
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telepon"
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          <div className="flex justify-end gap-2">
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
