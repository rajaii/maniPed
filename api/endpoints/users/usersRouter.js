const router = require('express').Router();

const Users = require('./usersHelpers.js');


router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.send(err));
});
 
//so admin can help users update info if they are assisting users that are having trouble.  For security purposes only the users can update PW, 
//and thus pw is omitted from this functionality.
router.put('/:id', (req, res) => {
  const { id } = req.params;

  if (Object.keys(req.body).length < 1) {
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