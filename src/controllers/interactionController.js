const Interaction = require('../models/interactionModel');

module.exports = {
    async create(req, res) {
        try {
            console.log("BODY:", req.body);

            const {
                type,
                interaction_time,
                user_id,
                post_id
            } = req.body;

            const id = await Interaction.create(
                type,              
                interaction_time,   
                user_id,            
                post_id             
            );

            res.status(201).json({ id });

        } catch (err) {
            console.error("ERROR:", err);
            res.status(500).json({ error: err.message });
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { type, interaction_time } = req.body;
        await Interaction.update(id, type, interaction_time);
        res.json({ message: "Interaction updated" });
    },

    async remove(req, res) {
        const { id } = req.params;
        await Interaction.remove(id);
        res.json({ message: "Interaction deleted" });
    },

    async filter(req, res) {
        const { city, date } = req.query;
        const rows = await Interaction.filterByCityAndDate(city, date);
        res.json(rows);
    }
};
