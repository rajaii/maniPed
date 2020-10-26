const router = require('express').Router();


const Nails = require('./nails_servicesHelpers.js');



router.get('/', (req, res) => {
  Nails.find()
    .then(provider => {
      res.status(200).json(provider);
    })
    .catch(err => res.send(err));
});
 
router.get('/:nails_service_id', validateNailsServiceId, (req, res) => {
  res.status(200).json(req.nails_service);
})

router.post('/', (req, res) => {
    UserSettings.add(req.body)
    .then(service => {
        res.status(201).json(service)
    })
    .catch(err => {
        res.status(500).json(err)
    }) 
})

router.post('/', (req, res) => {
    Nails.add(req.body)
    .then(n => {
        res.status(200).json({message: "nails_service added to db", n});
    })
    .catch(err => {
        res.status(500).json({message: 'failure to add nails service to the db', err});
    })
})



router.put('/:nails_service_id', validateNailsServiceId, (req, res) => {
  const { nails_service_id } = req.params;
  


  if (Object.keys(req.body).length < 1) {
    res.status(400).json({message: 'please provide a field to update the nails service...'});
  } else {
  Nails.update(nails_service_id, req.body)
    .then(n => {
      res.status(200).json({n});
    })
    .catch(err => {
      console.log(err.message)
      res.status(500).json(err)
    });
  }
});



async function validateNailsServiceId(req, res, next) {
  try {
  const { nails_service_id } = req.params;
  console.log(nails_service_id)
  let n = await Nails.findByUserId(nails_service_id);
  
  if(n) {
      req.nails_service = n;
      next();
  } else {
      res.status(404).json({message: 'invalid nails service id'});
  }
} catch(error) {
  console.log(error.message)
  res.status(500).json(error);
}
};




module.exports = router;