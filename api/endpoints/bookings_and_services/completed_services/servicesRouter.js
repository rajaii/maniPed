const router = require('express').Router();

const Services = require('./servicesHelpers.js');


router.get('/', (req, res) => {
  Services.find()
    .then(bookings => {
      res.status(200).json(bookings);
    })
    .catch(err => res.send(err));
});

router.get('/:id', validateServiceId, (req, res) => {
    res.status(200).json(req.service);
})

router.get('/user/:user_id', async (req, res) => {
    
    try {
        const { user_id } = req.params;
    
        let user_services = await Services.findByUserId(user_id)
        if(user_services.length > 0) {
            res.status(200).json(user_services)   
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
    
        let provider_services = await Services.findByProviderId(provider_id)
        if(provider_services.length > 0) {
            res.status(200).json(provider_services)
        } else {
            res.status(404).json({message: 'invalid provider id'});
        }
    } catch(error) {
        res.status(500).json(error);
    }

});
 

router.put('/:id', validateServiceId, (req, res) => {
  const { id } = req.params;
    
  if (Object.keys(req.body).length < 1) {
    res.status(400).json({message: 'please provide a field to update the service'});
  } else {
  Services.update(id, req.body)
    .then(service => {
      res.status(200).json({service});
    })
    .catch(err => {
      res.status(500).json(err)
    });
  }
});

router.post('/', (req, res) => {
    const {type_of_service, amount_billed, booking_id, /*active booking then provider will close out on a screen that verifies service details and goes to rating screen after
        */ /*the following 2 ids will come from the users data, and the screen where
     you click on the provider to book*/  provider_id, user_id } = req.body;

    if (!type_of_service || !amount_billed || !booking_id || !provider_id || !user_id) {
      res.status(400).json({message: 'please provide all required fields to complete the service...'});
    } else {
    Services.add(req.body)
      .then(service => {
        res.status(201).json({service});
      })
      .catch(err => {
        res.status(500).json(err);
      });
    } 
});

router.delete('/:id', validateServiceId, (req, res) => {
    const { id } = req.params;

    Services.remove(id)
    .then(deleted => {
        res.status(200).json({deleted});
    })
    .catch(err => {
        res.status(500).json(err);
    });

    
});

async function validateServiceId(req, res, next) {
    try {
    const { id } = req.params;

    let service = await Services.findById(id);
    if(service) {
        req.service = service;
        next();
    } else {
        res.status(404).json({message: 'invalid service id'});
    }
} catch(error) {
    res.status(500).json(error);
}
};

module.exports = router;