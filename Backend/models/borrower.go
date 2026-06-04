package models

type Borrower struct {
	ID     uint   `json:"id"`
	Name   string `json:"name"`
	Alamat string `json:"alamat"`
	Phone  string `json:"phone"`
}