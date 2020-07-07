const router = require('express').Router()
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

const showcase = require('./showcaseHelpers.js')
