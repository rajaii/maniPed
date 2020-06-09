const router = require('express').Router();
const checkRole = require('../auth/checkRoleMiddleware.js');

const Users = require('./usersModel.js');
const restricted = require('../auth/restrictedMiddleware.js');

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;