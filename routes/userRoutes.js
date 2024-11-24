// /backend/routes/userRoutes.js
const express = require('express');
const userRouter = express.Router();
const {getAllUsers, createUser, updateUser, deleteUser, getByID} = require('../controller/userController');

// Define CRUD routes
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getByID);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

module.exports = userRouter;