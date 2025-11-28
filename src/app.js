const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/interactions', require('./routes/interactionRoutes'));

app.get('/', (req, res) => {
    res.send("Tongue API is running 🚀");
});


module.exports = app;
