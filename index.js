'use strict';

var _ = require('lodash');

/**
 * Add a copyright statement, with author and year(s) in effect.
 *
 * ```js
 * {%= copyright() %}
 * //=> Copyright (c) 2014 Jon Schlinkert.
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
  if (this && this.root && this.context) {
    context = _.merge({}, this.root.cache.data, this.context);
  }

  var ctx = _.merge({author: {}}, context, locals);
  var current = new Date().getFullYear();
  var str = 'Copyright (c) ';

  // if `year` is passed, create a date range
  str += ctx.year
    ? (ctx.year + '-' + current)
    : current;

  // add author string
  str += ' ';
  str += (typeof ctx.author === 'string')
    ? ctx.author
    : ctx.author.name;

  // Keep spaces at the end to ensure that
  // a newline is retained by any md renderer
  return str + '  ';
};