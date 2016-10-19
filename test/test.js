var helper = require('cogs-test-helper');

helper.run({
  'test/config.json': {
    'test/input.eco': helper.getFileBuffer('test/output.js'),
    'test/error.eco': Error
  }
});
