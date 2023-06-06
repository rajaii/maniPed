const router = require('express').Router();

const Services = require('./available_servicesHelpers.js');

router.get('/', (req, res) => {
    Services.find()
    .then(list => {
        res.status(200).json(list);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.post('/', /*checkRoles('MANIGODS'),*/ (req, res) => {
    Services.add(req.body)
    .then(service => {
        res.status(201).json(service);
    })
    .catch(err => {
        res.status(500).json(err);
    })
} )

module.exports = router;