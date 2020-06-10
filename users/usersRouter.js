const router = require('express').Router();

const Users = require('./usersModel.js');


router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.send(err));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {firstName, lastName, username, email } = req.body;

  if (!firstName || !lastName || !username || !email) {
    res.status(400).json({message: 'please provide a field to update the user you are assisting in the database...'});
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



module.exports = router;