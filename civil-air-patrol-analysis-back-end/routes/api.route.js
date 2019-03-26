// Node librarires.
var express = require('express');
var router = express.Router();

// Custom api child routes to handle API requests.
var photos = require('./api/photos.route');
var analysis = require('./api/analysis.route');
var classes = require('./api/class.route');
var data_sets = require('./api/data_set.route');
var image_sets = require('./api/image_set.route');
var users = require('./api/user.route');

// Assigning the child routes.
router.use('/photos', photos);
router.use('/analysis', analysis);
router.use('/class', classes);
router.use('/data_sets', data_sets);
router.use('/image_sets', image_sets);
router.use('/user', users);

module.exports = router;