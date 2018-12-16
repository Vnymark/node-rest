const express = require('express');
const router = express.Router();
const checkAuth = require('../authentication/check-auth');
const UsersController = require('../controllers/users');

// Creates a user
router.post('/signup', UsersController.users_signup);

// User login
router.post('/login', UsersController.users_login);

// Deletes a user by ID
router.delete('/:userId', checkAuth, UsersController.users_delete);

module.exports = router;