const express = require('express');
const app = express();
const morgan = require('morgan');

const taskRoutes = require('./api/routes/tasks');
const listRoutes = require('./api/routes/lists');

app.use(morgan('dev'));

// Routes which should handle valid requests
app.use('/tasks', taskRoutes);
app.use('/lists', listRoutes);

// Error handling for unknown request
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Error handling for errors from within the application
app.use((error, req, res, next) => {
   res.status(error.status || 500);
   res.json({
       error: {
           message: error.message
       }
   });
});

module.exports = app;