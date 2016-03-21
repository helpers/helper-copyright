'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('markdown-link', 'link');
require('mixin-deep', 'merge');
require('parse-author');
require('update-copyright');
require('year');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
