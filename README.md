# modernizr-auto-loader for webpack

This loader uses [Modernizr/customizr](https://github.com/Modernizr/customizr) to "...crawl your project for Modernizr test references and save out a minified, uglified, customized version using only the tests you've used in your JavaScript or (S)CSS.".

It outputs a self executing module, which automatically loads your custom modernizr build. Yay!

## Installation

```
$ npm install --save-dev modernizr-auto-loader
```

## Usage

### .modernizr-autorc

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Create a `.modernizr-autorc` configuration file, preferably in your project root, and put *your* customizr config details in it. , like this:

```javascript
// .modernizr-autorc
{
  option: 'value'
}
```

The default configuration used by this loader, which will be extended by your custom config is:
```javascript
// default config
{
  options: ['setClasses', 'addTest', 'html5printshiv', 'testProp', 'fnBind'],
  files: {
    src: ['**[^node_modules]/**/*.{js,css,scss}'],
  },
}
```

(See the [Customizr documentation](https://modernizr.com/docs) for all available options.)

As specified in the default config, **modernizr-auto-loader** crawls **all** *js/css/scss* files except files in *node_modules* (pattern `**[^node_modules]/**/*.{js,css,scss}`) by default, so it's recommended to specify your own file patterns to speed things up, or in worst case, have **customizr** abort due to too many open files.

The following config makes customizer only traverse the assets folder, looking for js/jsx/css/scss files.
```javascript
// .modernizr-autorc
{
  "files": {
    "src": [
      "assets/**/*.{js,jsx,css,scss}"
    ]
  }
}
```

### webpack configuration

Adjust your webpack config to trigger **modernizr-auto-loader** on build. If you didn't put your config in the root folder, resolve the path relative to your webpack config.

```javascript
module.exports = {
  module: {
    loaders: [
      {
        test: /\.modernizr-autorc$/,
        loader: "modernizr-auto-loader"
      }
    ]
  },
  resolve: {
    alias: {
      modernizr$: path.resolve(__dirname, ".modernizr-autorc")
    }
  }
}
```

### JS integration

Finally, require the configuration file (with a full relative path) somewhere in your source file (typically your entry point) or even simpler, just require 'modernizr'.

```javascript
// require config file with relative path (makes ESLint module/file resolvers happy)
require("relative/path/to/.modernizr-autorc");
// OR, require modernizr
require("modernizr"); // es5
```

Since Modernizr is a global, you can also test for features in your JS files, like this:

```javascript
if (!Modernizr.promises) {
    // ...
}
```

If you're using ESLint, make sure Modernizr is added as a global to prevent *no-undef* errors.

## Inspired by

This loader is inspired by [gulp-modernizr](https://github.com/doctyper/gulp-modernizr) and [modernizr-loader](https://github.com/peerigon/modernizr-loader).
