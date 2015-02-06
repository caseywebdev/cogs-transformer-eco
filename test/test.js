var config = require('cogs/src/config');
var crypto = require('crypto');
var expect = require('chai').expect;
var fs = require('fs');
var getBuild = require('cogs/src/get-build');
var path = require('path');

var beforeEach = global.beforeEach;
var describe = global.describe;
var it = global.it;

var getHash = function (buffer) {
  var hash = crypto.createHash('md5');
  hash.end(buffer);
  return hash.read().toString('hex');
};

var getFileHash = function (filePath) {
  return getHash(fs.readFileSync(filePath));
};

var FIXTURES = {
  'test/config.json': {
    'test/input.eco': {
      path: 'test/input.eco',
      buffer: fs.readFileSync('test/output.js'),
      hash: getFileHash('test/output.js'),
      requires: [{
        path: 'test/input.eco',
        hash: getFileHash('test/input.eco')
      }],
      links: [],
      globs: []
    },
    'test/error.eco': Error
  }
};

Object.keys(FIXTURES).forEach(function (configPath) {
  var builds = FIXTURES[configPath];

  describe(configPath, function () {
    beforeEach(function () {
      config.set(require(path.resolve(configPath)));
    });

    Object.keys(builds).forEach(function (inputPath) {
      var expected = builds[inputPath];

      describe(inputPath, function () {
        var expectsError = expected === Error;

        it(expectsError ? 'fails' : 'succeeds', function (done) {
          getBuild(inputPath, function (er, build) {
            if (expectsError) expect(er).to.be.an.instanceOf(Error);
            else if (er) return done(er);
            else expect(build).to.deep.equal(expected);
            done();
          });
        });
      });
    });
  });
});
