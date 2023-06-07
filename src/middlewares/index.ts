import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try { 

     // ensure that the session token is valid and corresponds to an existing user. 

      const sessionToken = req.cookies['SHANKS-AUTH']; // retrieves the value of the session token from the cookie named 'SHANKS-AUTH' that was sent with the request

      if (!sessionToken) {
        return res.sendStatus(400);
      }

      const existingUser = await getUserBySessionToken(sessionToken);

    if(!existingUser) {
        return res.sendStatus(400);
    }

    merge(req, { identity: existingUser }); // adding the existingUser information to the req object, specifically under the identity property

    return next();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
