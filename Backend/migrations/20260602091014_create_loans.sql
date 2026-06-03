-- +goose Up
SELECT 'up SQL query';
CREATE TABLE loans (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    book_id BIGINT NOT NULL,
    borrower_id BIGINT NOT NULL,

    borrow_date DATE,
    return_date DATE,

    status ENUM('BORROWED','RETURNED') DEFAULT 'BORROWED',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (borrower_id) REFERENCES borrowers(id)
);
-- +goose Down
SELECT 'down SQL query';

DROP TABLE loans;