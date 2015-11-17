/*!
 * helper-copyright <https://github.com/helpers/helper-copyright>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

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

module.exports = function(options) {
  var opts = utils.merge({}, options);

  return function copyright(locals) {
    var context = {};
    if (this && this.context) {
      context = this.context;
    }

    var ctx = utils.merge({}, {author: {}}, opts, context, locals);

    if (typeof ctx.copyright === 'string' && ctx.copyright.indexOf('Copyright') !== -1) {
      return ctx.copyright;
    }

    var current = new Date().getFullYear();
    var str = 'Copyright © ';

    if (ctx.copyright) {
      ctx = utils.merge({}, ctx, ctx.copyright);
    }

    // start year of a project. if `year` is passed,
    // create a date range
    ctx.year = +(ctx.start || ctx.first || ctx.year);

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
      var link = utils.link(author, (ctx.author.url || ctx.author.twitter));
      str = str.split(author).join(link);
    }
    return str;
  };
};
