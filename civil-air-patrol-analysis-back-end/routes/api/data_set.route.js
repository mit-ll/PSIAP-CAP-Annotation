// Node libraries.
var express = require('express')
var router = express.Router()

// Custom data set controller to handle requests.
var data_set_controller = require('../../controllers/data_set.controller');

// Mapping routes to the proper controller function.
router.get('/', data_set_controller.get_all_data_sets);

module.exports = router;