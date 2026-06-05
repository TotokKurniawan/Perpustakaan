import { useEffect, useState } from "react";
import { Dashboard } from "../../../types/dashboardType";
import {
  totalBuku,
  totalPeminjam,
  BukuSedangDipinjamBulan,
  BukuSudahDikembalikan,
  PeminjamanBulanIni,
  BukuTerbaruBulanIni,
  BarchartData,
  PiechartData,
} from "../../../services/dashboardService";

export function useDashboard() {
  const [dashboardData, setDashboardData] = useState<Dashboard>({
    totalBuku: 0,
    totalPeminjam: 0,
    bukuSedangDipinjamBulan: 0,
    bukuSudahDikembalikan: 0,
    peminjamanBulanIni: [],
    bukuTerbaruBulanIni: [],
    barchartData: [],
    piechartData: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          totalBukuData,
          totalPeminjamData,
          bukuDipinjamData,
          bukuDikembalikanData,
          peminjamanData,
          bukuTerbaruData,
          barchartData,
          piechartData,
        ] = await Promise.all([
          totalBuku(),
          totalPeminjam(),
          BukuSedangDipinjamBulan(),
          BukuSudahDikembalikan(),
          PeminjamanBulanIni(),
          BukuTerbaruBulanIni(),
          BarchartData(),
          PiechartData(),
        ]);

        setDashboardData({
          totalBuku: totalBukuData.totalBuku,
          totalPeminjam: totalPeminjamData.totalPeminjam,
          bukuSedangDipinjamBulan: bukuDipinjamData.bukuSedangDipinjamBulan,
          bukuSudahDikembalikan: bukuDikembalikanData.bukuSudahDikembalikan,

          peminjamanBulanIni: peminjamanData.peminjaman_bulan_ini,
          bukuTerbaruBulanIni: bukuTerbaruData.buku_terbaru_bulan_ini,
          barchartData: barchartData.bar_chart_data,
          piechartData: piechartData.pie_chart_data,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardData();
  }, []);

  return { dashboardData };
}
