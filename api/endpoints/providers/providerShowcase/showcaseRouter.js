const router = require('express').Router()
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

const Showcase = require('./showcaseHelpers.js');

router.get('/', (req, res) => {
    Showcase.find()
      .then(showcase => {
        res.status(200).json(showcase);
      })
      .catch(err => res.send(err));
  });
  
  router.get('/:id', validateShowcaseId, (req, res) => {
      res.status(200).json(req.showcase);
  })
 
  //see what the particular provider has been rated by users
  router.get('/provider/:provider_id', async (req, res) => {
    
      try {
          const { provider_id } = req.params;
      
          let pics = await Showcase.findByProviderId(provider_id)
          if(pics.length > 0) {
              res.status(200).json(pics)
          } else {
              res.status(404).json({message: 'invalid provider id'});
          }
      } catch(error) {
          res.status(500).json(error);
      }
  
  });
   
  
  router.put('/:id', validateShowcaseId, upload.array('photos', 9),  (req, res) => {
    const { id } = req.params;
      
    if (req.files.length < 1) {
      res.status(400).json({message: 'please provide at least one new image to update with...'});
    } else {
    Showcase.update(id, req.files)
      .then(files => {
        res.status(200).json({files});
      })
      .catch(err => {
        res.status(500).json(err)
      });
    }
  });
  
  router.post('/', upload.array('photos', 9), (req, res) => {
  
      if (req.files.length <= 0) {
        res.status(400).json({message: 'please provide a photo of yourself for your avatar (required) and photos of your work to display (optional) if you like...'});
      } else {
      req.files.map( f => {
        Showcase.add(f)
        .then(file => {
          res.status(201).json({file})
          
        })
        .catch(err => {
          res.status(500).json(err);
        });
      })} 
  });
  
  router.delete('/:id', validateShowcaseId, (req, res) => {
      const { id } = req.params;
  
      Showcase.remove(id)
      .then(deleted => {
          res.status(200).json({deleted});
      })
      .catch(err => {
          res.status(500).json(err);
      });
  
      
  });
  
  async function validateShowcaseId(req, res, next) {
      try {
      const { id } = req.params;
  
      let list = await Showcase.findById(id);
      if(list) {
          req.showcase = list;
          next();
      } else {
          res.status(404).json({message: 'invalid showcase id'});
      }
  } catch(error) {
      res.status(500).json(error);
  }
  };
  
  module.exports = router;
