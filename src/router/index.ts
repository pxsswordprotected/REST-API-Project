import express from 'express';

import authentication from './authentication';

const router = express.Router(); //creates a new router instance

export default (): express.Router => { // returns an Express router
    authentication(router);
    
    return router;
};