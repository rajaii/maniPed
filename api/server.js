require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet')

const authRouter = require('../auth/authRouter.js');
const usersRouter = require('./endpoints/users/usersRouter.js');
const providersRouter = require('../api/endpoints/providers/providersRouter.js');
const adminRouter = require('./endpoints/admin/adminRouter.js');
const manigodsRouter = require('./endpoints/admin/manigods/manigodsRouter.js');
const preAdminRouter = require('./endpoints/admin/pre_admin/preAdminRouter.js');
const bookingsRouter = require('./endpoints/bookings_and_services/future_bookings/bookingsRouter.js');
const servicesRouter = require('./endpoints/bookings_and_services/completed_services/servicesRouter.js');
const user_ratingsRouter = require('./endpoints/ratings/user_ratings/user_ratingsRouter.js');
const provider_ratingsRouter = require('./endpoints/ratings/provider_ratings/provider_ratingsRouter.js');
const avatarsRouter = require('./endpoints/users/avatars/avatarsRouter.js');
const showcaseRouter = require('./endpoints/providers/providerShowcase/showcaseRouter.js');
const restricted = require('../auth/restrictedMiddleware.js');


server.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to the maniPed API!!</h1>');
});

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);

//double protected authorization of roles so only admin can access this route  ADD checkRoles on specific requests so no conflict when users 
//need to access their own profiles
server.use('/api/users', restricted, usersRouter);
server.use('/api/providers', restricted, providersRouter);
server.use('/api/admin', restricted, adminRouter);
server.use('/api/manigods', restricted, manigodsRouter);
server.use('/api/preadmin', restricted, preAdminRouter);
server.use('/api/future_bookings', /*restricted,*/ bookingsRouter);
server.use('/api/services', /*restricted,*/ servicesRouter);
server.use('/api/user_ratings', /*restricted,*/ user_ratingsRouter);
server.use('/api/provider_ratings', /*restricted,*/ provider_ratingsRouter);
server.use('/api/avatars', /*restricted,*/ avatarsRouter);
server.use('/api/showcase', /*restricted,*/ showcaseRouter)




module.exports = server;