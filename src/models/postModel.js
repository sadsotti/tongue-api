const pool = require('../config/db');

module.exports = {
    async create(title, createdAt) {
        const [result] = await pool.execute(
            "INSERT INTO posts (title, created_at) VALUES (?, ?)",
            [title, createdAt]
        );
        return result.insertId;
    },

    async update(id, title, createdAt) {
        await pool.execute(
            "UPDATE posts SET title = ?, created_at = ? WHERE id = ?",
            [title, createdAt, id]
        );
    },

    async remove(id) {
        await pool.execute("DELETE FROM posts WHERE id = ?", [id]);
    },

    async getAll() {
        const [rows] = await pool.execute("SELECT id, title, created_at FROM posts");
        return rows;
    },

    async getAllWithAggregates() {
        const [rows] = await pool.execute(`
            SELECT 
                p.id,
                p.title,
                p.created_at,
                SUM(CASE WHEN i.type = 'like' THEN 1 ELSE 0 END) AS likes,
                SUM(CASE WHEN i.type = 'comment' THEN 1 ELSE 0 END) AS comments
            FROM posts p
            LEFT JOIN interactions i ON p.id = i.post_id
            GROUP BY p.id
        `);
        return rows;
    },

    async filterByDate(date) {
        const [rows] = await pool.execute(
            "SELECT id, title, created_at FROM posts WHERE DATE(created_at) = ?",
            [date]
        );
        return rows;
    }
};
