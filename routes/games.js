var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('games', {
    title: req.app.get('title') + ` - Games`,
  });
});

module.exports = router;
