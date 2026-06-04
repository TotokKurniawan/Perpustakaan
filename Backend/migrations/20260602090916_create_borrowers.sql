-- +goose Up
SELECT 'up SQL query';

CREATE TABLE borrowers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    alamat VARCHAR(255) ,
    phone VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    
-- +goose Down
SELECT 'down SQL query';

DROP TABLE borrowers;