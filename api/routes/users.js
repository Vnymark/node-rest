const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    User.find({email:req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(422).json({
                    message: 'Email exists!'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            active: true
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created successfully!'
                                })
                            })
                            .catch(err => {
                                console.log(err.message);
                                res.status(500).json({
                                    error: err
                                });
                            })
                    }

                })
            }
    });
});

router.delete('/:userId', (req, res, next) => {
    User.findById(req.params.userId)
        .then(doc => {
            if (doc < 1) {
                res.status(404).json({
                    message: 'User not found!'
                })
            } else {
                User.deleteOne({_id: req.params.userId})
                    .exec()
                    .then(result => {
                        res.status(200).json({
                            message: 'User deleted successfully'
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