const express = require('express');
const router = express.Router();

// Handles GET requests to /lists
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Lists was fetched'
    });
});

// Handles POST requests to /lists
router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'List was created'
    });
});

// Handles GET requests to /lists/<listID>
router.get('/:listId', (req, res, next) => {
    res.status(200).json({
        message: 'List info',
        id: req.params.listId
    })
});

// Handles PATCH requests to /lists/<listID>
router.patch('/:listId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated list'
    });
});

// Handles DELETE requests to /lists/<listID>
router.delete('/:listId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted list'
    });
});

module.exports = router;