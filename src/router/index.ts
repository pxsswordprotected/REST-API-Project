import express from 'express';

import authentication from './authentication';
import users from './users';

const router = express.Router(); //creates a new router instance

export default (): express.Router => { // returns an Express router
    authentication(router);
    users(router);
    
    return router;
};