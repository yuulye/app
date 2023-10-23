var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('cover', {
    title: req.app.get('title'),
  });
});

module.exports = router;
