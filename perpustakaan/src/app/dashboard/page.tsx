"use client";

import { BookOpen, Users, BookMarked, RotateCcw } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard Perpustakaan
        </h1>

        <p className="text-gray-500 mt-1">Ringkasan data perpustakaan</p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8 text-gray-500">
        <Card title="Total Buku" value="120" icon={<BookOpen size={24} />} />

        <Card title="Total Peminjam" value="45" icon={<Users size={24} />} />

        <Card
          title="Sedang Dipinjam"
          value="18"
          icon={<BookMarked size={24} />}
        />

        <Card
          title="Sudah Dikembalikan"
          value="102"
          icon={<RotateCcw size={24} />}
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-gray-500">
        {/* Peminjaman Terbaru */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-4">Peminjaman Terbaru</h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Nama</th>

                <th className="text-left py-2">Buku</th>

                <th className="text-left py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-3">Andi</td>

                <td>Belajar Golang</td>

                <td>
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                    Dipinjam
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-3">Budi</td>

                <td>Clean Code</td>

                <td>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    Kembali
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Buku Baru */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-4">Buku Terbaru</h2>

          <ul className="space-y-4">
            <li className="flex justify-between">
              <span>Clean Architecture</span>

              <span className="text-gray-400">2025</span>
            </li>

            <li className="flex justify-between">
              <span>Golang Mastery</span>

              <span className="text-gray-400">2025</span>
            </li>

            <li className="flex justify-between">
              <span>Next.js Complete Guide</span>

              <span className="text-gray-400">2025</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

type CardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

function Card({ title, value, icon }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h3 className="text-3xl font-bold mt-2">{value}</h3>
        </div>

        <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
          {icon}
        </div>
      </div>
    </div>
  );
}
