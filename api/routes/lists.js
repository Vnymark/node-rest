const express = require('express');
const router = express.Router();
const checkAuth = require('../authentication/check-auth');
const ListsController = require('../controllers/lists');

// Fetches all lists
router.get('/', checkAuth, ListsController.lists_fetchAll);

// Creates a new list
router.post('/', checkAuth, ListsController.lists_create);

// Fetches a list by ID
router.get('/:listId', checkAuth, ListsController.lists_fetchById);

// Updates one property on a specific task
router.patch('/:listId', checkAuth, ListsController.lists_updateOne);

// Deletes one list by ID
router.delete('/:listId', checkAuth, ListsController.lists_delete);

module.exports = router;