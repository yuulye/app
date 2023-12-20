var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('pwa', {
    title: req.app.get('title') + ` - PWA`,
    icons: '/tabler-icons-2.36.0/svg/',
  });
});

module.exports = router;
