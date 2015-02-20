/*!
 * helper-copyright <https://github.com/helpers/helper-copyright>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var merge = require('merge-deep');

/**
 * Add a copyright statement, with author and year(s) in effect.
 *
 * ```js
 * {%= copyright() %}
 * //=> Copyright (c) 2014-2015, Jon Schlinkert.
 *
 * {%= copyright({year: 2012}) %}
 * //=> Copyright (c) 2012-2014 Jon Schlinkert.
 * ```
 *
 * @param  {Number} `year` Optionally pass the start year of the project.
 * @return {String} Complete copyright statement.
 */

module.exports = function copyright(locals) {
  var context = {};

  // compatibility with template, verb and assemble.
  if (this && this.app && this.context) {
    context = merge({}, this.app.cache.data, this.context);
  }

  var ctx = merge({author: {}}, context, locals);
  var current = new Date().getFullYear();
  var str = 'Copyright (c) ';

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
    var mdu = require('markdown-utils');
    var link = mdu.link(author, (ctx.author.url || ctx.author.twitter));
    str = str.replace(author, link);
  }

  // Keep spaces at the end to ensure that
  // a newline is retained by any md renderer
  return str + '  ';
};