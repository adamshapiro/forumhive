module.exports = (function () {
  var mongoose = require('mongoose');

  return {
    connect: function (uri, callback) {
      mongoose.connect(uri);

      var conn = mongoose.connection;

      conn.once('open', function () {
        callback();
      });
    }
  };
})();
