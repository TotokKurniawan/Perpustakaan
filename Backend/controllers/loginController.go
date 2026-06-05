package controllers

import (
	"net/http"
	"time"

	"perpustakaan-api/config"
	"perpustakaan-api/models"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func Login(c *gin.Context) {

	var request struct {
		Email    string `json:"email" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	// Validasi input
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Email dan password wajib diisi",
		})
		return
	}

	// Cari user berdasarkan email
	var user models.User

	if err := config.DB.
		Where("email = ?", request.Email).
		First(&user).Error; err != nil {

		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Email atau password salah",
		})
		return
	}

	// Cek password
	if err := bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(request.Password),
	); err != nil {

		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Email atau password salah",
		})
		return
	}

	// Secret key JWT
	secretKey := []byte("rahasia-perpustakaan")

	// Buat token JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"name":    user.Name,
		"email":   user.Email,
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
	})

	tokenString, err := token.SignedString(secretKey)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Gagal membuat token",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Login berhasil",
		"token":   tokenString,
		"user": gin.H{
			"id":    user.ID,
			"name":  user.Name,
			"email": user.Email,
		},
	})
}

func ResetPassword(c *gin.Context) {
	var request struct {
		Email           string `json:"email" binding:"required,email"`
		NewPassword     string `json:"new_password" binding:"required,min=6"`
		ConfirmPassword string `json:"confirm_password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	if request.NewPassword != request.ConfirmPassword {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Konfirmasi password tidak cocok",
		})
		return
	}

	var user models.User

	if err := config.DB.
		Where("email = ?", request.Email).
		First(&user).Error; err != nil {

		c.JSON(http.StatusNotFound, gin.H{
			"message": "Email tidak ditemukan",
		})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(request.NewPassword),
		bcrypt.DefaultCost,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Gagal mengenkripsi password",
		})
		return
	}

	user.Password = string(hashedPassword)

	if err := config.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Gagal mengubah password",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Password berhasil diubah",
	})
}

func Register (c *gin.Context) {
	var request struct {
		Name     string `json:"name" binding:"required"`
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required,min=6"`
	}
	
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}
	if err := config.DB.Where("email = ?", request.Email).First(&models.User{}).Error; err == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Email sudah terdaftar",
		})
		return
	}
	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(request.Password),
		bcrypt.DefaultCost,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Gagal mengenkripsi password",
		})
		return
	}
	user := models.User{
		Name: request.Name,
		Email: request.Email,
		Password: string(hashedPassword),
	}

	if err := config.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Gagal membuat user",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "User berhasil dibuat",
	})
}