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
 * //=> Copyright © 2016, Jon Schlinkert.
 *
 * {%= copyright({year: 2013}) %}
 * //=> Copyright © 2013, 2016 Jon Schlinkert.
 * ```
 *
 * @param  {Number} `year` Optionally pass the start year of the project.
 * @return {String} Complete copyright statement.
 */

module.exports = function(config) {
  return function copyright(locals) {
    var context = {};
    var options = {};

    if (this && this.context) {
      options = this.options;
      context = this.context;
    }

    var opts = utils.merge({}, config, options, context, locals);
    if (typeof opts.author === 'string') {
      opts.author = utils.parseAuthor(opts.author);
    }

    if (opts.linkify === true && opts.author.url) {
      var origAuthor = opts.author.name;
      opts.author = utils.link(opts.author.name, opts.author.url);
    } else {
      opts.author = opts.author.name;
    }

    opts.years = opts.start || opts.first || opts.year || opts.years || utils.year();
    var str = 'Copyright © ' + opts.years + ', ' + origAuthor;

    return utils.updateCopyright(str, opts);
  };
};
