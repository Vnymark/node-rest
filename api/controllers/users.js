const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Creates a user
exports.users_signup = (req, res, next) => {
    User.find({email: req.body.email})
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
};

// User login
exports.users_login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            if (!user){
                console.log(user);
                res.status(401).json({
                    message: 'Wrong email or password!'
                })
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        res.status(401).json({
                            message: 'Wrong email or password!'
                        })
                    }
                    if (result) {
                        const token = jwt.sign({
                                email: user.email,
                                userId: user._id
                            },
                            process.env.TOKEN_KEY,
                            {
                                expiresIn: "1h"
                            });
                        res.status(200).json({
                            message: 'Authorization successful!',
                            token: token
                        })
                    } else {
                        res.status(401).json({
                            message: 'Wrong email or password!'
                        })
                    }
                })
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({
                error: err
            });
        });
};

// Deletes a user by ID
exports.users_delete = (req, res, next) => {
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
};