"use strict";

var customizr = require('customizr');
var extend = require('extend');

function wrapOutput(output) {
  // Expose generated Modernizr as a self executing module.
  return ";(function(window){\n" +
  output + "\n" +
  "module.exports = window.Modernizr;\n" +
  "})(window);";
}

module.exports = function (config) {
  if (typeof this.cacheable === 'function') {
    this.cacheable()
  }

  var cb = this.async();

  var def = {
    // Based on default settings on https://github.com/Modernizr/customizr
    options: ['setClasses', 'addTest', 'html5printshiv', 'testProp', 'fnBind'],
    files: {
      src: ['**[^node_modules]/**/*.{js,css,scss}'],
    },
  };

  var settings = extend(def, JSON.parse(config));

  customizr(settings, function (data) {
    cb(null, wrapOutput(data.result));
  });
};
