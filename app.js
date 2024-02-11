const u = require('./util');
const appName = u.config().app.name;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testRouter = require('./routes/test');
var tmpRouter = require('./routes/tmp');
var coverRouter = require('./routes/cover');
var uangRouter = require('./routes/uang');
var rpgRouter = require('./routes/rpg');
var pwaRouter = require('./routes/pwa');

var app = express();

app.set('title', appName);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/pwa', pwaRouter);
app.use('/rpg', rpgRouter);
app.use('/uang', uangRouter);
app.use('/equipment', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);
app.use('/tmp', tmpRouter);
app.use('/', coverRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
