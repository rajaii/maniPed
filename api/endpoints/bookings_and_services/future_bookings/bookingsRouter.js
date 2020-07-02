const router = require('express').Router();

const Bookings = require('./bookingsHelpers.js');


router.get('/', (req, res) => {
  Bookings.find()
    .then(bookings => {
      res.status(200).json(bookings);
    })
    .catch(err => res.send(err));
});

router.get('/:id', validateBookingId, (req, res) => {
    res.status(200).json(req.booking);
})

router.get('/user/:user_id', async (req, res) => {
    
    try {
        const { user_id } = req.params;
    
        let user_bookings = await Bookings.findByUserId(user_id)
        if(user_bookings.length > 0) {
            res.status(200).json(user_bookings)
            
        } else {
            res.status(404).json({message: 'invalid user id'});
        }
    } catch(error) {
        res.status(500).json(error);
    }

});

router.get('/provider/:provider_id', async (req, res) => {
  
    try {
        const { provider_id } = req.params;
    
        let provider_bookings = await Bookings.findByProviderId(provider_id)
        if(provider_bookings.length > 0) {
            res.status(200).json(provider_bookings)
        } else {
            res.status(404).json({message: 'invalid provider id'});
        }
    } catch(error) {
        res.status(500).json(error);
    }

});

 

router.put('/:id', validateBookingId, (req, res) => {
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

router.delete('/:id', validateBookingId, (req, res) => {
    const { id } = req.params;

    Bookings.remove(id)
    .then(deleted => {
        res.status(200).json({deleted});
    })
    .catch(err => {
        res.status(500).json(err);
    });

    
});

async function validateBookingId(req, res, next) {
    try {
    const { id } = req.params;

    let booking = await Bookings.findById(id);
    if(booking) {
        req.booking = booking;
        next();
    } else {
        res.status(404).json({message: 'invalid booking id'});
    }
} catch(error) {
    res.status(500).json(error);
}
};



module.exports = router;