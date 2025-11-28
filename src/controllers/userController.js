const User = require('../models/userModel');

module.exports = {
    async create(req, res) {
        const { nickname, age, city } = req.body;
        const id = await User.create(nickname, age, city);
        res.status(201).json({ id });
    },

    async update(req, res) {
        const { id } = req.params;
        const { nickname, age, city } = req.body;
        await User.update(id, nickname, age, city);
        res.json({ message: "User updated" });
    },

    async remove(req, res) {
        const { id } = req.params;
        await User.remove(id);
        res.json({ message: "User deleted" });
    }
};
