// Node libraries.
var express = require('express')
var router = express.Router()

// Custom image set controller to handle requests.
var image_set_controller = require('../../controllers/image_set.controller');

// Mapping routes to the proper controller function.
router.get('/:data_set_name', image_set_controller.get_rnd_image_from_set);
router.get('/', image_set_controller.get_all_image_sets);

module.exports = router;