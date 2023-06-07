import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

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


