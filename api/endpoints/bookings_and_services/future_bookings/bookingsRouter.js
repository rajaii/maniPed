const router = require('express').Router();

const Bookings = require('./bookingsHelpers.js');


router.get('/', (req, res) => {
  Bookings.find()
    .then(bookings => {
      res.status(200).json(bookings);
    })
    .catch(err => res.send(err));
});

router.get('/user/:user_id', (req, res) => {
    const { user_id } = req.params;

    Bookings.findByUserId(user_id)
    .then(users_bookings => {
        res.status(200).json(users_bookings);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.get('/provider/:provider_id', (req, res) => {
    const { provider_id } = req.params;

    Bookings.findByProviderId(provider_id)
    .then(providers_bookings => {
        res.status(200).json(providers_bookings);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});
 

router.put('/:id', (req, res) => {
  const { id } = req.params;
    
  if (Object.keys(req.body).length < 1) {
    res.status(400).json({message: 'please provide a field to update the booking'});
  } else {
  Bookings.update(id, req.body)
    .then(booking => {
      res.status(200).json({booking});
    })
    .catch(err => {
      res.status(500).json(err)
    });
  }
});

router.post('/', (req, res) => {
    const {booking_date, booking_time, services_and_pricing, /*the following 2 ids will come from the users data, and the screen where
     you click on the provider to book*/ provider_id, user_id } = req.body;

    if (!provider_id || !user_id || !booking_date || !booking_time|| !services_and_pricing) {
      res.status(400).json({message: 'please provide all required fields to request a booking...'});
    } else {
    Bookings.add(req.body)
      .then(booking => {
        res.status(201).json({booking});
      })
      .catch(err => {
        res.status(500).json(err);
      });
    } 
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Bookings.remove(id)
    .then(deleted => {
        res.status(200).json({deleted});
    })
    .catch(err => {
        res.status(500).json(err);
    });
});


module.exports = router;