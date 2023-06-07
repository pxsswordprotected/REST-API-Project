import express from 'express';

import { createUser, getUserByEmail } from '../db/users';
import { random, authentication } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {
    try { 
        //registration process
        const { email, password, username } = req.body;

        if (!email || !password || !username) { //if the user is missing any of these, send error
            return res.sendStatus(400);
        } 

        const existingUser = await getUserByEmail(email); //const to get user by email

        if (existingUser) { //if user with that email already exists
            return res.sendStatus(400); //error if user already exists
        }
    //if everything works, create authentication
    //new user is created in the database with the provided email, username, and a salted and hashed password for authentication. The salt value adds an extra layer of security by making each user's password hash unique, and it helps protect against certain types of attacks
    const salt = random();
    const user = await createUser({
        email,
        username,
        authentication: {
            salt,
            password: authentication(salt, password),
        },
    });

    return res.status(200).json(user).end(); //server sends a response to the client with a status of 200, indicating that the request was successful

    } catch (error) { //error message
        console.log(error);
        return res.sendStatus(400);
    }
}