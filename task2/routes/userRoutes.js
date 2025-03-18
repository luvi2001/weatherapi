import express from 'express';
import * as userController from '../controllers/userController.js';
const router = express.Router();

router.post('/users', userController.createUser);
router.put('/users/:email', userController.updateUserLocation);


export default router;