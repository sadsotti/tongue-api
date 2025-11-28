const pool = require('../config/db');

module.exports = {
    async create(type, time, userId, postId) {
        const [result] = await pool.execute(
            "INSERT INTO interactions (type, interaction_time, user_id, post_id) VALUES (?, ?, ?, ?)",
            [type, time, userId, postId]
        );
        return result.insertId;
    },

    async update(id, type, time) {
        await pool.execute(
            "UPDATE interactions SET type = ?, interaction_time = ? WHERE id = ?",
            [type, time, id]
        );
    },

    async remove(id) {
        await pool.execute("DELETE FROM interactions WHERE id = ?", [id]);
    },

    async filterByCityAndDate(city, date) {
        const [rows] = await pool.execute(`
            SELECT 
                p.id AS post_id,
                p.title,
                COUNT(i.id) AS total_interactions
            FROM posts p
            JOIN interactions i ON p.id = i.post_id
            JOIN users u ON u.id = i.user_id
            WHERE u.city = ?
            AND DATE(i.interaction_time) = ?
            GROUP BY p.id
        `, [city, date]);

        return rows;
    }
};
