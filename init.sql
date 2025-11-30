-- init.sql
CREATE DATABASE IF NOT EXISTS dosi_db;
USE dosi_db;

CREATE TABLE IF NOT EXISTS user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
    );

-- Insertion
INSERT IGNORE INTO user (nom, prenom, email) VALUES
('Dupont', 'Jean', 'jean.dupont@email.com'),
('Martin', 'Marie', 'marie.martin@email.com'),
('Bernard', 'Pierre', 'pierre.bernard@email.com');


