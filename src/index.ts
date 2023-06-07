import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import router from './router';
import mongoose from 'mongoose';

const app = express();

app.use(cors({ //middleware
    credentials: true, // telling the middleware to include any credentials, like cookies, in the requests.
}));

app.use(compression()); //Compression makes the data smaller, which helps to improve the performance of the application.
app.use(cookieParser()); // helps to parse the cookies sent by the client with each request.
app.use(bodyParser.json()); // helps to extract and interpret that data so that it can be easily used by the server.

const server = http.createServer(app); //create our server

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080'); //starts the server and displays a message in the console to let us know that the server is running and ready to handle incoming requests.
});


const MONGO_URL= 'mongodb+srv://jamesalford:kZiB9D6hAPYhCG8Q@cluster0.jtoyxsl.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URL); //establishes a connection between Mongoose and the MongoDB database

mongoose.connection.on('error', (error: Error) => console.log(error)); //error message

app.use('/', router()); //registers the router as middleware in the Express application for handling all incoming requests to the root URL