"use strict";

var customizr = require('customizr');
var extend = require('extend');

var defaultConfig = {
  // Based on default settings on https://github.com/Modernizr/customizr
  options: ['setClasses', 'addTest', 'html5printshiv', 'testProp', 'fnBind'],
  files: {
    src: ['**[^node_modules]/**/*.{js,css,scss}'],
  },
  runOnce: false,
};

function wrapOutput(output) {
  // Expose generated Modernizr as a self executing module.
  return ";(function(window){\n" +
  output + "\n" +
  "module.exports = window.Modernizr;\n" +
  "})(window);";
}

module.exports = function (config) {
  var settings = extend(defaultConfig, JSON.parse(config));

  if (typeof this.cacheable === 'function' && settings.runOnce) {
    this.cacheable()
  }

  var cb = this.async();

  customizr(settings, function (data) {
    cb(null, wrapOutput(data.result));
  });
};
