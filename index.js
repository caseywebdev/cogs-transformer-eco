var _ = require('underscore');
var eco = require('eco');
var babel = require('cogs-transformer-babel');

var DEFAULTS = {
  modules: 'umd'
};

module.exports = function (file, options, cb) {
  var source = file.buffer.toString();
  options = _.extend({}, DEFAULTS, options);
  try { source = 'export default ' + eco.precompile(source); }
  catch (er) { return cb(new Error(er)); }
  babel(_.extend({}, file, {buffer: new Buffer(source)}), options, cb);
};
