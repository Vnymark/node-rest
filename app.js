const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.status(200).json({
        message: "Server is up and running!"
    });
});

module.exports = app;