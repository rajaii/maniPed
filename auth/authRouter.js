const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

//make routes for login and register providers and users
const Users = require('../api/endpoints/users/usersHelpers.js');
const Providers = require('../api/endpoints/providers/providersHelpers.js');


// register new customer users
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
//customer user login
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

//register providers
router.post('/register/providers', async (req, res) => {
  
  let provider = req.body;
  const hash = bcrypt.hashSync(provider.password, 10); // 2 ^ n
  provider.password = hash;

  try {
    const saved = await Providers.add(provider);
    if (saved) {
      res.status(201).json(saved);
    } else {
      res.status(409).json({err: 'profile tied to the entered username and/or email already exists.'});
    }

  } catch(err) {
    res.status(500).json(error);
  }

});


//providers login
router.post('/login/providers', (req, res) => {
  let { username, password } = req.body;

  Providers.findBy({ username })
    .first()
    .then(provider => {
      if (provider && bcrypt.compareSync(password, provider.password)) {
        const token = generateToken(provider)

        res.status(200).json({
          message: `Welcome ${provider.username}!`,
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

//register admin
router.post('/register/admin', async (req, res) => {
  //will need to have a admin table that has every admins name in a separate table
  //will need to check if req.body.firstName and req.body.lastName is in the admin table before allowing this reg
  //may also need to make another route with super-special mgmt permissions using the same flow

  //set up a table pre-admin, just first name and last name, and only me and joseph (for now) can add to it (another '/login/manigods' route for higher ups, check role manigod). 
  //the list will be pre-populated after hire by higher mgmt with manigod access, and then they can successfully go through this V route to reg
  //run a db command to see if the name of the potential admin is on the pre-admin list.  if so, allow them to register an admin profile 
  
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


//admin login
router.post('/login/admin', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateAdminToken(user)

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

//register manigods
router.post('/register/manigods', async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); 
  user.password = hash;

  try {
    const saved = await Users.add(user);
    if (saved) {
      res.status(201).json(saved);
    } else {
      res.status(409).json({err: 'profile tied to the entered manigod name and/or email already exists.'});
    }

  } catch(err) {
    res.status(500).json(error);
  }

});

//manigod login
router.post('/login/manigods', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateManigodToken(user)

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
  };
  const secret = process.env.JWTSECRET || "manipedisthafuta1234356346+_:>{>:";
  const options = {
    expiresIn: '30 min'
  };
  return jwt.sign(payload, secret, options)
}

function generateAdminToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['ADMIN'] 
  };
  const secret = process.env.JWTSECRET || "manipedisthafuta1234356346+_:>{>:";
  const options = {
    expiresIn: '30 min'
  };
  return jwt.sign(payload, secret, options)
}

function generateManigodToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: ['MANIGOD'] 
  };
  const secret = process.env.JWTSECRET || "manipedisthafuta1234356346+_:>{>:";
  const options = {
    expiresIn: '30 min'
  };
  return jwt.sign(payload, secret, options)
}

module.exports = router;
