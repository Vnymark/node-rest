const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Lists was fetched'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'List was created'
    });
});

router.get('/:listId', (req, res, next) => {
    res.status(200).json({
        message: 'List info',
        id: req.params.listId
    })
});

router.patch('/:listId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated list'
    });
});

router.delete('/:listId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted list'
    });
});

module.exports = router;