const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const taskRoutes = require('./api/routes/tasks');
const listRoutes = require('./api/routes/lists');
const userRoutes = require('./api/routes/users');

mongoose.connect(
    'mongodb+srv://' +
    process.env.DB_USER +
    process.env.DB_PASSWORD +
    process.env.DATABASE,
    {
    useNewUrlParser: true
    }
);

// Logging
app.use(morgan('dev'));
// Parsing body on incoming requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Handling CORS errors
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header(
       'Access-Control-Allow-Headers',
       'Origin, X-Requested-With, Content-Type, Accept, Authorization'
   );
   if (req.method === 'OPTIONS') {
       res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
       return res.status(200).json({});
   }
   next();
});

// Routes which should handle valid requests
app.use('/tasks', taskRoutes);
app.use('/lists', listRoutes);
app.use('/users', userRoutes);

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