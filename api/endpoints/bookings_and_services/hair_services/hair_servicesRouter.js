const router = require('express').Router();


const Hair = require('./hair_servicesHelpers.js');



router.get('/', (req, res) => {
  Hair.find()
    .then(service => {
      res.status(200).json(service);
    })
    .catch(err => res.send(err));
});
 
router.get('/:hair_service_id', validateHairServiceId, (req, res) => {
  res.status(200).json(req.hair_service);
})

router.post('/', (req, res) => {
    Hair.add(req.body)
    .then(service => {
        res.status(201).json(service)
    })
    .catch(err => {
      console.log(err)
        res.status(500).json(err)
    }) 
})





router.put('/:hair_service_id', validateHairServiceId, (req, res) => {
  const { hair_service_id } = req.params;
  

console.log(req.body)
  if (Object.keys(req.body).length < 1) {
    res.status(400).json({message: 'please provide a field to update the hair service...'});
  } else {
  Hair.update(hair_service_id, req.body)
    .then(n => {
      res.status(200).json({n});
    })
    .catch(err => {
      console.log(err.message)
      res.status(500).json(err)
    });
  }
});

router.delete('/:hair_service_id', validateHairServiceId, (req, res) => {
  const { hair_service_id } = req.params;
  Hair.remove(hair_service_id)
  .then(deleted => {
    res.status(204).json({deleted});
  })
  .catch(err => {
    console.log(err.message)
    res.status(500).json({message: 'error deleting from hair services', err})
  })
})



async function validateHairServiceId(req, res, next) {
  try {
  const { hair_service_id } = req.params;
  console.log(hair_service_id)
  let h = await Hair.findById(hair_service_id);
  
  if(h) {
      req.hair_service = h;
      next();
  } else {
      res.status(404).json({message: 'invalid hair service id'});
  }
} catch(error) {
    console.log(error)
  res.status(500).json(error);
}
};




module.exports = router;