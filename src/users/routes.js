module.exports = (function () {
  'use strict';

  var router = require('express').Router(),
      User = require('./model/User.js');

  router.param('userId', function (req, res, next, id) {
    User.findById(id)
        .exec(function (err, user) {
          if (err)
            return next(err);

          if (!user)
            return res.status(400).json({message: 'Can\'t find User'});

          req.user = user;
          return next();
        });
  });

  router.get('/:userId', function (req, res) {
    res.json(req.user);
  });

  router.put('/:userId', function (req, res, next) {
    req.user = req.body;

    req.user.save(function (err, user) {
      if (err)
        return next(err);

      res.json(user);
    });
  });

  return router;
})();
