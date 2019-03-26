// Node libraries.
var express = require('express')
var router = express.Router()

// Custom user controller to handle requests.
var user_controller = require('../../controllers/user.controller');

// Mapping routes to the proper controller function.
router.get('/', user_controller.get_users);
router.post('/', user_controller.create_user);

module.exports = router;