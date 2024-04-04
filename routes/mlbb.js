var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('mlbb', {
    title: req.app.get('title') + ` - MLBB`,
  });
});

module.exports = router;
