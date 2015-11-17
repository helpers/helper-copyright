/*!
 * helper-copyright <https://github.com/helpers/helper-copyright>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
var assert = require('assert');
var handlebars = require('handlebars');
var copyrightHelper = require('./');
var Engine = require('engine');
var helper = copyrightHelper();
var engine;

var year = new Date().getFullYear();

var locals = {
  author: {
    name: 'Jon Schlinkert',
    url: 'https://github.com/jonschlinkert'
  }
};

describe('helper copyright', function () {
  it('should return a formatted copyright statement:', function () {
    assert.equal(helper(locals), 'Copyright © ' + year + ' Jon Schlinkert');
  });

  it('should update the start year:', function () {
    var ctx = {
      author: {
        name: 'Jon Schlinkert',
        url: 'https://github.com/jonschlinkert'
      },
      year: '2013'
    };
    assert.equal(helper(ctx), 'Copyright © 2013-' + year + ' Jon Schlinkert');
  });

  it('should update the range of years:', function () {
    var ctx = {
      author: {
        name: 'Jon Schlinkert',
        url: 'https://github.com/jonschlinkert'
      },
      years: '2013-2020'
    };
    assert.equal(helper(ctx), 'Copyright © 2013-2020 Jon Schlinkert');
  });
});

describe('handlebars', function () {
  it('should work as a handlebars helper:', function () {
    handlebars.registerHelper('copyright', helper);
    assert.equal(handlebars.compile('{{copyright this}}')(locals), 'Copyright © ' + year + ' Jon Schlinkert');
  });
});

describe('lodash', function () {
  beforeEach(function() {
    engine = new Engine();
    engine.data(locals);
  });

  it('should work as a lodash helper:', function () {
    var actual = engine.render('<%= copyright({author: author}) %>', {
      imports: {copyright: helper}
    });
    var expected = 'Copyright © ' + year + ' Jon Schlinkert';
    assert.equal(actual, expected);
  });

  it('should work as a lodash mixin:', function () {
    engine.data({copyright: helper});
    var actual = engine.render('<%= copyright({author: author}) %>');
    var expected = 'Copyright © ' + year + ' Jon Schlinkert';
    assert.equal(actual, expected);
  });
});

describe('when `linkify` is `true`:', function () {
  beforeEach(function() {
    engine = new Engine();
    locals.linkify = true;
  });

  it('should return a formatted copyright statement:', function () {
    locals.linkify = true;
    var actual = helper(locals);
    var expected = 'Copyright © ' + year + ' [Jon Schlinkert](https://github.com/jonschlinkert)';
    assert.equal(actual, expected);
  });

  it('should render a formatted copyright statement:', function () {
    locals.imports = {
      copyright: copyrightHelper({linkify: true})
    };
    var actual = engine.render('<%= copyright({author: author}) %>', locals);
    var expected = 'Copyright © ' + year + ' [Jon Schlinkert](https://github.com/jonschlinkert)';
    assert.equal(actual, expected);
  });

  // it('should work as a lodash helper:', function () {
  //   var actual = engine.render('<%= copyright({author: author, linkify: true}) %>', {imports: {copyright: assert.equal(helper}});
  //   var expected = 'Copyright © ' + year + ' [Jon Schlinkert](https://github.com/jonschlinkert)';
  //   assert.equal(actual, expected);
  // });

  // it('should work as a handlebars helper:', function () {
  //   locals = extend({linkify: true}, locals);
  //   handlebars.registerHelper('copyright', helper);

  //   var actual = handlebars.compile('{{copyright this}}')(locals);
  //   var expected = 'Copyright © '+ year + ' [Jon Schlinkert](https://github.com/jonschlinkert)';
  //   assert.equal(actual, expected);
  // });
});
