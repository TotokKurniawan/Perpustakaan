package controllers

import (
	"perpustakaan-api/config"
	"perpustakaan-api/models"

	"github.com/gin-gonic/gin"
)

// GET /users
func GetUsers(c *gin.Context) {
	var users []models.User

	config.DB.Find(&users)	
	c.JSON(200, users)
}

// GET /users/:id
func GetUser(c *gin.Context) {
	id := c.Param("id")
	var user models.User

	if err := config.DB.First(&user, id).Error; err != nil {
		c.JSON(404, gin.H{
			"message": "Pengguna tidak ditemukan",
		})
		return
	}	
	c.JSON(200, user)
}

// POST /users
func CreateUser(c *gin.Context){	
	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {	
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	config.DB.Create(&user)
	c.JSON(201, user)
}

// PUT /users/:id
func UpdateUser(c *gin.Context) {
	id := c.Param("id")
	var user models.User
	if err := config.DB.First(&user, id).Error; err != nil {
		c.JSON(404, gin.H{
			"message": "Pengguna tidak ditemukan",
		})
		return
	}
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	config.DB.Save(&user)
	c.JSON(200, user)
}

// DELETE /users/:id
func DeleteUser(c *gin.Context) {
	id := c.Param("id")
	var user models.User
	if err := config.DB.First(&user, id).Error; err != nil {
		c.JSON(404, gin.H{
			"message": "Pengguna tidak ditemukan",
		})
		return
	}
	config.DB.Delete(&user)
	c.JSON(200, gin.H{
		"message": "Pengguna berhasil dihapus",
	})
}
