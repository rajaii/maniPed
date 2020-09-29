const router = require('express').Router();
const nodeMailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const Services = require('./servicesHelpers.js');
const Bookings = require('../future_bookings/bookingsHelpers.js');
const Users = require('../../users/usersHelpers.js');
const Providers = require('../../providers/providersHelpers.js');


const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'manipedcustomerservice@gmail.com',
    pass: process.env.GMAILPASS
  }
})


router.get('/', (req, res) => {
  Services.find()
    .then(bookings => {
      res.status(200).json(bookings);
    })
    .catch(err => res.send(err));
});

router.get('/:id', validateServiceId, (req, res) => {
    res.status(200).json(req.service);
})

router.get('/user/:user_id', async (req, res) => {
    
    try {
        const { user_id } = req.params;
    
        let user_services = await Services.findByUserId(user_id)
        if(user_services.length > 0) {
            res.status(200).json(user_services)   
        } else {
            res.status(404).json({message: 'invalid user id'});
        }
    } catch(error) {
        res.status(500).json(error);
    }

});

router.get('/provider/:provider_id', async (req, res) => {
  
    try {
        const { provider_id } = req.params;
    
        let provider_services = await Services.findByProviderId(provider_id)
        if(provider_services.length > 0) {
            res.status(200).json(provider_services)
        } else {
            res.status(404).json({message: 'invalid provider id'});
        }
    } catch(error) {
        res.status(500).json(error);
    }

});
 

router.put('/:id', validateServiceId, (req, res) => {
  const { id } = req.params;
    
  if (Object.keys(req.body).length < 1) {
    res.status(400).json({message: 'please provide a field to update the service'});
  } else {
  Services.update(id, req.body)
    .then(service => {
      res.status(200).json({service});
    })
    .catch(err => {
      res.status(500).json(err)
    });
  }
});



router.post('/', (req, res) => {
    const {type_of_service, amount_billed, booking_id, /*active booking then provider will close out on a screen that verifies service details and goes to rating screen after
        */ /*the following 2 ids will come from the users data, and the screen where
     you click on the provider to book*/  provider_id, user_id, user_name, provider_name } = req.body;

    if (!type_of_service || !amount_billed || !booking_id || !provider_id || !user_id || !user_name || !provider_name) {
      res.status(400).json({message: 'please provide all required fields to complete the service...'});
    } else {
    Services.add(req.body)
      .then(service => {
        Bookings.update(booking_id, {"completed": 1})
        
        .then(async booking => {
            Users.findById(user_id)
            .then(async user => {
              const paymentMethods = await stripe.paymentMethods.list({
                customer: `${user.stripe_custyid}`,
                type: 'card',
              });
              let paymentIntent
              try {
                
                paymentIntent = await stripe.paymentIntents.create({
                  amount: service[0].amount_billed * 100,
                  currency: 'usd',
                  customer: `${user.stripe_custyid}`,
                  payment_method: paymentMethods.data[0].id,
                  off_session: true,
                  confirm: true,
                });
                //logic here on what to do next
              } catch (err) {
                // Error code will be authentication_required if authentication is needed
                console.log('Error code is: ', err.code);
                const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
                console.log('PI retrieved: ', paymentIntentRetrieved.id);
              }
              ////////////////////////V needs to be utilized only when payment fails.
              stripe.confirmCardPayment(paymentIntent.client_secret, {
                payment_method: paymentIntent.payment_method
              })
              .then(function(result) {
                if (result.error) {
                  // Show error to your customer
                  console.log(result.error.message);
                } else {
                  if (result.paymentIntent.status === 'succeeded') {
                    // The payment is complete!
                    console.log('success')
                  }
                }
              });

              username = user.username;
              userEmail = user.email;
              const userMailOptions = {
                from: 'manipedcustomerservice@gmail.com',
                to: `${userEmail}`,
                subject: 'Your service has been completed',
                text: `Hello ${user.first_name}, your booking for ${booking[0].services_and_pricing} on the date ${booking[0].booking_date} at ${booking[0].booking_time} with ${booking[0].provider_name} has just been completed.  Your credit card has been billed $${service[0].amount_billed}. You can log in to the app to rate your provider for the service. Thank you for choosing maniPed for your cosmetic needs!`
              }
              transporter.sendMail(userMailOptions, function(err, info) {
                if (err) {
                  console.log("error sending email to the user", err)
                } else {
                  console.log(`Email sent, ${info.response}`)
                }
              })
            })
            .catch(err => {
              console.log("error finding user by id line 155 servicesRouter.js", err)
            })
            Providers.findById(provider_id)
            .then(provider => {
              providername = provider.username;
              providerEmail = provider.email;
          
              const providerMailOptions = {
                from: 'manipedcustomerservice@gmail.com',
                to: `${providerEmail}`,
                subject: 'Service Completed',
                text: `Dear ${provider.first_name}, your booking for ${booking[0].services_and_pricing} on the date ${booking[0].booking_date} at ${booking[0].booking_time} with ${booking[0].user_name} has been completed.  Your account will now be credited $${service[0].amount_billed}. Log in to the application to rate your client.  Thank you for partnering with maniPed!`
              }
              transporter.sendMail(providerMailOptions, function(err, info) {
                if (err) {
                  console.log("error sending email to the provider line 170 servicesRouter.js", err)
                } else {
                  console.log(`Email sent, ${info.response}`)
                }
              })
            })
            .catch(err => {
              console.log("error finding provider line 177 servicesRouter.js", err)
            })

        })
        .catch(err => {
          res.status(500).json("error updating the booking line 182 servicesRouter.js", err)
        })
        res.status(201).json({service: service});
      })
      .catch(err => {
        console.log(err.message)
        res.status(500).json(err);
      });
    } 
});

router.delete('/:id', validateServiceId, (req, res) => {
    const { id } = req.params;

    Services.remove(id)
    .then(deleted => {
        res.status(200).json({deleted});
    })
    .catch(err => {
        res.status(500).json(err);
    });

    
});

async function validateServiceId(req, res, next) {
    try {
    const { id } = req.params;

    let service = await Services.findById(id);
    if(service) {
        req.service = service;
        next();
    } else {
        res.status(404).json({message: 'invalid service id'});
    }
} catch(error) {
    res.status(500).json(error);
}
};

module.exports = router;


