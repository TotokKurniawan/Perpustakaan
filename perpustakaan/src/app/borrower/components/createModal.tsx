"use client";

import { useState } from "react";
import { CreateModalProps } from "../../../types/borrowerType";

export default function CreateModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateModalProps) {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [telepon, setTelepon] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      nama,
      alamat,
      telepon,
    });

    setNama("");
    setAlamat("");
    setTelepon("");

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
            value={nama}
            onChange={(e) => setNama(e.target.value)}
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
            value={telepon}
            onChange={(e) => setTelepon(e.target.value)}
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
