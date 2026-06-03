package controllers

import (
	"perpustakaan-api/config"
	"perpustakaan-api/models"

	"github.com/gin-gonic/gin"
)

// GET /books
func GetBooks(c *gin.Context) {

	var books []models.Book

	config.DB.Find(&books)

	c.JSON(200, books)
}

// GET /books/:id
func GetBook(c *gin.Context) {

	id := c.Param("id")	

	var book models.Book

	if err := config.DB.First(&book, id).Error; err != nil {
		c.JSON(404, gin.H{
			"message": "Buku tidak ditemukan",
		})
		return
	}

	c.JSON(200, book)
}

// POST /books
func CreateBook(c *gin.Context) {

	var book models.Book

	if err := c.ShouldBindJSON(&book); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	config.DB.Create(&book)

	c.JSON(201, book)
}

func UpdateBook(c *gin.Context) {

	id := c.Param("id")

	var book models.Book

	if err := config.DB.First(&book, id).Error; err != nil {
		c.JSON(404, gin.H{
			"message": "Buku tidak ditemukan",
		})
		return
	}

	if err := c.ShouldBindJSON(&book); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	config.DB.Save(&book)

	c.JSON(200, book)
}

// DELETE /books/:id
func DeleteBook(c *gin.Context) {

	id := c.Param("id")

	var book models.Book

	if err := config.DB.First(&book, id).Error; err != nil {
		c.JSON(404, gin.H{
			"message": "Buku tidak ditemukan",
		})
		return
	}

	config.DB.Delete(&book)

	c.JSON(200, gin.H{
		"message": "Buku berhasil dihapus",
	})
}