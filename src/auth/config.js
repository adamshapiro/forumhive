module.exports = (function () {
  'use strict';

  var passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      User = require('./model/User');

      passport.use(new LocalStrategy(
        function (username, password, done) {
          User.findOne({username: username}, function (err, user) {
            if (err)
              return done(err);

            if (!user || !user.validatePassword(password))
              return done(null, false, {message: 'Incorrect username and/or password.'});

            return done(null, user);
          });
        };
      ));

      return passport;
})();
