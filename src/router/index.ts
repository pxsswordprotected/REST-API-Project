import express from 'express';

import authentication from './authentication';
import users from './users';

//needed to create a central point for combining and organizing the different routes and middleware functions related to user authentication and user-related operations.

const router = express.Router(); //creates a new router instance

export default (): express.Router => { // returns an Express router
    authentication(router); //before any route defined in the users function is reached, the authentication middleware will be executed to verify the user's authentication status
    users(router); //responsible for defining and handling user-related routes, that's why u need authentication first
    
    return router;
};