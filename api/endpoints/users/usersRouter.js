const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./usersHelpers.js');


router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.send(err));
});
 
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.custy);
})

router.put('/:id', validateUserId, (req, res) => {
  const { id } = req.params;

  if (req.body.password) {
    const hash = bcrypt.hashSync(req.body.password, 10); 
    req.body.password = hash;
    }

  if (Object.keys(req.body).length < 1) {
    res.status(400).json({message: 'please provide a field to update the user...'});
  } else {
  Users.update(id, req.body)
    .then(users => {
      res.status(200).json({users});
    })
    .catch(err => {
      res.status(500).json(err)
    });
  }
});

async function validateUserId(req, res, next) {
  try {
  const { id } = req.params;
  let u = await Users.findById(id);
  if(u) {
      req.custy = u;
      next();
  } else {
      res.status(404).json({message: 'invalid user id'});
  }
} catch(error) {
  res.status(500).json(error);
}
};


module.exports = router;