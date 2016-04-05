module.exports = (function () {
  'use strict';

  var router = require('express').Router(),
      Post = require('./model/Post.js'),
      Comment = require('./model/Comment.js'),
      Forum = require('./model/Forum.js'),
      User = require('./model/User.js');


  return router;
})();
