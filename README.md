# modernizr-auto-loader for webpack

This loader uses [Modernizr/customizr](https://github.com/Modernizr/customizr) to loop through all specified files, extracting references to modernizr classes/tests.

It outputs a module, loading your customized modernizr build.

## Installation

```
$ npm install --save-dev modernizr-auto-loader
```

## Usage

### .modernizr-autorc

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Create a `.modernizr-autorc` configuration file, preferably in your project root, and put your customizr config details in it, like this:

```javascript
// .modernizr-autorc
{
  foo: 'bar'
}
```

The default configuration which will be extended by your custom config is:
```javascript
// default config
{
  options: ['setClasses', 'addTest', 'html5printshiv', 'testProp', 'fnBind'],
  files: {
    src: ['**[^node_modules]/**/*.{js,css,scss}'],
  },
}
```

See the [Customizr documentation](https://modernizr.com/docs) for all available options.

As shown by the default config, **modernizr-auto-loader** crawls all *js/css/scss* files except files in *node_modules* (pattern `**[^node_modules]/**/*.{js,css,scss}`), so it's recommended to specify your own file patterns, to speed things up, or in worst case, have **customizr** abort due to too many open files.

```javascript
// .modernizr-autorc
// Makes customizr only traverse the assets folder, looking for js/jsx/css/scss files
{
  "files": {
    "src": [
      "assets/**/*.{js,jsx,css,scss}"
    ]
  }
}
```

### JS integration

Require the configuration somewhere in your source file (typically your entry point) to get a custom build of modernizr bundled with webpack.

```javascript
require("path/to/.modernizr-autorc");
```

You should also be able to import Modernizr as a module in your application:

```javascript
import Modernizr from 'modernizr';

if (!Modernizr.promises) {
    // ...
}
```

### webpack configuration

Adjust your webpack config to trigger **modernizr-auto-loader** on build.

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
      modernizr$: path.resolve(__dirname, "path/to/.modernizr-autorc")
    }
  }
}
```

## Inspired by

This loader is inspired by [gulp-modernizr](https://github.com/doctyper/gulp-modernizr) and [modernizr-loader](https://github.com/peerigon/modernizr-loader).
