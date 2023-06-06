const router = require('express').Router();


const Massage = require('./massage_servicesHelpers.js');



router.get('/', (req, res) => {
  Massage.find()
    .then(service => {
      res.status(200).json(service);
    })
    .catch(err => res.send(err));
});
 
router.get('/:massage_service_id', validateMassageServiceId, (req, res) => {
  res.status(200).json(req.massage_service);
})

router.post('/', (req, res) => {
    Massage.add(req.body)
    .then(service => {
        res.status(201).json(service)
    })
    .catch(err => {
      console.log(err)
        res.status(500).json(err)
    }) 
})





router.put('/:massage_service_id', validateMassageServiceId, (req, res) => {
  const { massage_service_id } = req.params;
  


  if (Object.keys(req.body).length < 1) {
    res.status(400).json({message: 'please provide a field to update the massage service...'});
  } else {
  Massage.update(massage_service_id, req.body)
    .then(n => {
      res.status(200).json({n});
    })
    .catch(err => {
      console.log(err.message)
      res.status(500).json(err)
    });
  }
});

router.delete('/:massage_service_id', validateMassageServiceId, (req, res) => {
  const { massage_service_id } = req.params;
  Massage.remove(massage_service_id)
  .then(deleted => {
    res.status(204).json({deleted});
  })
  .catch(err => {
    console.log(err.message)
    res.status(500).json({message: 'error deleting from massage services', err})
  })
})



async function validateMassageServiceId(req, res, next) {
  try {
  const { massage_service_id } = req.params;
  
  let m = await Massage.findById(massage_service_id);
  
  if(m) {
      req.massage_service = m;
      next();
  } else {
      res.status(404).json({message: 'invalid massage service id'});
  }
} catch(error) {
    console.log(error)
  res.status(500).json(error);
}
};




module.exports = router;