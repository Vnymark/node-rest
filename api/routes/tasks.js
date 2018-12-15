const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require('../models/task');

// Returns all tasks
router.get('/', (req, res, next) => {
    Task.find()
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length >= 1){
                res.status(200).json(docs)
            } else {
                res.status(404).json({message: 'No tasks found.'})
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// Creates a new task
router.post('/', (req, res, next) => {
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        info: req.body.info,
        active: true
    });
    task
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Task was created',
                createdTask: task
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// Fetches a task by ID
router.get('/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    Task.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc)
            } else {
                res.status(404).json({message: 'No task found for provided ID.'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// Updates one property on a specific task
router.patch('/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Task.update({_id: id}, { $set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

// Deletes one task by ID
router.delete('/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    Task.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

module.exports = router;