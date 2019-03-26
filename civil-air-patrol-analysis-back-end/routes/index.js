// Node librarires.
var express = require('express');
var router = express.Router();

// Get home page. 
router.get('/', function(req, res) {
  res.render('index', { title: 'Civil Air Patrol Analysis Back-end' });
});

module.exports = router;
