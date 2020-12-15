const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
const anyid = require('anyid').anyid;

//make routes for login and register providers and users
const Users = require('../api/endpoints/users/usersHelpers.js');
const Providers = require('../api/endpoints/providers/providersHelpers.js');
const Admin = require('../api/endpoints/admin/adminHelpers.js');
const Manigods = require('../api/endpoints/admin/manigods/manigodsHelpers.js');
const Preadmin = require('../api/endpoints/admin/pre_admin/preAdminHelpers.js');
const UserSettings = require('../api/endpoints/users/settings/settingsHelpers.js');
const UserVerify = require('./userVerificationHelpers.js');
const ProviderVerify = require('./providerVerificationHelpers.js');

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'manipedcustomerservice@gmail.com',
    pass: process.env.GMAILPASS
  }
})

// register new customer users
router.post('/register', async (req, res) => {
  
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;
  const randomHash = anyid().encode('Aa0').length(128).random().id();

  try {
    const saved = await Users.add(user);
    console.log(saved)
    if (saved) {
      UserSettings.add({user_id: saved[0].id})
      
      .then(settings => {
        console.log('success adding settings to db:', settings)

        UserVerify.add({user_id: saved[0].id, hash: randomHash})
        .then(verification => {
          console.log('success adding hash to db for verification', verification)
        })
        .catch(err => {
          res.status(500).json({message: 'error adding hash to db for verification', err})
        })

       //make send out email to user's email to verify
          const link = `http://${req.get('host')}/api/auth/verifyuser/${saved[0].id}/${randomHash}`;
          username = saved[0].username;
          userEmail = saved[0].email;
          const userMailOptions = {
            from: 'manipedcustomerservice@gmail.com',
            to: `${saved[0].email}`,
            subject: 'Verify account',
            html: "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify.  Thank you for choosing maniPed for your cosmetic needs!</a>"
          }
          transporter.sendMail(userMailOptions, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(`Email sent, ${info.response}`)
            }
          })


      })
      .catch(err => {
        res.status(500).json({err, message: "error posting to the settings"})
      })
      res.status(201).json(saved);
      //handle this part possibly by line 31, or something else later.
    } else {
      res.status(409).json({message: 'profile tied to the entered username and/or email already exists.'});
    }

  } catch(err) {
    
  res.status(500).json({err, message: 'error entering the user in the db.'});
  }

});
//customer user login
router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(async user => {
      
      if (user.activated === false) {
        
        res.status(401).json({message: 'please verify your account through your email before logging in...'}) 
      }

      else {
        
      let doneSync = await bcrypt.compareSync(password, user.password)
      
      if (user && doneSync === true) {
        const token = generateToken(user)
        console.log(`token here: ${token}`)
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          id: user.id,
          jwt_token: token,
          name: `${user.first_name} ${user.last_name[0]}`
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error);
    });
});

//register providers
router.post('/register/providers', async (req, res) => {
  
  let provider = req.body;
  const hash = bcrypt.hashSync(provider.password, 10); 
  provider.password = hash;
  const randomHash = anyid().encode('Aa0').length(128).random().id();
  try {
    const saved = await Providers.add(provider);
    
    if (saved) {
      // UserSettings.add({user_id: saved[0].id})
      
      //Plug and play this boilerplate when provider settings get programmed in V:

      // .then(settings => {
      //   console.log('success adding settings to db:', settings)

        ProviderVerify.add({provider_id: saved[0].id, hash: randomHash})
        .then(verification => {
          console.log('success adding hash to db for verification', verification)
        })
        .catch(err => {
          res.status(500).json({message: 'error adding hash to db for verification', err})
        })

       //make send out email to user's email to verify
          const link = `http://${req.get('host')}/api/auth/verifyprovider/${saved[0].id}/${randomHash}`;
          username = saved[0].username;
          userEmail = saved[0].email;
          const userMailOptions = {
            from: 'manipedcustomerservice@gmail.com',
            to: `${saved[0].email}`,
            subject: 'Verify account',
            html: "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify.</a>"
          }
          transporter.sendMail(userMailOptions, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(`Email sent, ${info.response}`)
            }
          })

          //Uncomment this V when you provider settings get programmed in 
      // })
      // .catch(err => {
      //   res.status(500).json({err, message: "error posting to the settings"})
      // })
      res.status(201).json(saved);
      //handle this part possibly by line 31, or something else later.
    } else {
      res.status(409).json({message: 'profile tied to the entered provider username and/or email already exists.'});
    }

  } catch(err) {
    
  res.status(500).json({err, message: 'error entering the provider user in the db.'});
  }
})

 
  



//providers login
router.post('/login/providers', (req, res) => {
  let { username, password } = req.body;

  Providers.findBy({ username })
    .first()
    .then(provider => {
      if (provider && bcrypt.compareSync(password, provider.password)) {
        const token = generateToken(provider)

        res.status(200).json({
          id: provider.id,
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
  
  let admin = req.body;
  const hash = bcrypt.hashSync(admin.password, 10); // 2 ^ n
  admin.password = hash;
  let found = false;
//tdry other routes again to see if reg works.  see about return argument on insert and keep debugging using this and the precheck logic.  if return argument is issue will need to run it on other routes.  
  


  try {
  let preadmin = await Preadmin.find();
  if (preadmin) {
    for (let i = 0; i < preadmin.length; i++) {
      if (preadmin[i].first_name === req.body.first_name && preadmin[i].last_name === req.body.last_name && preadmin[i].role === req.body.role) {
        found = true;
        console.log('found!')
        break;
      }
    }
  } 
  
  } catch (err) {
    res.status(500).json(err);
  }
  
  

  if (found) {
    try {
      const saved = await Admin.add(admin);
      console.log(saved)
      if (saved) {
        res.status(201).json(saved);
      } else {
        res.status(409).json({err: 'profile tied to the entered username and/or email already exists.'});
      }
  
    } catch(err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json({message: 'admin entered does not match any employee in the employee list. talk to your supervisor...'})
  }

});


//admin login
router.post('/login/admin', (req, res) => {
  let { username, password } = req.body;

  Admin.findBy({ username })
    .first()
    .then(a => {
      if (a && bcrypt.compareSync(password, a.password)) {
        const token = generateAdminToken(a)

        res.status(200).json({
          message: `Welcome ${a.username}!`,
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
  let mani = req.body;
  const hash = bcrypt.hashSync(mani.password, 10); 
  mani.password = hash;

  try {
    const saved = await Manigods.add(mani);
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

  Manigods.findBy({ username })
    .first()
    .then(mani => {
      if (mani && bcrypt.compareSync(password, mani.password)) {
        const token = generateManigodToken(mani)

        res.status(200).json({
          message: `Welcome ${mani.username}!`,
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

router.post('/forgotusername', async (req, res) => {

          try {
          const { email } = req.body;
          const user = await Users.findBy({email})
          if (user.length > 0) {
          const userMailOptions = {
            from: 'manipedcustomerservice@gmail.com',
            to: `${email}`,
            subject: 'Your maniPed username',
            text: `Hello ${user[0].first_name}, your username is ${user[0].username}.  Thank you for choosing maniPed for your cosmetic needs!c`
          }
          transporter.sendMail(userMailOptions, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(`Email sent, ${info.response}`)
            }
          })
          res.status(200).json({message: 'username sent to user'})
        } else {
          res.status(404).json({message: "user with the specified email does not exist"})
        }
        } catch (error) {
          console.log(error)
          res.status(500).json({err, message: "error on the forgotusername route..."})
        }
})



router.get('/verifyuser/:userId/:verhash', (req, res) => {
  const { verhash, userId } = req.params;

  UserVerify.findBy({hash: verhash})
  .then(r => {
    console.log('userId:', userId, 'r[0].user_id:', r[0].user_id, 'verhash: ', verhash)
    if (r[0].user_id == userId) {
      //they are verified so activate their account
      const body = {activated: 1}
      Users.update(userId, body)
      .then(u => {
        console.log('account has been verified', u)
        res.end("Email has been Successfully verified");
      })
      .catch(err => {
        res.status(500).json({message: 'error activating user account', err})
      })
      
    } else {
      console.log('r: ',r)
      res.end("Bad Request");
    }
  })
  .catch(err => {
    res.status(500).json({message: 'error verifying user account with hash', err})
  })

  //delete the hash from the db so can continue to use the table to verify the user if need be for pw changes
  UserVerify.findBy({hash: verhash})
  .then(r => {
    console.log('success finding user second go for delete functionality')
    UserVerify.remove(r[0].id)
        .then(r => {
          console.log('success removing the users hash from user_verification');
        })
        .catch(err => {
          res.status(500).json({message: 'failed to delete the user hash from user_verification', err});
        })
  })
  .catch(err => {
    res.status(500).json({message: 'failed to find the user by hash in the delete functionality of the verify route', err})
  })
  
        
})

router.get('/verifyprovider/:userId/:verhash', (req, res) => {
  const { verhash, userId } = req.params;

  ProviderVerify.findBy({hash: verhash})
  .then(v => {
    
    if (v[0].provider_id == userId) {
      //they are verified so activate their account
      const body = {verified: 1}
      Providers.update(userId, body)
      .then(p => {
        console.log('account has been verified', p)
        res.end("Email has been Successfully verified");
      })
      .catch(err => {
        res.status(500).json({message: 'error activating provider user account', err})
      })
      
    } else {
      
      res.end("Bad Request");
    }
  })
  //!!!!!!!!!!!!!!!!!!BREAK
  .catch(err => {
    res.status(500).json({message: 'error verifying provider user account with hash', err})
  })

  //delete the hash from the db so can continue to use the table to verify the user if need be for pw changes
  ProviderVerify.findBy({hash: verhash})
  .then(v => {
    console.log('success finding provider user second go for delete functionality')
    UserVerify.remove(v[0].id)
        .then(r => {
          console.log('success removing the provide user\'s hash from user_verification');
        })
        .catch(err => {
          res.status(500).json({message: 'failed to delete the provider user\'s hash from provider_verification', err});
        })
  })
  .catch(err => {
    res.status(500).json({message: 'failed to find the provider user by hash in the delete functionality of the verify route', err})
  })
})

router.get('/resetuserpasswordverify/:userId/:verhash', (req, res) => {
  const { verhash, userId } = req.params;
  UserVerify.findBy({hash: verhash})
  .then(r => {
    if (r[0].user_id == userId) {
      //redirect to a component that will run a put on user profile to change pw
      UserVerify.remove(r[0].id)
        .then(r => {
          console.log('success removing the users hash from user_verification');
        })
        .catch(err => {
          res.status(500).json({message: 'failed to delete the user hash from user_verification', err});
        })
      let token;
      Users.findById(userId)
      .then(u => {
        token = generateToken(u)
        res.redirect(`http://localhost:3000/resetpassword/?manid=${userId.toString()}&t=${token}`)
      })
      .catch(err => {
        res.status(500).json({message: 'error generating token for temp put on reset ps', err})
      })
    
    } else {
      res.status(401).json({message: 'the user was not able to be verified for this process, please re-try...'})
    }
  })
  .catch(err => {
    res.status(500).json({message: 'error verifying the user to change passwords...', err})
  })

})

router.post('/forgotuserPassword', async (req, res) => {
  try {
  const { email } = req.body;
  let user = await Users.findBy({email})
  if(user.length > 0) {
    const randomHash = anyid().encode('Aa0').length(128).random().id();
    UserVerify.add({user_id: user[0].id, hash: randomHash})
    .then(verification => {
      console.log('success adding hash to db for resetting pw.', verification)
    })
    .catch(err => {
      res.status(500).json({message: 'error adding hash to db for resetting pw.', err})
    })

    const link = `http://${req.get('host')}/api/auth/resetuserpasswordverify/${user[0].id}/${randomHash}`;
    username = user[0].username;
    userEmail = user[0].email;
    const userMailOptions = {
      from: 'manipedcustomerservice@gmail.com',
      to: `${user[0].email}`,
      subject: 'Reset account pw',
      html: "Hello,<br> Please Click on the link to reset your password.<br><a href="+link+">Click here to reset your password.  Thank you for choosing maniPed for your cosmetic needs!</a>"
    }
    transporter.sendMail(userMailOptions, function(err, info) {
      if (err) {
        console.log(err)
      } else {
        console.log(`Email sent, ${info.response}`)
      }
    })

    res.status(200).json({message: 'email sent with link to reset password'})
    
  } else {
    res.status(404).json({message: "user with the specified email does not exist"})
  }
} catch(err) {
  res.status(500).json({err});
}
})

router.post('/resendverification', async (req, res) => {
    try {

    const { email } = req.body;
    let user = await Users.findBy({email});
    if (user) {
        
        //delete the previous hash associated with the user from the lost link in user_verify
        UserVerify.findBy({user_id: user[0].id})
        .then(u => {
          
        UserVerify.remove(u[0].id)
        .then(r => {
          console.log('success removing the users hash from user_verification');
        })
        .catch(err => {
          res.status(500).json({message: 'failed to delete the user hash from user_verification', err});
        })
        })
        .catch(err => {
          res.status(500).json({message: 'error finding the user to remove hash before adding new hash for resending verification email...', err})
        })
        
        //add new hash to user_verify route
        const randomHash = anyid().encode('Aa0').length(128).random().id();
        UserVerify.add({user_id: user[0].id, hash: randomHash})
        .then(verification => {
          console.log('success adding hash to db for verification', verification)
        })
        .catch(err => {
          res.status(500).json({message: 'error adding hash to db for verification', err})
        })

        //send link with the hash to their email
       
        const link = `http://${req.get('host')}/api/auth/verifyuser/${user[0].id}/${randomHash}`;
        username = user[0].username;
        userEmail = user[0].email;
        const userMailOptions = {
          from: 'manipedcustomerservice@gmail.com',
          to: `${user[0].email}`,
          subject: 'Verify account',
          html: "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify.  Thank you for choosing maniPed for your cosmetic needs!</a>"
        }
        transporter.sendMail(userMailOptions, function(err, info) {
          if (err) {
            console.log(err)
          } else {
            console.log(`Email sent, ${info.response}`)
          }
        })
        res.status(200).json({Message: "success resending verification"});
    } else {
      res.status(401).json({message: "User with the specified email does not exists."})
    }

    } catch (err) {
      res.status(500).json({message: 'error in the process of finding user to resend verification email...', err})
    }

})


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


