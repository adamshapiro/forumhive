module.exports = (function () {
  'use strict';

  var mongoose = require('mongoose');

  var PostSchema = new mongoose.Schema({
    title: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    forum: {type: mongoose.Schema.Types.ObjectId, ref: 'Forum'},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
  });

  return mongoose.model('Post', PostSchema);
})();
