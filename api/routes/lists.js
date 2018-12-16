const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const List = require('../models/list');

// Fetches all lists
router.get('/', (req, res, next) => {
    List.find()
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
                            url: 'http://localhost:3000/' + 'lists/' + doc._id
                        }
                    }
                })
            };
            if (docs.length >= 1){
                res.status(200).json(response)
            } else {
                res.status(404).json({message: 'No lists found.'})
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

// Creates a new list
router.post('/', (req, res, next) => {
    const list = new List({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        user: req.body.user
    });
    list.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'List was created',
                createdList: {
                    _id: result._id,
                    name: result.name,
                    user: result.user,
                    active: result.active
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/' + 'lists/' + result._id
                }
            });
        })
        .catch( err => {
            console.log(err.message);
            res.status(500).json({
                error: err
            });
        });
});

// Fetches a list by ID
router.get('/:listId', (req, res, next) => {
    List.findById(req.params.listId)
        .select('_id, name, user, active')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    message: 'List found for provided ID:',
                    list: {
                        _id: doc._id,
                        name: doc.name,
                        user: doc.user,
                        active: doc.active
                    },
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/' + 'lists/'
                    }
                })
            } else {
                res.status(404).json({message: 'No list found for provided ID.'})
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
router.patch('/:listId', (req, res, next) => {
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    List.findById(req.params.listId)
        .then(doc => {
            if (doc < 1) {
                res.status(404).json({
                    message: 'List not found!'
                })
            } else {
                List.updateOne({_id: req.params.listId}, {$set: updateOps})
                    .exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Updated list successfully.',
                            list: {
                                _id: result._id,
                                name: result.name,
                                user: result.user,
                                active: result.active
                            },
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/' + 'lists/'
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

// Deletes one list by ID
router.delete('/:listId', (req, res, next) => {
    List.findById(req.params.listId)
        .then(doc => {
            if (doc < 1) {
                res.status(404).json({
                    message: 'Task not found!'
                })
            } else {
                List.deleteOne({_id: req.params.listId})
                    .exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'Deleted list successfully',
                            request: {
                                type: 'GET',
                                url: 'http://localhost:3000/' + 'lists/'
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