import express from 'express';

import { getUsers } from '../db/users'

export const getAllUsers = async (req: express.Request, res: express.Response) => {
   
   //exports a function that retrieves all users and sends them as a JSON response with a status code of 200

    try {
        const users = await getUsers();

        return res.status(200).json(users);

    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
}