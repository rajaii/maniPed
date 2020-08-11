const router = require('express').Router();


const Addresses = require('./addressesHelpers.js');



router.get('/', (req, res) => {
  Addresses.find()
    .then(address => {
      res.status(200).json(address);
    })
    .catch(err => res.send(err));
});
 
router.get('/:user_id', validateUserId, (req, res) => {
  res.status(200).json(req.addresses);
})

router.post('/', (req, res) => {
    Addresses.add(req.body)
    .then(address => {
        res.status(201).json(address)
    })
    .catch(err => {
        res.status(500).json(err)
    }) 
})



router.put('/:user_id', validateUserId, (req, res) => {
  const { id } = req.params;


  if (Object.keys(req.body).length < 1) {
    res.status(400).json({message: 'please provide a field to update the address...'});
  } else {
  Addresses.update(id, req.body)
    .then(address => {
      res.status(200).json({address});
    })
    .catch(err => {
      res.status(500).json(err)
    });
  }
});

router.delete('/:id', (req, res) => {
  //finish here
})

async function validateAddressesId(req, res, next) {
  try {
  const { id } = req.params;

  let a = await Addresses.findById(id);
  if(a) {
      req.addresses = a;
      next();
  } else {
      res.status(404).json({message: 'invalid addresses id'});
  }
} catch(error) {
  res.status(500).json(error);
}
};

async function validateUserId(req, res, next) {
  try {
  const { user_id } = req.params;

  let a = await Addresses.findById(user_id);
  if(a) {
      req.addresses = a;
      next();
  } else {
      res.status(404).json({message: 'invalid user id'});
  }
} catch(error) {
  res.status(500).json(error);
}
};




module.exports = router;