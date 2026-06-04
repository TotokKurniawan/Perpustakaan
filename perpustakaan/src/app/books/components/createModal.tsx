"use client";

import { useState } from "react";
import { CreateModalProps } from "../../../types/bookType";

export default function CreateModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateModalProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      title,
      author,
      publisher,
      year: Number(year),
    });

    setTitle("");
    setAuthor("");
    setPublisher("");
    setYear("");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 text-black">
        <h2 className="text-xl font-semibold mb-4">Tambah Buku</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Judul Buku"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          <input
            type="text"
            placeholder="Penulis"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          <input
            type="text"
            placeholder="Penerbit"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          <input
            type="number"
            placeholder="Tahun Terbit"
            value={year}
            onChange={(e) => setYear(e.target.value)}
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
