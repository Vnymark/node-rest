const express = require('express');
const app = express();

const taskRoutes = require('./api/routes/tasks');
const listRoutes = require('./api/routes/lists');

app.use('/tasks', taskRoutes);
app.use('/lists', listRoutes);

module.exports = app;