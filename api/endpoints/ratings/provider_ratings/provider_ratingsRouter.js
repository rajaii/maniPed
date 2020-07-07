const router = require('express').Router();

const Provider_ratings = require('./provider_ratingsHelpers.js');
const Services = require('../../bookings_and_services/completed_services/servicesHelpers.js');


router.get('/', (req, res) => {
  Provider_ratings.find()
    .then(ratings => {
      res.status(200).json(ratings);
    })
    .catch(err => res.send(err));
});

router.get('/:id', validateRatingId, (req, res) => {
    res.status(200).json(req.ratings);
})
//see what the user has been rated by providers
router.get('/user/:user_id', async (req, res) => {
    
    try {
        const { user_id } = req.params;
    
        let ratings = await Provider_ratings.findByUserId(user_id)
        if(ratings.length > 0) {
            res.status(200).json(ratings)   
        } else {
            res.status(404).json({message: 'invalid user id'});
        }
    } catch(error) {
        res.status(500).json(error);
    }

});
//see what the provider has rated users
router.get('/provider/:provider_id', async (req, res) => {
  
    try {
        const { provider_id } = req.params;
    
        let ratings = await Provider_ratings.findByProviderId(provider_id)
        if(ratings.length > 0) {
            res.status(200).json(ratings)
        } else {
            res.status(404).json({message: 'invalid provider id'});
        }
    } catch(error) {
        res.status(500).json(error);
    }

});
 

router.put('/:id', validateRatingId, (req, res) => {
  const { id } = req.params;
    
  if (Object.keys(req.body).length < 1) {
    res.status(400).json({message: 'please provide a field to update the rating'});
  } else {
  Provider_ratings.update(id, req.body)
    .then(rating => {
      res.status(200).json({rating});
    })
    .catch(err => {
      res.status(500).json(err)
    });
  }
});

router.post('/', (req, res) => {
    const {rating, /*all but rating will be prepopulated by app service tied to the service/booking they are rating for provider will be the one 
        who is rating them and userid will come from the user they serviceed */ provider_id, user_id, service_id} = req.body;
    if (!rating || !provider_id || !user_id || service_id) {
      res.status(400).json({message: 'please provide a rating to rate your client...'});
    } else {
    Provider_ratings.add(req.body)
    .then(rating => {
      //The service_id will have to be pulled from FE on a get to service to populate the info for service being rated and passed into the req.body
      Services.update(service_id, {"provider_rating_id": `${rating[0].id}`})
      .then(s => {
        res.status(200);
      })
      .catch(e => {
        console.log(`inner: ${e.message}`)
        res.status(500).json(err)
      })
      res.status(201).json({rating})
      
    })
      .catch(err => {
        console.log(`Outer: ${err.message}`)
        res.status(500).json(err);
      });
    } 
});

router.delete('/:id', validateRatingId, (req, res) => {
    const { id } = req.params;

    Provider_ratings.remove(id)
    .then(deleted => {
        res.status(200).json({deleted});
    })
    .catch(err => {
        res.status(500).json(err);
    });

    
});

async function validateRatingId(req, res, next) {
    try {
    const { id } = req.params;

    let ratingList = await Provider_ratings.findById(id);
    if(ratingList) {
        req.ratings = ratingList;
        next();
    } else {
        res.status(404).json({message: 'invalid provider_ratings id'});
    }
} catch(error) {
    res.status(500).json(error);
}
};

module.exports = router;