module.exports = (function () {
  'use strict';

  var mongoose = require('mongoose');

  var CommentSchema = new mongoose.Schema({
    body: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  });

  return mongoose.model('Comment', CommentSchema);
})();
