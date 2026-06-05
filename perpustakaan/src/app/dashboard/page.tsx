"use client";

import { BookOpen, Users, BookMarked, RotateCcw } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useDashboard } from "./hooks/useDashboard";

export default function DashboardPage() {
  
  const { dashboardData } = useDashboard();
  const COLORS = ["#4f46e5", "#22c55e"];
  const MONTHS = [
    "",
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const barData =
    dashboardData.barchartData?.map((item) => ({
      month: MONTHS[Number(item.month)],
      peminjaman: item.peminjaman,
    })) || [];
  const pieData = [
    { name: "Dipinjam", value: dashboardData.bukuSedangDipinjamBulan },
    { name: "Dikembalikan", value: dashboardData.bukuSudahDikembalikan },
  ];

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
        <Card
          title="Total Buku"
          value={String(dashboardData.totalBuku)}
          icon={<BookOpen size={24} />}
        />

        <Card
          title="Total Peminjam"
          value={String(dashboardData.totalPeminjam)}
          icon={<Users size={24} />}
        />

        <Card
          title="Sedang Dipinjam"
          value={String(dashboardData.bukuSedangDipinjamBulan)}
          icon={<BookMarked size={24} />}
        />

        <Card
          title="Sudah Dikembalikan"
          value={String(dashboardData.bukuSudahDikembalikan)}
          icon={<RotateCcw size={24} />}
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-gray-500">
        {/* Peminjaman Terbaru */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-4">Peminjaman Bulan Ini</h2>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Nama</th>

                <th className="text-left py-2">Buku</th>

                <th className="text-left py-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {dashboardData.peminjamanBulanIni.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-3">{item.Borrower?.name}</td>

                  <td>{item.Book?.title}</td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.status === "borrowed"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Buku Baru */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-4">Buku Terbaru Bulan Ini</h2>

          <ul className="space-y-4">
            {dashboardData.bukuTerbaruBulanIni.map((book) => (
              <li key={book.id} className="flex justify-between">
                <span>{book.title}</span>
                <span className="text-gray-400">{book.year}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Piechart */}
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-4">Statistik Peminjaman</h2>

          <div className="w-full h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
              >
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  padding={{ left: 10, right: 10 }}
                />

                <YAxis
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Bar
                  dataKey="peminjaman"
                  fill="#4f46e5"
                  radius={[6, 6, 0, 0]}
                  barSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Piechart */}
        <div className="bg-white p-5 rounded-xl shadow-sm ">
          <h2 className="text-lg font-semibold mb-4">Status Buku</h2>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
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
