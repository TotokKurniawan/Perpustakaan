import { Loan } from "./loanType";
import { Book } from "./bookType";

export type Dashboard = {
  totalBuku: number;
  totalPeminjam: number;
  bukuSedangDipinjamBulan: number;
  bukuSudahDikembalikan: number;

  peminjamanBulanIni: any[];
  bukuTerbaruBulanIni: any[];

  barchartData: any[];
  piechartData: any[];
};
