var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('dwijpr', {
    title: `Dwi Prabowo | Profil`,
  });
});

module.exports = router;
