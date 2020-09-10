require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'setup',
    customer: 'cus_FOsk5sbh3ZQpAU',
    success_url: 'http://localhost4000/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost4000/cancel',
  });