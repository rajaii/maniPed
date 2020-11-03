require('dotenv').config()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const Users = require('../api/endpoints/users/usersHelpers.js');

module.exports = (req, res, next) => {

  try {
    console.log(req.headers)
    
  // const token = req.headers.authorization.slice;
  const token = req.headers.xcustomheaders;
  console.log('here dude',token)
  if (token) {
    jwt.verify(token, process.env.JWTSECRET || "manipedisthafuta1234356346+_:>{>:", (err, decodedToken) => {
      if (err) {
        console.log(err)
        throw new Error(err)
        res.status(401).json({message: 'bad auth'})
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  } else {
    
    
    res.status(401).json({message: 'bad auth'})
  }
} catch (err) {
  console.log(err)
  res.status(401).json({message: 'bad auth'})
}
};