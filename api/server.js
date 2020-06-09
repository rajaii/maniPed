require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet')

const authRouter = require('../auth/authRouter.js');
const restricted = require('../auth/restrictedMiddleware.js');

server.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to the maniPed API!!</h1>');
});

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);





module.exports = server;