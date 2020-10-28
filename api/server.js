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
const nailsServicesRouter = require('./endpoints/bookings_and_services/nails_services/nails_servicesRouter.js');
const hairServicesRouter = require('./endpoints/bookings_and_services/hair_services/hair_servicesRouter.js');
const massageServicesRouter = require('./endpoints/bookings_and_services/massage_services/massage_servicesRouter.js');
const user_ratingsRouter = require('./endpoints/ratings/user_ratings/user_ratingsRouter.js');
const provider_ratingsRouter = require('./endpoints/ratings/provider_ratings/provider_ratingsRouter.js');
const availableServicesRouter = require('./endpoints/bookings_and_services/available_services/available_servicesRouter.js');
const nearbyProvidersRouter = require('./endpoints/providers/nearbyProvidersRouter.js');
const userSettingsRouter = require('./endpoints/users/settings/settingsRouter.js');
const addressesRouter = require('./endpoints/users/addresses/addressesRouter.js');
const stripeRouter = require('./endpoints/users/stripe.js');
const restricted = require('../auth/restrictedMiddleware.js');


server.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to the maniPed API!!</h1>');
});
server.use(cors());
server.use(helmet());
server.use(express.json());



//double protected authorization of roles so only admin can access this route  ADD checkRoles on specific requests so no conflict when users 
//need to access their own profiles
server.use('/api/auth', authRouter);
server.use('/api/users',  restricted, usersRouter);
server.use('/api/providers', /*restricted,*/ providersRouter);
server.use('/api/admin', restricted, adminRouter);
server.use('/api/manigods', restricted, manigodsRouter);
server.use('/api/preadmin', restricted, preAdminRouter);
server.use('/api/future_bookings', /*restricted,*/ bookingsRouter);
server.use('/api/services', /*restricted,*/ servicesRouter);
server.use('/api/nails_servicesrouter', nailsServicesRouter);
server.use('/api/hair_servicesrouter', hairServicesRouter);
server.use('/api/massage_servicesrouter', massageServicesRouter);
server.use('/api/user_ratings', /*restricted,*/ user_ratingsRouter);
server.use('/api/provider_ratings', /*restricted,*/ provider_ratingsRouter);
server.use('/api/available_services',  availableServicesRouter);
server.use('/api/nearby', nearbyProvidersRouter);
server.use('/api/user_settings', userSettingsRouter);
server.use('/api/userserviceaddresses', addressesRouter);
server.use('/api/stripepayments', stripeRouter);





module.exports = server;