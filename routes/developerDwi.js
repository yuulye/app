var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('dwi', {
    title: `Dwi Prabowo | Profile`,
  });
});

module.exports = router;
