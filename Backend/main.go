package main

import (
	"perpustakaan-api/config"
	"perpustakaan-api/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	config.ConnectDB()

	r := gin.Default()
	r.Use(cors.Default())
	routes.SetupRoutes(r)

	r.Run(":8080")
}