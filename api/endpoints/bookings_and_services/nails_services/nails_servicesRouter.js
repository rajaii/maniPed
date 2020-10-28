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
    Nails.add(req.body)
    .then(service => {
        res.status(201).json(service)
    })
    .catch(err => {
      console.log(err)
        res.status(500).json(err)
    }) 
})





router.put('/:nails_service_id', validateNailsServiceId, (req, res) => {
  const { nails_service_id } = req.params;
  

console.log(req.body)
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

router.delete('/:nails_service_id', validateNailsServiceId, (req, res) => {
  const { nails_service_id } = req.params;
  Nails.remove(nails_service_id)
  .then(deleted => {
    res.status(204).json({deleted});
  })
  .catch(err => {
    console.log(err.message)
    res.status(500).json({message: 'error deleting from nails services', err})
  })
})



async function validateNailsServiceId(req, res, next) {
  try {
  const { nails_service_id } = req.params;
  let n = await Nails.findById(nails_service_id);
  
  if(n) {
      req.nails_service = n;
      next();
  } else {
      res.status(404).json({message: 'invalid nails service id'});
  }
} catch(error) {
  res.status(500).json(error);
}
};




module.exports = router;