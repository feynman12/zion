var express = require('express');
var router = express.Router();

/**
 * Gets the home page
 *
 * GET /
 * No request parameters
 * Response: index.ejs
 */
router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;
