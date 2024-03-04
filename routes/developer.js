var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('developer', {
    title: req.app.get('title') + ` - Developer`,
  });
});

module.exports = router;
