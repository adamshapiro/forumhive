module.exports = (function () {
  'use strict';

  var router = require('express').Router(),
      Guild = require('./model/Guild.js'),
      User = require('./model/User.js');

  router.param('guildId', function (req, res, next, id) {
    Guild.findById(id)
         .exec(function (err, guild) {
           if (err)
             return next(err);

           if (!guild)
             return res.status(400).json({message: 'Can\'t find Guild'});

           req.guild = guild;
           return next();
         });
  });

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

  router.get('/', function (req, res, next) {
    Guild.find({})
         .exec(function (error, guilds) {
           if (error)
            return next(error)

           res.json(guilds);
         });
  });

  router.post('/', function (req, res, next) {
    var guild = new Guild(req.body);

    guild.save(function (err, guild) {
      if (err)
        return next(err);

      return res.json(guild);
    })
  });

  router.get('/:guildId', function (req, res, next) {
    req.guild.populate('members')
             .populate('seekingMembership')
             .populate('posts');

    res.json(req.guild);
  });

  router.post('/:guildId/users/:userId', function (req, res, next) {
    if (req.guild.members.length < 3) {
      req.guild.members.push(req.user);

      req.guild.save(function (err, guild) {
        if (err)
          return next(err)

        req.user.guilds.push(guild);
        req.user.save(function (err, user) {
          if (err)
            return next(err)

          res.json(guild);
        });
      });
    } else {
      req.guild.seekingMembership.push(req.user);
      req.guild.save(function (err, guild) {
        if (err)
          return next(err);

        res.json(guild);
      });
    }
  });

  router.put('/:guildId/users/:userId', function (req, res, next) {
    var index = req.guild.seekingMembership.indexOf(req.user);

    if (index < 0)
      return res.status(400).json({message: 'User is not seeking membership to this guild'});

    req.guild.seekingMembership.splice(index, 1);
    req.guild.memebers.push(req.user);
    req.guild.save(function (err, guild) {
      if (err)
        return next(err)

      req.user.guilds.push(guild);
      req.user.save(function (err, user) {
        if (err)
          return next(err)

        res.json(guild);
      });
    });
  });

  return router;
})();
