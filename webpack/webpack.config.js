var path = require('path');
var webpack = require('webpack');

// This plugin gets useful information from webpack and stores
// it in a json file. It will help webpack talk with Django.
var BundleTracker = require('webpack-bundle-tracker');

const basePath = path.resolve(__dirname, '../src/client');

module.exports = {
  context: basePath,

  entry: './index.js',

  output: {
    path: path.join(basePath, 'build'),
    //filename: 'bundle.js'
    filename: '[name]-[hash].js'
  },

  plugins: [
    // tells webpack where to store data about your bundles
    new BundleTracker({filename: './webpack-stats.json'}),

    // makes jQuery available in every module
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],

  module: {
    loaders: [
      {
        // regexp that tells webpack to use the following loaders
        // on all .js and .jsx files
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          // specify that we will be dealing with React code
          presets: ['react']
        }
      }
    ]
  },

  resolve: {
    // tells webpack where to look for modules
    modules: ['node_modules'],

    // extensions that should be used to resolve modules
    extensions: ['.js', '.jsx']
  }

}