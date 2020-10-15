const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const Users = require('../api/endpoints/users/usersHelpers.js');
//check if decoded token.username = username.  ie make sure the user is the user to be able to run puts on profile.  will have to pass in user
//into here from where it is coming from to check
//use this for reference V
// def has_object_permission(self, req, view, obj):
//         """Check user is trying to edit their own profile"""

//         if req.method in permissions.SAFE_METHODS:
//             return True 

//         return obj.id == request.user.id
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