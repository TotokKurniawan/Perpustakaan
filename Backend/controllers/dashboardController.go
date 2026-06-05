package controllers

import (
	"fmt"
	"perpustakaan-api/config"
	"perpustakaan-api/models"

	"github.com/gin-gonic/gin"
)

// GET /totalBuku
func GetTotalBuku(c *gin.Context) {

	var total int64	
	config.DB.Model(&models.Book{}).Count(&total)

	c.JSON(200, gin.H{
  "totalBuku": total,
})
}

// GET /totalPeminjam
func GetTotalPeminjam(c *gin.Context) {

	var total int64	
	config.DB.Model(&models.Borrower{}).Count(&total)	
	c.JSON(200, gin.H{
  "totalPeminjam": total,
})
}

// GET /BukuSedangDipinjamBulan
func GetBukuSedangDipinjam(c *gin.Context) {

	var total int64
	config.DB.Model(&models.Loan{}).Where("status = ?", "BORROWED").Count(&total)

c.JSON(200, gin.H{
  "bukuSedangDipinjamBulan": total,
})
}

// GET /BukuSudahDikembalikan
func GetBukuSudahDikembalikan(c *gin.Context) {
	var total int64
	config.DB.Model(&models.Loan{}).Where("status = ?", "RETURNED" ).Count(&total)

	c.JSON(200, gin.H{
  "bukuSudahDikembalikan": total,
})
}

// GET /PeminjamanBulanIni
func GetPeminjamanBulanIni(c *gin.Context) {
	var loans []models.Loan

	config.DB.
		Preload("Book").
		Preload("Borrower").
		Where("status = ?", "borrowed").
		Where("MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE())").
		Find(&loans)

	c.JSON(200, gin.H{
		"peminjaman_bulan_ini": loans,
	})
}

// GET /BukuTerbaruBulanIni
func GetBukuTerbaruBulanIni(c *gin.Context) {
	var books []models.Book

	config.DB.
		Where("MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE())").
		Order("created_at DESC").
		Find(&books)

	c.JSON(200, gin.H{
		"buku_terbaru_bulan_ini": books,
	})
}

func GetBarchartData(c *gin.Context) {
	type MonthlyLoan struct {
		Month      int64 `json:"month"`
		Peminjaman int64 `json:"peminjaman"`
	}

	var results []MonthlyLoan

	err := config.DB.Raw(`
		SELECT 
			MONTH(created_at) AS month,
			COUNT(*) AS peminjaman
		FROM loans
		GROUP BY MONTH(created_at)
		ORDER BY MONTH(created_at)
	`).Scan(&results).Error

	if err != nil {
		fmt.Println("ERROR:", err)
	}

	c.JSON(200, gin.H{
		"bar_chart_data": results,
	})
}

func GetPiechartData(c *gin.Context) {
	type PieData struct {
		Name  string `json:"name"`
		Value int64  `json:"value"`
	}
	var dipinjam int64
	var dikembalikan int64
	config.DB.Model(&models.Loan{}).Where("status = ?", "BORROWED").Count(&dipinjam)
	config.DB.Model(&models.Loan{}).Where("status = ?", "RETURNED").Count(&dikembalikan)

	c.JSON(200, gin.H{
		"pie_chart_data": []PieData{
			{Name: "Dipinjam", Value: dipinjam},
			{Name: "Dikembalikan", Value: dikembalikan},
		},
	})
}