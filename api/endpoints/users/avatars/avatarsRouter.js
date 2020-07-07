const router = require('express').Router()
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

const Avatars = require('./avatarsHelpers.js');

router.get('/', (req, res) => {
    Avatars.find()
      .then(avatar => {
        res.status(200).json(avatar);
      })
      .catch(err => res.send(err));
  });
  
  router.get('/:id', validateAvatarId, (req, res) => {
      res.status(200).json(req.avatar);
  })
  //see what user has rated providers
  router.get('/user/:user_id', async (req, res) => {
      
      try {
          const { user_id } = req.params;
      
          let avatar = await Avatars.findByUserId(user_id)
          if(avatar.length > 0) {
              res.status(200).json(avatar)   
          } else {
              res.status(404).json({message: 'invalid user id'});
          }
      } catch(error) {
          res.status(500).json(error);
      }
  
  });
   
  
  router.put('/:id', validateAvatarId, (req, res) => {
    const { id } = req.params;
      
    if (Object.keys(req.file).length < 1) {
      res.status(400).json({message: 'please provide an image to update'});
    } else {
    Avatars.update(id, req.file)
      .then(avatar => {
        res.status(200).json({avatar});
      })
      .catch(err => {
        res.status(500).json(err)
      });
    }
  });
  
  router.post('/', upload.single('avatar'), (req, res) => {

      if (!req.file) {
        res.status(400).json({message: 'please provide an image in order to proceed...'});
      } else {
      Avatars.add(req.file)
        .then(pic => {
          res.status(201).json({pic})  
        })
        .catch(err => {
          res.status(500).json(err);
        });
      } 
  });
  
  router.delete('/:id', validateAvatarId, (req, res) => {
      const { id } = req.params;
  
      Avatars.remove(id)
      .then(deleted => {
          res.status(200).json({deleted});
      })
      .catch(err => {
          res.status(500).json(err);
      });
  
      
  });
  
  async function validateAvatarId(req, res, next) {
      try {
      const { id } = req.params;
  
      let avatar = await Avatars.findById(id);
      if(avatar) {
          req.avatar = avatar;
          next();
      } else {
          res.status(404).json({message: 'invalid avatar id'});
      }
  } catch(error) {
      res.status(500).json(error);
  }
  };
  
  module.exports = router;