"use client";

import { useState } from "react";
import { CreateModalProps } from "../../../types/borrowerType";

export default function CreateModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateModalProps) {
  const [alamat, setAlamat] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      name,
      alamat,
      phone,
    });

    setName("");
    setAlamat("");
    setPhone("");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 text-black">
        <h2 className="text-xl font-semibold mb-4">Tambah Peminjam</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nama Peminjam"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          <input
            type="text"
            placeholder="Alamat"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          <input
            type="text"
            placeholder="Telepon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
