const router = require('express').Router();
const bcrypt = require('bcryptjs');
const request = require('request');
const rp = require('request-promise')

const Providers = require('./providersHelpers.js');


router.get('/', (req, res) => {
  Providers.find()
    .then(provider => {
      res.status(200).json(provider);
    })
    .catch(err => res.send(err));
});
 
router.get('/:id', validateProviderId, (req, res) => {
  res.status(200).json(req.provider);
})

//so users can search for a provider who is within x miles of their location for service
//add /:id
router.get('/nearby', (req, res) => {
  console.log('going in')
  const { zipCode, distance } = req.body;
  
  let closeZips = {};

          const options = {
            uri: `https://www.zipcodeapi.com/rest/${process.env.ZIPCODEKEY}/radius.json/${zipCode}/${distance}/miles`,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
          };
          rp.get(options)
          .then(res => {
            res["zip_codes"].map(z => {
            closeZips[z.zip_code] = z.city;
            })
            console.log(`closeZips: ${JSON.stringify(closeZips)}`)
          })
          .catch(err => {
            console.log(err)
          })
          const localProviders = []

          Providers.find()
          .then(providers => {
            providers.forEach(p => {
              if (closeZips[p.zipcode] != undefined || p.zipcode === zipCode) {
                localProviders.push(p)
              } 
            })
            res.status(200).json(localProviders);
          })
          .catch(err => {
            console.log(`message: ${err.message}`)
            res.status(500).json(err)
          })       
  });
  

router.put('/:id', (req, res) => {
  const { id } = req.params;

  if (req.body.password) {
    const hash = bcrypt.hashSync(req.body.password, 10); 
    req.body.password = hash;
    }

  if (Object.keys(req.body).length < 1) {
    res.status(400).json({message: 'please provide a field to update the provider...'});
  } else {
  Providers.update(id, req.body)
    .then(providers => {
      res.status(200).json({providers});
    })
    .catch(err => {
      res.status(500).json(err)
    });
  }
});

async function validateProviderId(req, res, next) {
  try {
  const { id } = req.params;

  let p = await Providers.findById(id);
  if(p) {
      req.provider = p;
      next();
  } else {
      res.status(404).json({message: 'invalid provider id'});
  }
} catch(error) {
  res.status(500).json(error);
}
};




module.exports = router;