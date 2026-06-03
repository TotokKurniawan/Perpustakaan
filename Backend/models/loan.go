package models

type Loan struct {
	ID uint `json:"id"`

	BookID     uint `json:"book_id"`
	BorrowerID uint `json:"borrower_id"`

	BorrowDate string `json:"borrow_date"`
	ReturnDate string `json:"return_date"`

	Status string `json:"status"`

	Book     Book     `gorm:"foreignKey:BookID"`
	Borrower Borrower `gorm:"foreignKey:BorrowerID"`
}