const router = require('express').Router();


const Addresses = require('./addressesHelpers.js');



router.get('/', (req, res) => {
  Addresses.find()
    .then(address => {
      res.status(200).json(address);
    })
    .catch(err => res.send(err));
});
 
router.get('/:id', validaeAddressesId, (req, res) => {
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



router.put('/:id', validateAddressesId, (req, res) => {
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




module.exports = router;