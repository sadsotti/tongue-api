CREATE DATABASE IF NOT EXISTS tongue;
USE tongue;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL,
    age INT,
    city VARCHAR(100)
);

CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL
);

CREATE TABLE interactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('like','comment') NOT NULL,
    interaction_time DATETIME NOT NULL,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);
