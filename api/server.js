require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet')

const authRouter = require('../auth/authRouter.js');
const usersRouter = require('../users/usersRouter.js');
const restricted = require('../auth/restrictedMiddleware.js');
const checkRoles = require('../auth/checkRoleMiddleware.js');

server.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to the maniPed API!!</h1>');
});

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);

//double protected authorization of roles so only admin can access this route
server.use('/api/users', /*restricted, checkRoles('ADMIN'),*/ usersRouter);





module.exports = server;