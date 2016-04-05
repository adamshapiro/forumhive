module.exports = (function () {
  'use strict';

  var express = require('express'),
      path = require('path'),
      favicon = require('serve-favicon'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      passport = require('./src/auth/config.js'),
      db = require('./src/db.js'),
      app = express();

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

  db.connect('mongodb://localhost/hive-dev', function () {
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'pub')));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/auth', require('./src/auth/routes.js'));
    app.use('/forums', require('./src/forums/routes.js'));
    app.use('/posts', require('./src/posts/routes.js'));
    app.use('/users' require('./src/users/routes.js'));

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });
  });

  return app;
})();
