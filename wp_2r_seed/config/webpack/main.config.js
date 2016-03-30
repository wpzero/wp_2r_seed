var path = require('path');
var webpack = require('webpack');
const ROOT = path.join(__dirname, './../../');
var config = module.exports = {
  // the base path which will be used to resolve entry points
  context: ROOT,
  // the main entry point for our application's frontend JS
  entry: {
    entry_1: path.join(ROOT, './app/frontend/javascripts/entry_1.js'),
    entry_2: path.join(ROOT, './app/frontend/javascripts/entry_2.js')
  }
};

config.output = {
  // this is our app/assets/javascripts directory, which is part of the Sprockets pipeline
  path: path.join(ROOT, 'app', 'assets', 'javascripts'),
  // the filename of the compiled bundle, e.g. app/assets/javascripts/bundle.js
  filename: "[name]-bundle.js",
  // if the webpack code-splitting feature is enabled, this is the path it'll use to download bundles
  publicPath: '/assets'
};


config.resolve = {
  // tell webpack which extensions to auto search when it resolves modules. With this,
  // you'll be able to do `require('./utils')` instead of `require('./utils.js')`
  extensions: ['', '.js'],
  // by default, webpack will search in `web_modules` and `node_modules`. Because we're using
  // Bower, we want it to look in there too
  modulesDirectories: [ 'node_modules', 'bower_components' ],
}

config.plugins = [
  // we need this plugin to teach webpack how to find module entry points for bower files,
  // as these may not have a package.json file
  new webpack.ResolverPlugin([
    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
  ]),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  }),
  // 公共的部分
  // new webpack.optimize.CommonsChunkPlugin('common-bundle.js')
];

config.module = {
  loaders: [
      // es6
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {test: /\.css$/, loader: 'style!css!'},
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
}