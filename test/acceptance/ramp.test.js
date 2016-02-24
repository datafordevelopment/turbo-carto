'use strict';

var assert = require('assert');
var postcss = require('postcss');
var PostcssTurboCartoCss = require('../../src/postcss-turbo-cartocss');
var DummyDatasource = require('../support/dummy-datasource');

var datasource = new DummyDatasource();

var postCssTurboCartoCss = new PostcssTurboCartoCss(datasource);

describe('color-ramp', function () {
  var cartocss = [
    '#layer{',
    '  polygon-opacity: 1;',
    '  polygon-fill: ramp([area2], colorbrewer(YlGnBu, 7), jenks);',
    '}'
  ].join('\n');

  var expectedCartocss = [
    '#layer{',
    '  polygon-opacity: 1;',
    '  polygon-fill: #ffffcc;',
    '  [ area2 > 0 ]{',
    '    polygon-fill: #c7e9b4',
    '  }',
    '  [ area2 > 1 ]{',
    '    polygon-fill: #7fcdbb',
    '  }',
    '  [ area2 > 2 ]{',
    '    polygon-fill: #41b6c4',
    '  }',
    '  [ area2 > 3 ]{',
    '    polygon-fill: #1d91c0',
    '  }',
    '  [ area2 > 4 ]{',
    '    polygon-fill: #225ea8',
    '  }',
    '  [ area2 > 5 ]{',
    '    polygon-fill: #0c2c84',
    '  }',
    '}'
  ].join('\n');

  it('should return a rule selector with color ramp', function (done) {
    postcss([postCssTurboCartoCss.getPlugin()])
      .process(cartocss)
      .then(function (result) {
        assert.equal(result.css, expectedCartocss);
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });
});
