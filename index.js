'use strict';

const _ = require('underscore');
const eco = require('eco');

const DEFAULTS = {
  before: 'export default ',
  after: ';\n'
};

module.exports = function (file, options, cb) {
  try {
    let source = file.buffer.toString();
    options = _.extend({}, DEFAULTS, options);
    source = options.before + eco.precompile(source) + options.after;
    cb(null, {buffer: new Buffer(source)});
  } catch (er) { return cb(new Error(er)); }
};
