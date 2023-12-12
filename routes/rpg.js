var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('rpg', {
    title: req.app.get('title') + ` - RPG`,
  });
});

module.exports = router;
