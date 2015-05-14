/*!
 * helper-copyright <https://github.com/helpers/helper-copyright>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var mdu = require('markdown-utils');
var merge = require('merge-deep');

/**
 * Add a copyright statement, with author and year(s) in effect.
 *
 * ```js
 * {%= copyright() %}
 * //=> Copyright © 2014-2015, Jon Schlinkert.
 *
 * {%= copyright({year: 2012}) %}
 * //=> Copyright © 2012-2014 Jon Schlinkert.
 * ```
 *
 * @param  {Number} `year` Optionally pass the start year of the project.
 * @return {String} Complete copyright statement.
 */

module.exports = function copyright(locals) {
  var app = this && this.app;
  var context = {};

  // if a string is passed, assume it's a generated copyright statement
  if (typeof locals === 'string') {
    if (app) app.set('data.copyright.statement', locals);
    return locals;
  }

  // return already-complete statements
  if (locals && typeof locals.statement === 'string') {
    if (app) app.set('data.copyright.statement', locals.statement);
    return locals.statement;
  }

  // compatibility with template, verb and assemble.
  if (app && app.cache) {
    context = merge({}, this.app.cache.data, this.context);
  }

  var ctx = merge({}, {author: {}}, context, locals);

  if (typeof ctx.copyright === 'string' && ctx.copyright.indexOf('Copyright') !== -1) {
    return ctx.copyright;
  }

  var current = new Date().getFullYear();
  var str = 'Copyright © ';

  if (ctx.copyright) {
    ctx = merge(ctx, ctx.copyright);
    ctx.year = ctx.first || ctx.year;
  }

  // start year of a project. if `year` is passed,
  // create a date range
  ctx.year = +(ctx.start || ctx.year);

  if (ctx.year && current && ctx.year < +current) {
    str += ctx.year + '-' + current;
  } else if (ctx.years) {
    str += ctx.years;
  } else {
    str += current;
  }

  // add author string
  var author = (typeof ctx.author === 'string')
    ? ctx.author
    : ctx.author.name;

  str += ' ' + author;

  if (ctx.linkify === true && (ctx.author.url || ctx.author.twitter)) {
    var link = mdu.link(author, (ctx.author.url || ctx.author.twitter));
    str = str.split(author).join(link);
  }

  if (app && app.set) {
    app.set('data.copyright.statement', str);
  }
  return str;
};
