// Node libraries.
var express = require('express')
var router = express.Router()

// Custom photo controller to handle requests.
var photos_controller = require('../../controllers/photos.controller');

// Mapping routes to the proper controller function.
router.get('/randomphotoinfo', photos_controller.get_rnd_photo_info);
router.get('/:id', photos_controller.get_photo);

module.exports = router;