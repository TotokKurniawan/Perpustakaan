package routes

import (
	"perpustakaan-api/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {

	// BOOKS
	r.GET("/books", controllers.GetBooks)
	r.GET("/books/:id", controllers.GetBook)
	r.POST("/books", controllers.CreateBook)
	r.PUT("/books/:id", controllers.UpdateBook)
	r.DELETE("/books/:id", controllers.DeleteBook)

	// BORROWERS
	r.GET("/borrowers", controllers.GetBorrowers)
	r.GET("/borrowers/:id", controllers.GetBorrower)
	r.POST("/borrowers", controllers.CreateBorrower)
	r.PUT("/borrowers/:id", controllers.UpdateBorrower)
	r.DELETE("/borrowers/:id", controllers.DeleteBorrower)

	// LOANS
	r.GET("/loans", controllers.GetLoans)
	r.GET("/loans/:id", controllers.GetLoan)
	r.POST("/loans", controllers.CreateLoan)
	r.PUT("/loans/:id", controllers.UpdateLoan)
	r.DELETE("/loans/:id", controllers.DeleteLoan)

	// LOGIN
	r.POST("/login", controllers.Login)

	// USERS
	r.GET("/users", controllers.GetUsers)
	r.GET("/users/:id", controllers.GetUser)
	r.POST("/users", controllers.CreateUser)
	r.PUT("/users/:id", controllers.UpdateUser)
	r.DELETE("/users/:id", controllers.DeleteUser)
}