const pool = require('../config/db');

module.exports = {
    async create(nickname, age, city) {
        const [result] = await pool.execute(
            "INSERT INTO users (nickname, age, city) VALUES (?, ?, ?)",
            [nickname, age, city]
        );
        return result.insertId;
    },

    async update(id, nickname, age, city) {
        await pool.execute(
            "UPDATE users SET nickname = ?, age = ?, city = ? WHERE id = ?",
            [nickname, age, city, id]
        );
    },

    async remove(id) {
        await pool.execute("DELETE FROM users WHERE id = ?", [id]);
    }
};
