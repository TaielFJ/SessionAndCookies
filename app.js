var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var port = 3000;

var methodOverride = require('method-override')
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cookieSession = require('./middlewares/cookieCheck')

var logger = require('morgan');

var indexRouter = require('./routes/index');



app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
  secret: "secreto",
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))
app.use(cookieParser());
app.use(cookieSession);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
