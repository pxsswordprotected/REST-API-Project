import express from 'express';

import { createUser, getUserByEmail } from '../db/users';
import { random, authentication } from '../helpers';

//handles user authentication and registration functionality

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body; //extracts the email and password values from the req.body object

        if (!email || !password) { //if no email or pass
            return res.sendStatus(400);
        }

        // the code retrieves the user's information, including their salt and password, from the database
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, password); // an "expected hash" based on the user's salt and the provided password 

        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }

        const salt = random();
        
        //By updating the session token, the code ensures that each time the user logs in, a new session token is generated and associated with their user account. This session token helps identify and authenticate the user during their current session.
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('SHANKS-AUTH', user.authentication.sessionToken, { domain: 'localhost'}); // sets a cookie named 'SHANKS-AUTH' with a value of user.authentication.sessionToken
        //By setting this cookie, the server is storing the session token on the user's browser. This allows the server to recognize the user and maintain their logged-in state during their interaction with the application.

        return res.status(200).json(user).end(); //sends a JSON response to the client with a status code of 200, indicating that the request was successful

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

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