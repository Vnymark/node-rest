const express = require('express');
const router = express.Router();

// Handle GET requests to /tasks
router.get('/', (req, res, next) => {
   res.status(200).json({
       message: 'Tasks were fetched'
   });
});

// Handle POST requests to /tasks
router.post('/', (req, res, next) => {
    const task = {
        name: req.body.name,
        info: req.body.info
    };
    res.status(201).json({
        message: 'Task was created',
        createdTask: task
    });
});

// Handle GET requests to /tasks/<taskID>
router.get('/:taskId', (req, res, next) => {
    res.status(200).json({
        message: 'Task info',
        id: req.params.taskId
    })
});

// Handle PATCH requests to /tasks/<taskID>
router.patch('/:taskId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated task',
        id: req.params.taskId
    });
});

// Handle DELETE requests to /tasks/<taskID>
router.delete('/:taskId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted task',
        id: req.params.taskId

    });
});

module.exports = router;