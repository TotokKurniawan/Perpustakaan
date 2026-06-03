package main

import (
	"log"

	"perpustakaan-api/config"
	"perpustakaan-api/seeders"
)

func main() {

	db := config.ConnectDB()

	if err := seeders.UserSeeder(db); err != nil {
		log.Fatal(err)
	}

	log.Println("Seeder berhasil dijalankan")
}