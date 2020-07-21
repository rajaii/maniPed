const router = require('express').Router();
const rp = require('request-promise')

const Providers = require('./providersHelpers.js');

//so users can search for providers who are within x miles of their location for service



router.get('/', (req, res) => {
    console.log('going in')
    const { zipCode, distance } = req.body;
    
    const closeZips = {}
    let zips;
  
            const options = {
              uri: `https://www.zipcodeapi.com/rest/${process.env.ZIPCODEKEY}/radius.json/${zipCode}/${distance}/miles`,
              headers: {
                  'User-Agent': 'Request-Promise'
              },
              json: true // Automatically parses the JSON string in the response
            };
            rp.get(options)
            .then(res => {
            //   res["zip_codes"].map(z => {
            //   closeZips[z.zip_code] = z.city;
            
            
            // })
            zips = res
              
            })
            .catch(err => {
              console.log(err)
            })
            console.log(`ZIPS: ${zips}`)

            console.log(`closeZips: ${JSON.stringify(closeZips)}`)
            Providers.find()
            .then(providers => {
              console.log(`providers: ${JSON.stringify(providers)}`);
              let localProviders = providers.filter(p => p["zipcode"] === zipCode) 

              for (let i = 0; i < providers.length; i++) {
                
                for (let key in closeZips) {
                    
                    if (providers[i].zipcode === key) {
                        
                        localProviders.push(providers[i])
                        
                    }
                }
              }
              res.status(200).json(localProviders);
              console.log(`localproviders: ${JSON.stringify(localProviders)}`)
              })
              
            .catch(err => {
                console.log(err)
              res.status(500).json(err)
            })       
  
            
    });

    module.exports = router;