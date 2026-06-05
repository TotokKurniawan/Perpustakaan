import { Dashboard } from "../types/dashboardType";
import { Loan } from "../types/loanType";
import { Book } from "../types/bookType";
import api from "../lib/axios";

export async function totalBuku(): Promise<Dashboard> {
  const response = await api.get(`/totalBuku`);
  return response.data;
}

export async function totalPeminjam(): Promise<Dashboard> {
  const response = await api.get(`/totalPeminjam`);
  return response.data;
}

export async function BukuSedangDipinjamBulan(): Promise<Dashboard> {
  const response = await api.get(`/BukuSedangDipinjamBulan`);
  return response.data;
}

export async function BukuSudahDikembalikan(): Promise<Dashboard> {
  const response = await api.get(`/BukuSudahDikembalikan`);
  return response.data;
}

export async function PeminjamanBulanIni(): Promise<{
  peminjaman_bulan_ini: Loan[];
}> {
  const response = await api.get(`/PeminjamanBulanIni`);
  return response.data;
}

export async function BukuTerbaruBulanIni(): Promise<{
  buku_terbaru_bulan_ini: Book[];
}> {
  const response = await api.get(`/BukuTerbaruBulanIni`);
  return response.data;
}

export async function BarchartData(): Promise<{
  bar_chart_data: { month: string; peminjaman: number }[];
}> {
  const response = await api.get(`/BarchartData`);
  return response.data;
}

export async function PiechartData(): Promise<{
  pie_chart_data: { name: string; value: number }[];
}> {
  const response = await api.get(`/PiechartData`);
  return response.data;
}
