import express from 'express' ;

import { deleteUser, getAllUsers, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

// responsible for defining and handling user-related routes

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser)
};  