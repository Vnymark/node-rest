const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
   res.status(200).json({
       message: 'Tasks were fetched'
   });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Task was created'
    });
});

router.get('/:taskId', (req, res, next) => {
    res.status(200).json({
        message: 'Task info',
        id: req.params.taskId
    })
});

router.patch('/:taskId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated task',
        id: req.params.taskId
    });
});

router.delete('/:taskId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted task',
        id: req.params.taskId

    });
});

module.exports = router;