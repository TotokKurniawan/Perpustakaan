"use client";

import { useEffect, useState } from "react";
import { UpdateModalProps } from "../../../types/bookType";

export default function UpdateModal({
  isOpen,
  book,
  onClose,
  onSubmit,
}: UpdateModalProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setPublisher(book.publisher);
      setYear(book.year.toString());
    }
  }, [book]);

  if (!isOpen || !book) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onSubmit({
      id: book.id,
      title,
      author,
      publisher,
      year: Number(year),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 text-black">
        <h2 className="text-xl font-semibold mb-4">Edit Buku</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul Buku"
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Penulis"
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          <input
            type="text"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            placeholder="Penerbit"
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Tahun Terbit"
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
