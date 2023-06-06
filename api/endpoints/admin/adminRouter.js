const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Admin = require('./adminHelpers.js');
const checkRoles = require('../../../auth/checkDoubleRoleMiddleware.js');


router.get('/', checkRoles('MANIGOD', 'ADMIN'), (req, res) => {
  Admin.find()
    .then(admin => {
      res.status(200).json(admin);
    })
    .catch(err => res.send(err));
});
 

router.put('/:id', validateAdminId, checkRoles('MANIGOD', 'ADMIN'), (req, res) => {
  const { id } = req.params;

  if (req.body.password) {
  const hash = bcrypt.hashSync(req.body.password, 10); 
  req.body.password = hash;
  }
  
  if (Object.keys(req.body).length < 1) {
    res.status(400).json({message: 'please provide a field to update the admin profile...'});
  } else {
  Admin.update(id, req.body)
    .then(admin => {
      res.status(200).json({admin});
    })
    .catch(err => {
      console.log(err.message)
      res.status(500).json(err)
    });
  }
});

async function validateAdminId(req, res, next) {
  try {
  const { id } = req.params;

  let a = await Admin.findById(id);
  if(a) {
      req.admin = a;
      next();
  } else {
      res.status(404).json({message: 'invalid admin id'});
  }
} catch(error) {
  res.status(500).json(error);
}
};



module.exports = router;