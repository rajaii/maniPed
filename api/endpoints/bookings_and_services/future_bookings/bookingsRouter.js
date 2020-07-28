const router = require('express').Router();
const nodeMailer = require('nodemailer');

const Bookings = require('./bookingsHelpers.js');
const Providers = require('../../providers/providersHelpers.js');
const Users = require('../../users/usersHelpers.js');

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'manipedcustomerservice@gmail.com',
    pass: 'AliJosephPattaya2025$'
  }
})

router.get('/', (req, res) => {
  Bookings.find()
    .then(bookings => {
      res.status(200).json(bookings);
    })
    .catch(err => res.send(err));
});

router.get('/:id', validateBookingId, (req, res) => {
    res.status(200).json(req.booking);
})

router.get('/user/:user_id', async (req, res) => {
    
    try {
        const { user_id } = req.params;
    
        let user_bookings = await Bookings.findByUserId(user_id)
        if(user_bookings.length > 0) {
            res.status(200).json(user_bookings)
            
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
    
        let provider_bookings = await Bookings.findByProviderId(provider_id)
        if(provider_bookings.length > 0) {
            res.status(200).json(provider_bookings)
        } else {
            res.status(404).json({message: 'invalid provider id'});
        }
    } catch(error) {
        res.status(500).json(error);
    }

});

 

router.put('/:id', validateBookingId, (req, res) => {
  const { id } = req.params;
  const { user_id, provider_id } = req.body;
    
  if (Object.keys(req.body).length < 1) {
    res.status(400).json({message: 'please provide a field to update the booking'});
  } else {
  Bookings.update(id, req.body)
    .then(booking => {
      console.log(booking)
        let userEmail;
        let providerEmail;
        let username;
        let providername;
        if (req.body.confirmed === 1) {
        Users.findById(user_id)
        .then(user => {
          username = user.username;
          userEmail = user.email;
          const userMailOptions = {
            from: 'manipedcustomerservice@gmail.com',
            to: `${userEmail}`,
            subject: 'Your booking has been confirmed',
            text: `Hello ${user.first_name}, your booking for ${booking[0].services_and_pricing} on 
            the date ${booking[0].booking_date} at ${booking[0].booking_time} has just been confirmed. Your booking id is ${booking[0].id}.  You can log in to maniPed at any time
            to adjust the booking or for further details; just be aware that any changes must be confirmed by the provider.  Thank you for choosing maniPed for your
            cosmetic needs!`
          }
          transporter.sendMail(userMailOptions, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(`Email sent, ${info.response}`)
            }
          })
        })
        .catch(err => {
          res.status(500).json(err)
        })
        Providers.findById(provider_id)
        .then(provider => {
          providername = provider.username;
          providerEmail = provider.email;

          const providerMailOptions = {
            from: 'manipedcustomerservice@gmail.com',
            to: `${providerEmail}`,
            subject: 'Thank you for confirming your booking',
            text: `Dear ${provider.first_name}, you have just confirmed your booking for ${booking[0].services_and_pricing} on 
            the date ${booking[0].booking_date} at ${booking[0].booking_time}. Your booking id is ${booking[0].id}. Thank you for partnering with maniPed!`
          }
          transporter.sendMail(providerMailOptions, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(`Email sent, ${info.response}`)
            }
          })
        })
        .catch(err => {
          res.status(500).json(err)
        })
      } else if (req.body.completed === 1) {
        Users.findById(user_id)
        .then(user => {
          username = user.username;
          userEmail = user.email;
          const userMailOptions = {
            from: 'manipedcustomerservice@gmail.com',
            to: `${userEmail}`,
            subject: 'Your service has been completed',
            text: `Hello ${user.first_name}, your booking for ${booking[0].services_and_pricing} on 
            the date ${booking[0].booking_date} at ${booking[0].booking_time} has just been completed. You can log in to the app to rate your provider for the service. 
            Thank you for choosing maniPed for your cosmetic needs!`
          }
          transporter.sendMail(userMailOptions, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(`Email sent, ${info.response}`)
            }
          })
        })
        .catch(err => {
          res.status(500).json(err)
        })
        Providers.findById(provider_id)
        .then(provider => {
          providername = provider.username;
          providerEmail = provider.email;

          const providerMailOptions = {
            from: 'manipedcustomerservice@gmail.com',
            to: `${providerEmail}`,
            subject: 'Service Completed',
            text: `Dear ${provider.first_name}, your booking for ${booking[0].services_and_pricing} on 
            the date ${booking[0].booking_date} at ${booking[0].booking_time} has been completed. Log in to the application to rate your client.  Thank you for partnering with maniPed!`
          }
          transporter.sendMail(providerMailOptions, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(`Email sent, ${info.response}`)
            }
          })
        })
        .catch(err => {
          res.status(500).json(err)
        })
      } else if (req.body.confirmed != 1 && req.body.completed != 1) {
        Users.findById(user_id)
        .then(user => {
          username = user.username;
          userEmail = user.email;
          const userMailOptions = {
            from: 'manipedcustomerservice@gmail.com',
            to: `${userEmail}`,
            subject: 'Your booking has been updated',
            text: `Hello ${user.first_name}, your booking for ${booking[0].services_and_pricing} on 
            the date ${booking[0].booking_date} at ${booking[0].booking_time} has just been updated. Your booking id is ${booking[0].id}.  Thank you for choosing maniPed for your
            cosmetic needs!`
          }
          transporter.sendMail(userMailOptions, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(`Email sent, ${info.response}`)
            }
          })
        })
        .catch(err => {
          res.status(500).json(err)
        })
        Providers.findById(provider_id)
        .then(provider => {
          providername = provider.username;
          providerEmail = provider.email;

          const providerMailOptions = {
            from: 'manipedcustomerservice@gmail.com',
            to: `${providerEmail}`,
            subject: 'Once of your bookings has been updated',
            text: `Dear ${provider.first_name}, your booking for ${booking[0].services_and_pricing} on 
            the date ${booking[0].booking_date} at ${booking[0].booking_time} has been updated. Your booking id is ${booking[0].id}.  Log in to the application to confirm the changes, and for further details.
             Thank you for partnering with maniPed!`
          }
          transporter.sendMail(providerMailOptions, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(`Email sent, ${info.response}`)
            }
          })
        })
        .catch(err => {
          res.status(500).json(err)
        })
      }

      res.status(200).json({booking});
    })
    .catch(err => {
      console.log(err.message)
      res.status(500).json(err)
    });
  }
});

router.post('/', (req, res) => {
    const {booking_date, booking_time, services_and_pricing, /*the following 2 ids will come from the users data, and the screen where
     you click on the provider to book*/ provider_id, user_id } = req.body;

    if (!provider_id || !user_id || !booking_date || !booking_time|| !services_and_pricing) {
      res.status(400).json({message: 'please provide all required fields to request a booking...'});
    } else {
    Bookings.add(req.body)
      .then(booking => {
        //do a get to users/:id and providers/:id to get the emails out of there
        let userEmail;
        let providerEmail;
        let username;
        let providername;
        Users.findById(user_id)
        .then(user => {
          username = user.username;
          userEmail = user.email;
         
          const userMailOptions = {
            from: 'manipedcustomerservice@gmail.com',
            to: `${userEmail}`,
            subject: 'Completed booking',
            text: `Congratulations ${user.first_name}, you have just completed a booking for ${booking[0].services_and_pricing} on 
            the date ${booking[0].booking_date} at ${booking[0].booking_time}. Your booking id is ${booking[0].id}.  You can log in to maniPed at any time
            to adjust the booking or for further details; just be aware that any changes must be confirmed by the provider.  Thank you for choosing maniPed for your
            cosmetic needs!`
          }
          transporter.sendMail(userMailOptions, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(`Email sent, ${info.response}`)
            }
          })
        })
        .catch(err => {
          res.status(500).json(err)
        })
        
        Providers.findById(provider_id)
        .then(provider => {
          providername = provider.username;
          providerEmail = provider.email;

          const providerMailOptions = {
            from: 'manipedcustomerservice@gmail.com',
            to: `${providerEmail}`,
            subject: 'Customer booking',
            text: `Congratulations ${provider.first_name}, you have just recieved a booking for ${booking[0].services_and_pricing} on 
            the date ${booking[0].booking_date} at ${booking[0].booking_time}. Your booking id is ${booking[0].id}.  Please log into maniPed and confirm the 
            booking as soon as possible, or to check further details.  Thank you for partnering with maniPed!`
          }
          transporter.sendMail(providerMailOptions, function(err, info) {
            if (err) {
              console.log(err)
            } else {
              console.log(`Email sent, ${info.response}`)
            }
          })
        })
        .catch(err => {
          res.status(500).json(err)
        })
        
        
        res.status(201).json({booking});
      })
      .catch(err => {
        res.status(500).json(err);
      });
    } 
});

router.delete('/:id', validateBookingId, (req, res) => {
    const { id } = req.params;

    Bookings.remove(id)
    .then(deleted => {
        res.status(200).json({deleted});
    })
    .catch(err => {
        res.status(500).json(err);
    });

    
});

async function validateBookingId(req, res, next) {
    try {
    const { id } = req.params;

    let booking = await Bookings.findById(id);
    if(booking) {
        req.booking = booking;
        next();
    } else {
        res.status(404).json({message: 'invalid booking id'});
    }
} catch(error) {
    res.status(500).json(error);
}
};



module.exports = router;