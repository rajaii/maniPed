const router = require('express').Router();


const UserSettings = require('./settingsHelpers.js');



router.get('/', (req, res) => {
  UserSettings.find()
    .then(provider => {
      res.status(200).json(provider);
    })
    .catch(err => res.send(err));
});
 
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.settings);
})

router.post('/', (req, res) => {
    Services.add(req.body)
    .then(service => {
        res.status(201).json(service)
    })
    .catch(err => {
        res.status(500).json(err)
    }) 
})



router.put('/:id', validateUserId, (req, res) => {
  const { user_id } = req.params;


  if (Object.keys(req.body).length < 1) {
    res.status(400).json({message: 'please provide a field to update the settings...'});
  } else {
  Settings.update(user_id, req.body)
    .then(settings => {
      res.status(200).json({settings});
    })
    .catch(err => {
      res.status(500).json(err)
    });
  }
});

async function validateUserId(req, res, next) {
  try {
  const { userId } = req.params;

  let s = await Settings.findByUserId(userId);
  if(s) {
      req.settings = s;
      next();
  } else {
      res.status(404).json({message: 'invalid user id'});
  }
} catch(error) {
  res.status(500).json(error);
}
};




module.exports = router;