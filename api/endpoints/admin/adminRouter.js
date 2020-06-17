const router = require('express').Router();

const Admin = require('./adminHelpers.js');
const checkRoles = require('../../../auth/checkRoleMiddleware.js');


router.get('/', checkRoles('ADMIN' || 'MANIGOD'), (req, res) => {
  Admin.find()
    .then(admin => {
      res.status(200).json(admin);
    })
    .catch(err => res.send(err));
});
 

router.put('/:id', checkRoles('ADMIN' || 'MANIGOD'), (req, res) => {
  const { id } = req.params;
  const {first_name, last_name, username, role, email, zipcode } = req.body;

  if (!first_name || !last_name || username || !role || !email || !zipcode ) {
    res.status(400).json({message: 'please provide a field to update the admin profile...'});
  } else {
  Admin.update(id, req.body)
    .then(admin => {
      res.status(200).json({admin});
    })
    .catch(err => {
      res.status(500).json(err)
    });
  }
});



module.exports = router;