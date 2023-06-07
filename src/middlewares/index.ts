import express from 'express';
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  
  // used to check if the current user is the owner of a resource based on their identity and the id parameter

  try {

    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string; //retrieves the value of the _id property from the req object's identity property

    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next(); //proceed to the next middleware or route handler

  } catch(error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

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
