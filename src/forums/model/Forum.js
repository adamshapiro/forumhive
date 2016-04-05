module.exports = (function () {
  'use strict';

  var mongoose = require('mongoose');

  var ForumSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    seekingMembership: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
  });

  return mongoose.model('Forum', ForumSchema);
})();
