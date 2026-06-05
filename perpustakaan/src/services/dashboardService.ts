import { Dashboard } from "../types/dashboardType";
import { Loan } from "../types/loanType";
import { Book } from "../types/bookType";

const API_URL = "http://localhost:8080";

export async function totalBuku(): Promise<Dashboard> {
  const response = await fetch(`${API_URL}/totalBuku`);
  return response.json();
}

export async function totalPeminjam(): Promise<Dashboard> {
  const response = await fetch(`${API_URL}/totalPeminjam`);
  return response.json();
}

export async function BukuSedangDipinjamBulan(): Promise<Dashboard> {
  const response = await fetch(`${API_URL}/BukuSedangDipinjamBulan`);
  return response.json();
}

export async function BukuSudahDikembalikan(): Promise<Dashboard> {
  const response = await fetch(`${API_URL}/BukuSudahDikembalikan`);
  return response.json();
}

export async function PeminjamanBulanIni(): Promise<{
  peminjaman_bulan_ini: Loan[];
}> {
  const res = await fetch(`${API_URL}/PeminjamanBulanIni`);
  return res.json();
}

export async function BukuTerbaruBulanIni(): Promise<{
  buku_terbaru_bulan_ini: Book[];
}> {
  const res = await fetch(`${API_URL}/BukuTerbaruBulanIni`);
  return res.json();
}

export async function BarchartData(): Promise<{
  bar_chart_data: { month: string; peminjaman: number }[];
}> {
  const res = await fetch(`${API_URL}/BarchartData`);
  return res.json();
}

export async function PiechartData(): Promise<{
  pie_chart_data: { name: string; value: number }[];
}> {
  const res = await fetch(`${API_URL}/PiechartData`);
  return res.json();
}
