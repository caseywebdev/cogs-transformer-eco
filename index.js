const _ = require('underscore');
const eco = require('eco');

const DEFAULTS = {
  before: 'export default ',
  after: ';\n'
};

module.exports = ({file: {buffer}, options}) => {
  const {before, after} = _.extend({}, DEFAULTS, options);
  return {
    buffer: Buffer.from(before + eco.precompile(buffer.toString()) + after)
  };
};
