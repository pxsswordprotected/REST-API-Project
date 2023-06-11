import express from 'express' ;

import { deleteUser, getAllUsers, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares'; // responsible for performing checks and validations related to user authentication and ownership

// responsible for defining and handling user-related routes

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers); //registers a GET route for the path '/users',
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser); //The deleteUser function is the route handler responsible for deleting a user specified by the id parameter
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser)
};  