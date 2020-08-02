const router = require('express').Router();
const bcrypt = require('bcryptjs');
const rp = require('request-promise')

const Providers = require('./providersHelpers.js');


router.get('/', (req, res) => {
  Providers.find()
    .then(provider => {
      res.status(200).json(provider);
    })
    .catch(err => res.send(err));
});
 
router.get('/:id', validateProviderId, (req, res) => {
  res.status(200).json(req.provider);
})



router.put('/:id', validateProviderId, (req, res) => {
  const { id } = req.params;

  if (req.body.password) {
    const hash = bcrypt.hashSync(req.body.password, 10); 
    req.body.password = hash;
    }

  if (Object.keys(req.body).length < 1) {
    res.status(400).json({message: 'please provide a field to update the provider...'});
  } else {
  Providers.update(id, req.body)
    .then(providers => {
      res.status(200).json({providers});
    })
    .catch(err => {
      res.status(500).json(err)
    });
  }
});

async function validateProviderId(req, res, next) {
  try {
  const { id } = req.params;

  let p = await Providers.findById(id);
  if(p) {
      req.provider = p;
      next();
  } else {
      res.status(404).json({message: 'invalid provider id'});
  }
} catch(error) {
  res.status(500).json(error);
}
};




module.exports = router;