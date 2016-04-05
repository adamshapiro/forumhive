module.exports = (function () {
  'use strict';

  var router = require('express').Router(),
      passport = require('./config.js'),
      User = require('./model/User.js');

  router.post('/register', function (req, res, next) {
    if (!req.body.username || !req.body.password)
      return res.status(400).json({message: 'Please fill out all the fields'});

    var user = new User();

    user.username = req.body.username;

    user.setPassword(req.body.password);

    user.save(function (err) {
      if (err)
        return next(err);

      return res.json({token: user.generateJWT()});
    });
  });

  router.post('/login', function (req, res, next) {
    if (!req.body.username || !req.body.password)
      return res.status(400).json({message: 'Please fill out all the fields'});

    passport.authenticate('local', function (err, user, info) {
      if (err)
        return next(err);

      if (user)
        return res.json({token: user.generateJWT()});
      else
        return res.status(401).json(info);
    })(req, res, next);
  });

  return router;
})();
