'use strict';

var _ = require('lodash');

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

module.exports = function (locals) {
  var context = {};

  // compatibility with template, verb and assemble.
  if (this && this.app && this.context) {
    context = _.merge({}, this.app.cache.data, this.context);
  }

  var ctx = _.merge({author: {}}, context, locals);
  var current = new Date().getFullYear();
  var str = 'Copyright (c) ';

  // if `year` is passed, create a date range
  str += ctx.year
    ? (ctx.year + '-' + current)
    : ctx.years
      ? ctx.years
      : current;

  // add author string
  str += ' ';

  var author = (typeof ctx.author === 'string') ? ctx.author : ctx.author.name;

  str += author;

  if (ctx.linkify === true && (ctx.author.url || ctx.author.twitter)) {
    var mdu = require('markdown-utils');
    var link = mdu.link(author, (ctx.author.url || ctx.author.twitter))
    str = str.replace(author, link)
  }

  // Keep spaces at the end to ensure that
  // a newline is retained by any md renderer
  return str + '  ';
};
