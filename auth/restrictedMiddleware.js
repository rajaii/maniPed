const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const Users = require('../api/endpoints/users/usersHelpers.js');

module.exports = (req, res, next) => {

  try {
    console.log(req.headers.authorization)
    
  const token = req.headers.authorization;

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