package seeders

import (
	"perpustakaan-api/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func UserSeeder(db *gorm.DB) error {

	var count int64

	db.Model(&models.User{}).Count(&count)

	if count > 0 {
		return nil
	}

	hashPassword, err := bcrypt.GenerateFromPassword(
		[]byte("123456"),
		bcrypt.DefaultCost,
	)

	if err != nil {
		return err
	}

	user := models.User{
		Name:     "Administrator",
		Email:    "admin@gmail.com",
		Password: string(hashPassword),
	}

	return db.Create(&user).Error
}