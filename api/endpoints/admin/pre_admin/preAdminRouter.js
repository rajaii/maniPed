const router = require('express').Router();

const Preadmin = require('./preAdminHelpers.js');
const checkRoles = require('../../../../auth/checkRoleMiddleware.js');


router.get('/', checkRoles('MANIGOD'), (req, res) => {
  Preadmin.find()
    .then(preadmin => {
      res.status(200).json(preadmin);
    })
    .catch(err => res.send(err));
});
 

router.put('/:id', checkRoles('MANIGOD'), (req, res) => {
  const { id } = req.params;
    
  if (Object.keys(req.body).length < 1) {
    res.status(400).json({message: 'please provide a field to update the preadmin profile...'});
  } else {
  Preadmin.update(id, req.body)
    .then(preadmin => {
      res.status(200).json({preadmin});
    })
    .catch(err => {
      res.status(500).json(err)
    });
  }
});

router.post('/', /*checkRoles('MANIGOD'),*/ (req, res) => {
    const {first_name, last_name, role } = req.body;

    if (!first_name || !last_name || !role ) {
      res.status(400).json({message: 'please provide all fields to add a preadmin profile...'});
    } else {
    Preadmin.add(req.body)
      .then(preadmin => {
        res.status(201).json({preadmin});
      })
      .catch(err => {
        res.status(500).json(err)
      });
    } 
})


module.exports = router;