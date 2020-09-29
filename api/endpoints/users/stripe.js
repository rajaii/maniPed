const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const Users = require('./usersHelpers.js');



router.get('/:id/card-wallet/', async (req, res) => {
    const id = req.params.id;
    const customer = await stripe.customers.create();

    const intent =  await stripe.setupIntents.create({
      customer: customer.id,
    });
    console.log(intent)
    // res.render('card_wallet', { client_secret: intent.client_secret });
    const body = {stripe_custyid: customer.id}
    Users.update(id, body)
    .then(f => console.log('success adding the stripe_custyid to db...', body.stripe_custyid, f))
    .catch(e => console.log('error adding the stripe_custyid to db...', e))

    res.status(200).json({client_secret: intent.client_secret})
  });



module.exports = router;