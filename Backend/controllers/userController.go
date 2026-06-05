package controllers

import (
	"perpustakaan-api/config"
	"perpustakaan-api/models"

	"golang.org/x/crypto/bcrypt"

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
func CreateUser(c *gin.Context) {
	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(user.Password),
		bcrypt.DefaultCost,
	)

	if err != nil {
		c.JSON(500, gin.H{
			"error": "Gagal hash password",
		})
		return
	}

	user.Password = string(hashedPassword)

	config.DB.Create(&user)

	c.JSON(201, gin.H{
		"id": user.ID,
		"name": user.Name,
		"email": user.Email,
	})
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

	var input models.User

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	user.Name = input.Name
	user.Email = input.Email

	if input.Password != "" {
		hashedPassword, err := bcrypt.GenerateFromPassword(
			[]byte(input.Password),
			bcrypt.DefaultCost,
		)

		if err != nil {
			c.JSON(500, gin.H{
				"error": "Gagal hash password",
			})
			return
		}

		user.Password = string(hashedPassword)
	}

	config.DB.Save(&user)

	c.JSON(200, gin.H{
		"id": user.ID,
		"name": user.Name,
		"email": user.Email,
	})
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
