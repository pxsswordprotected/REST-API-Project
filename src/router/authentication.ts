import express from 'express';

import { login, register } from '../controllers/authentication';

export default (router: express.Router) => { //handles user registration
    router.post('/auth/register', register); // executed when a POST request is made to the "/auth/register" endpoint
    router.post('/auth/login', login)
};
