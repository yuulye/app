var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('github-pages', {
    title: req.app.get('title') + ` - Github Pages`,
  });
});

module.exports = router;
