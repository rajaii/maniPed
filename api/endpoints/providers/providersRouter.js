const router = require('express').Router();

const Providers = require('./providersHelpers.js');


router.get('/', (req, res) => {
  Providers.find()
    .then(provider => {
      res.status(200).json(provider);
    })
    .catch(err => res.send(err));
});
 
//so admin can help providers update info if they are assisting users that are having trouble.  For security purposes only the providers can update PW, 
//and thus pw is omitted from this functionality.
router.put('/:id', (req, res) => {
  const { id } = req.params;

  if (Object.keys(req.body).length < 1) {
    res.status(400).json({message: 'please provide a field to update the provider you are assisting in the database...'});
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



module.exports = router;