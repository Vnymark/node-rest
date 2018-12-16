const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require('../models/task');
const List = require('../models/list');

// Returns all tasks
router.get('/', (req, res, next) => {
    Task.find()
        .select('_id, name')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                tasks: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/' + 'tasks/' + doc._id
                        }
                    }
                })
            };
            if (docs.length >= 1){
                res.status(200).json(response)
            } else {
                res.status(404).json({message: 'No tasks found.'})
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

// Creates a new task
router.post('/', (req, res, next) => {
    List.findById(req.body.list)
        .then(list => {
            if (!list) {
                return res.status(404).json({
                    message: 'List not found.'
                });
            }
            const task = new Task({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                info: req.body.info,
                list: req.body.list,
                active: true
            });
            return task.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Task was created',
                createdTask: {
                    _id: result._id,
                    name: result.name,
                    info: result.info,
                    list: result.list,
                    active: result.active
                }, request: {
                    type: 'GET',
                    url: 'http://localhost:3000/' + 'tasks/' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({
                error: err
            });
        });

});

// Fetches a task by ID
router.get('/:taskId', (req, res, next) => {
    Task.findById(req.params.taskId)
        .select('_id, name, info, active')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    message: 'Task found for provided ID:',
                    task: {
                        _id: doc._id,
                        name: doc.name,
                        info: doc.info,
                        active: doc.active
                    }, request: {
                        type: 'GET',
                        url: 'http://localhost:3000/' + 'tasks/'
                    }
                })
            } else {
                return res.status(404).json({
                    message: 'No task found for provided ID.'
                })
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({
                error: err
            });
        });
});

// Updates one property on a specific task
router.patch('/:taskId', (req, res, next) => {
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Task.findById(req.params.taskId)
        .then(doc => {
            if (doc < 1) {
                res.status(404).json({
                    message: 'Task not found!'
                })
            } else {
                Task.updateOne({_id: req.params.taskId}, { $set: updateOps})
                    .exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Updated task successfully.',
                            task: {
                                _id: result._id,
                                name: result.name,
                                info: result.info,
                                active: result.active
                            }, request: {
                                type: 'GET',
                                url: 'http://localhost:3000/' + 'tasks/'
                            }
                        });
                    })
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({
                error: err
            })
        });
});

// Deletes one task by ID
router.delete('/:taskId', (req, res, next) => {
    Task.findById(req.params.taskId)
        .then(doc => {
            if (doc < 1) {
                res.status(404).json({
                    message: 'Task not found!'
                })
            } else {
                Task.deleteOne({_id: req.params.taskId})
                    .exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Task deleted successfully',
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/' + 'tasks/'
                            }
                        });
                    })
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;