const Post = require('../models/postModel');

module.exports = {
    async create(req, res) {
        const { title, createdAt } = req.body;
        const id = await Post.create(title, createdAt);
        res.status(201).json({ id });
    },

    async update(req, res) {
        const { id } = req.params;
        const { title, createdAt } = req.body;
        await Post.update(id, title, createdAt);
        res.json({ message: "Post updated" });
    },

    async remove(req, res) {
        const { id } = req.params;
        await Post.remove(id);
        res.json({ message: "Post deleted" });
    },

    async all(req, res) {
        const posts = await Post.getAll();
        res.json(posts);
    },

    async aggregated(req, res) {
        const rows = await Post.getAllWithAggregates();
        res.json(rows);
    },

    async filter(req, res) {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ error: "Missing date parameter" });
        }

        const rows = await Post.filterByDate(date);
        res.json(rows);
    }
};
