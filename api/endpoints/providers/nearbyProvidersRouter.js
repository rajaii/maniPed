require('dotenv').config();
const router = require('express').Router();
const rp = require('request-promise');

const Providers = require('./providersHelpers.js');

//so users can search for providers who are within x miles of their location for service



router.post('/', (req, res) => {
    const { zipCode, distance } = req.body;
    
    const closeZips = {};
            
  
            const options = {
              uri: `https://www.zipcodeapi.com/rest/${process.env.ZIPCODEKEY}/radius.json/${zipCode}/${distance}/miles`,
              headers: {
                  'User-Agent': 'Request-Promise'
              },
              respolveWithFullResponse: true,
              json: true // Automatically parses the JSON string in the response
            };
            rp.get(options)
            .then(response => {
               response["zip_codes"].map(z => {
               closeZips[z.zip_code] = z.city;
             })
             Providers.find()
            .then(providers => {
              let localProviders = []

              for (let i = 0; i < providers.length; i++) { 
                    if (closeZips[providers[i].zipcode] !== undefined || closeZips[providers[i].zipcode] === zipCode) {
                        localProviders.push(providers[i]);
                    }
                }
              res.status(200).json(localProviders);
              })
              
            .catch(err => {
              console.log(err.message)
              res.status(500).json({err, message: "error finding provider"})
            })       
              
            })
            .catch(err => {
              console.log(err.message)
              res.status(500).json({err, message: "error doing the zipcodes API get"});
            })
            
    });

    module.exports = router;