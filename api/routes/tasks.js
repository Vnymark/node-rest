const express = require('express');
const router = express.Router();
const checkAuth = require('../authentication/check-auth');
const TasksController = require ('../controllers/tasks');

// Returns all tasks
router.get('/', checkAuth, TasksController.tasks_fetchAll);

// Creates a new task
router.post('/', checkAuth, TasksController.tasks_createOne);

// Fetches a task by ID
router.get('/:taskId', checkAuth, TasksController.tasks_fetchById);

// Updates one property on a specific task
router.patch('/:taskId', checkAuth, TasksController.tasks_updateOne);

// Deletes one task by ID
router.delete('/:taskId', checkAuth, TasksController.tasks_delete);

module.exports = router;