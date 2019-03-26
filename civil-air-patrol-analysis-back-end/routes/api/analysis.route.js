// Node libraries.
var express = require('express')
var router = express.Router()

// Custom analysis controller to handle requests.
var analysis_controller = require('../../controllers/analysis.controller');

// Mapping routes to the proper controller function.
router.get('/', analysis_controller.get_analysises);
router.get('/:id', analysis_controller.get_analysis);
router.post('/', analysis_controller.create_analysis);
router.put('/', analysis_controller.update_analysis);
router.delete('/:id',analysis_controller.remove_analysis);
router.delete('/',analysis_controller.remove_all_analysises);

module.exports = router;