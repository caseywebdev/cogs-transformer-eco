var helper = require('cogs-test-helper');

helper.run({
  'test/config.json': {
    'test/input.eco': {
      path: 'test/input.eco',
      buffer: helper.getFileBuffer('test/output.js'),
      hash: helper.getFileHash('test/output.js'),
      requires: [{
        path: 'test/input.eco',
        hash: helper.getFileHash('test/input.eco')
      }],
      links: [],
      globs: []
    },
    'test/error.eco': Error
  }
});
