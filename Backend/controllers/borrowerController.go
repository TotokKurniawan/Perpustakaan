package controllers

import (
	"perpustakaan-api/config"
	"perpustakaan-api/models"

	"github.com/gin-gonic/gin"
)

// GET /borrowers
func GetBorrowers(c *gin.Context) {

	var borrowers []models.Borrower

	config.DB.Find(&borrowers)

	c.JSON(200, borrowers)
}

// GET /borrowers/:id
func GetBorrower(c *gin.Context) {

	id := c.Param("id")

	var borrower models.Borrower

	if err := config.DB.First(&borrower, id).Error; err != nil {
		c.JSON(404, gin.H{
			"message": "Peminjam tidak ditemukan",
		})
		return
	}

	c.JSON(200, borrower)
}

// POST /borrowers
func CreateBorrower(c *gin.Context) {

	var borrower models.Borrower

	if err := c.ShouldBindJSON(&borrower); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	config.DB.Create(&borrower)

	c.JSON(201, borrower)
}

// PUT /borrowers/:id
func UpdateBorrower(c *gin.Context) {

	id := c.Param("id")

	var borrower models.Borrower

	if err := config.DB.First(&borrower, id).Error; err != nil {
		c.JSON(404, gin.H{
			"message": "Peminjam tidak ditemukan",
		})
		return
	}

	if err := c.ShouldBindJSON(&borrower); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	config.DB.Save(&borrower)

	c.JSON(200, borrower)
}

// DELETE /borrowers/:id
func DeleteBorrower(c *gin.Context) {
	id := c.Param("id")

	var borrower models.Borrower

	if err := config.DB.First(&borrower, id).Error; err != nil {
		c.JSON(404, gin.H{
			"message": "Peminjam tidak ditemukan",
		})
		return
	}

	result := config.DB.Delete(&borrower)

	if result.Error != nil {
		c.JSON(400, gin.H{
			"message": "Peminjam masih digunakan pada data peminjaman",
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "Peminjam berhasil dihapus",
	})
}