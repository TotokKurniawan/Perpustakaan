package controllers

import (
	"perpustakaan-api/config"
	"perpustakaan-api/models"

	"github.com/gin-gonic/gin"
)

// GET /loans
func GetLoans(c *gin.Context) {

	var loans []models.Loan

	config.DB.
		Preload("Book").
		Preload("Borrower").
		Find(&loans)

	c.JSON(200, loans)
}

// GET /loans/:id
func GetLoan(c *gin.Context) {

	id := c.Param("id")

	var loan models.Loan

	if err := config.DB.
		Preload("Book").
		Preload("Borrower").
		First(&loan, id).Error; err != nil {

		c.JSON(404, gin.H{
			"message": "Peminjaman tidak ditemukan",
		})
		return
	}

	c.JSON(200, loan)
}

// POST /loans
func CreateLoan(c *gin.Context) {

	var loan models.Loan

	if err := c.ShouldBindJSON(&loan); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	config.DB.Create(&loan)

	c.JSON(201, loan)
}

// PUT /loans/:id
func UpdateLoan(c *gin.Context) {

	id := c.Param("id")

	var loan models.Loan

	if err := config.DB.First(&loan, id).Error; err != nil {
		c.JSON(404, gin.H{
			"message": "Peminjaman tidak ditemukan",
		})
		return
	}

	if err := c.ShouldBindJSON(&loan); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	config.DB.Save(&loan)

	c.JSON(200, loan)
}

// DELETE /loans/:id
func DeleteLoan(c *gin.Context) {

	id := c.Param("id")

	var loan models.Loan

	if err := config.DB.First(&loan, id).Error; err != nil {
		c.JSON(404, gin.H{
			"message": "Peminjaman tidak ditemukan",
		})
		return
	}

	config.DB.Delete(&loan)

	c.JSON(200, gin.H{
		"message": "Peminjaman berhasil dihapus",
	})
}