module.export = (function () {
  'use strict';

  var mongoose = require('mongoose'),
      crypto = require('crypto'),
      jwt = require('jsonwebtoken');

  var UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    salt: String,
    hash: String,
    forums: [{type: mongoose.Schema.Types.ObjectId, ref: 'Forum'}]
  });

  UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');

    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  };

  UserSchema.methods.validatePassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

    return this.hash === hash;
  };

  UserSchema.methods.generateJWT = function () {
    var today = new Date(),
        exp = new Date(today);

    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      _id: this._id,
      username: this.username,
      exp: parseInt(exp.getTime() / 1000)
    }, 'SECRET');
  };

  return mongoose.model('User', UserSchema);
})();
