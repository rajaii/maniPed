const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const Users = require('../users/usersModel.js');

// for endpoints beginning with /api/auth
router.post('/register', async (req, res) => {
  
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  try {
    const saved = await Users.add(user);
    if (saved) {
      res.status(201).json(saved);
    } else {
      res.status(409).json({err: 'profile tied to the entered username and/or email already exists.'});
    }

  } catch(err) {
    res.status(500).json(error);
  }

});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          jwt_token: token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['ADMIN', 'CUSTOMERUSER', 'PROVIDERUSER']
    //other data
  };
  const secret = process.env.JWTSECRET || "manipedisthafuta1234356346+_:>{>:";
  const options = {
    expiresIn: '30 min'
  };
  return jwt.sign(payload, secret, options)
}

module.exports = router;
