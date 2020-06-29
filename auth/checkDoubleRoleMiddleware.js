module.exports = (role, role2) => {
    return function(req, res, next) {
        if (req.decodedToken.roles && req.decodedToken.roles.includes(role)) {
            next();
        } else if (req.decodedToken.roles && req.decodedToken.roles.includes(role2)) {
            next();
        } 
        else {
            res.status(403).json({you: "can't touch this"})
        }
    }
}