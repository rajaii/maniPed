const router = require('express').Router();

const User_ratings = require('./user_ratingsHelpers.js');
const Services = require('../../bookings_and_services/completed_services/servicesHelpers.js');





router.get('/', (req, res) => {
  User_ratings.find()
    .then(ratings => {
      res.status(200).json(ratings);
    })
    .catch(err => res.send(err));
});

router.get('/:id', validateRatingId, (req, res) => {
    res.status(200).json(req.ratings);
})
//see what user has rated providers
router.get('/user/:user_id', async (req, res) => {
    
    try {
        const { user_id } = req.params;
    
        let ratings = await User_ratings.findByUserId(user_id)
        if(ratings) {
            res.status(200).json(ratings)   
        } else {
            res.status(404).json({message: "error finding ratings"});
        }
    } catch(error) {
        res.status(500).json(error);
    }

});
//see what the particular provider has been rated by users
router.get('/provider/:provider_id', async (req, res) => {
  
    try {
        const { provider_id } = req.params;
    
        let ratings = await User_ratings.findByProviderId(provider_id)
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
  User_ratings.update(id, req.body)
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
        who served them and userid will come from the user we send the rating screen to */ provider_id, user_id, service_id} = req.body;

    if (!rating || !provider_id || !user_id || !service_id) {
      res.status(400).json({message: 'please provide a rating to rate your provider...'});
    } else {
      const body = { rating, provider_id, user_id }
    User_ratings.add(npmbody)
      .then(rating => {
        //The service_id will have to be pulled from FE on a get to service to populate the info for service being rated and passed into the req.body
        Services.update(service_id, {"user_rating_id": `${rating[0].id}`})
        .then(s => {
          console.log({message: 'success updating the service with user_rating_id', s})
        })
        .catch(e => {
          console.log({message: "errror updating the service with user_rating_id", e})
        })
        res.status(201).json({rating})
        
      })
      .catch(err => {
        console.log(err.message)
        res.status(500).json({message: 'failed to add rating', err});
      });
    } 
});

router.delete('/:id', validateRatingId, (req, res) => {
    const { id } = req.params;

    User_ratings.remove(id)
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

    let ratingList = await User_ratings.findById(id);
    if(ratingList) {
        req.ratings = ratingList;
        next();
    } else {
        res.status(404).json({message: 'invalid user_ratings id'});
    }
} catch(error) {
    res.status(500).json(error);
}
};

module.exports = router;