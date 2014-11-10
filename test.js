/*!
 * helper-copyright <https://github.com/jonschlinkert/helper-copyright>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var handlebars = require('handlebars');
var _ = require('lodash');
var copyright = require('./');

var locals = {author: {name: 'Jon Schlinkert'}};

describe('copyright', function () {
  it('should return a formatted copyright statement:', function () {
    copyright(locals).should.eql('Copyright (c) 2014 Jon Schlinkert  ');
  });

  it('should work as a lodash helper:', function () {
    _.template('<%= copyright({author: author}) %>', locals, {imports: {copyright: copyright}}).should.eql('Copyright (c) 2014 Jon Schlinkert  ');
  });

  it('should work as a handlebars helper:', function () {
    handlebars.registerHelper('copyright', copyright);

    handlebars.compile('{{copyright this}}')(locals).should.eql('Copyright (c) 2014 Jon Schlinkert  ');
  });
});

