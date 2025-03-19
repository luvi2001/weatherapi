const express = require('express');
const userController = require('../controllers/userController.js');
const router = express.Router();

router.post('/users', userController.createUser);
router.put('/users/:email', userController.updateUserLocation);

module.exports = router;
