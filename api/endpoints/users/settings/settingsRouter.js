const router = require('express').Router();


const UserSettings = require('./settingsHelpers.js');



router.get('/', (req, res) => {
  UserSettings.find()
    .then(provider => {
      res.status(200).json(provider);
    })
    .catch(err => res.send(err));
});
 
router.get('/:user_id', validateUserId, (req, res) => {
  res.status(200).json(req.settings);
})

router.post('/', (req, res) => {
    UserSettings.add(req.body)
    .then(service => {
        res.status(201).json(service)
    })
    .catch(err => {
        res.status(500).json(err)
    }) 
})



router.put('/:user_id', validateUserId, (req, res) => {
  const { user_id } = req.params;
  


  if (Object.keys(req.body).length < 1) {
    res.status(400).json({message: 'please provide a field to update the settings...'});
  } else {
  UserSettings.update(user_id, req.body)
    .then(settings => {
      res.status(200).json({settings});
    })
    .catch(err => {
      console.log(err.message)
      res.status(500).json(err)
    });
  }
});

async function validateUserId(req, res, next) {
  try {
  const { user_id } = req.params;
  console.log(user_id)
  let s = await UserSettings.findByUserId(user_id);
  
  if(s) {
      req.settings = s;
      next();
  } else {
      res.status(404).json({message: 'invalid user id'});
  }
} catch(error) {
  console.log(error.message)
  res.status(500).json(error);
}
};




module.exports = router;