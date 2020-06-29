const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Manigods = require('./manigodsHelpers.js');
const checkRoles = require('../../../../auth/checkRoleMiddleware.js');


router.get('/', checkRoles('MANIGOD'), (req, res) => {
  Manigods.find()
    .then(manigod => {
      res.status(200).json(manigod);
    })
    .catch(err => res.send(err));
});
 

router.put('/:id', checkRoles('MANIGOD'), (req, res) => {
  const { id } = req.params;

  if (req.body.password) {
  const hash = bcrypt.hashSync(req.body.password, 10); 
  req.body.password = hash;
  }
  
  if (Object.keys(req.body).length < 1) {
    res.status(400).json({message: 'please provide a field to update the manigod profile...'});
  } else {
    
  Manigods.update(id, req.body)
    .then(manigod => {
      res.status(200).json({manigod});
    })
    .catch(err => {
      res.status(500).json(err)
    });
  }
});



module.exports = router;