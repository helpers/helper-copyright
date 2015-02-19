/*!
 * helper-copyright <https://github.com/helpers/helper-copyright>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('should');
var handlebars = require('handlebars');
var _ = require('lodash');
var copyrightHelper = require('./');

var locals = {author: {name: 'Jon Schlinkert', url: 'https://github.com/jonschlinkert'}};

describe('helper copyright', function () {
  it('should return a formatted copyright statement:', function () {
    copyrightHelper(locals).should.eql('Copyright (c) 2014 Jon Schlinkert  ');
  });

  it('should update the start year:', function () {
    var ctx = {author: {name: 'Jon Schlinkert', url: 'https://github.com/jonschlinkert'}, year: '2013'};
    copyrightHelper(ctx).should.eql('Copyright (c) 2013-2014 Jon Schlinkert  ');
  });

  it('should update the range of years:', function () {
    var ctx = {author: {name: 'Jon Schlinkert', url: 'https://github.com/jonschlinkert'}, years: '2013-2020'};
    copyrightHelper(ctx).should.eql('Copyright (c) 2013-2020 Jon Schlinkert  ');
  });

  it('should work as a lodash helper:', function () {
    _.template('<%= copyright({author: author}) %>', locals, {imports: {copyright: copyrightHelper}}).should.eql('Copyright (c) 2014 Jon Schlinkert  ');
  });

  it('should work as a lodash mixin:', function () {
    _.mixin({copyright: copyrightHelper});
    _.template('<%= _.copyright({author: author}) %>', locals).should.eql('Copyright (c) 2014 Jon Schlinkert  ');
  });

  it('should work as a handlebars helper:', function () {
    handlebars.registerHelper('copyright', copyrightHelper);

    handlebars.compile('{{copyright this}}')(locals).should.eql('Copyright (c) 2014 Jon Schlinkert  ');
  });
});

describe('when `linkify` is `true`:', function () {
  it('should return a formatted copyright statement:', function () {
    locals = _.extend({linkify: true}, locals);
    copyrightHelper(locals).should.eql('Copyright (c) 2014 [Jon Schlinkert](https://github.com/jonschlinkert)  ');
  });

  it('should work as a lodash helper:', function () {
    _.template('<%= copyright({author: author, linkify: true}) %>', locals, {imports: {copyright: copyrightHelper}}).should.eql('Copyright (c) 2014 [Jon Schlinkert](https://github.com/jonschlinkert)  ');
  });

  it('should work as a handlebars helper:', function () {
    locals = _.extend({linkify: true}, locals);
    handlebars.registerHelper('copyright', copyrightHelper);

    handlebars.compile('{{copyright this}}')(locals).should.eql('Copyright (c) 2014 [Jon Schlinkert](https://github.com/jonschlinkert)  ');
  });
});