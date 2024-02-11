var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('tmp', {
    title: req.app.get('title') + ` - TMP`,
  });
});

module.exports = router;
