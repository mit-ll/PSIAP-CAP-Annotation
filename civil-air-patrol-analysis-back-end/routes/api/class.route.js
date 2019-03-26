// Node libraries.
var express = require('express')
var router = express.Router()

// Custom classification controller to handle requests.
var class_controller = require('../../controllers/class.controller');

// Mapping routes to the proper controller function.
router.get('/', class_controller.get_classifications);

module.exports = router;