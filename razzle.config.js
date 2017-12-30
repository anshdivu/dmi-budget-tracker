const ExtractTextPlugin = require('extract-text-webpack-plugin');
const razzleHeroku = require('razzle-heroku');

module.exports = {
  modify: (config, {target, dev}, webpack) => {
    return razzleHeroku(config, {target, dev}, webpack);
  },

  compileSass: (config, {target, dev}, webpack) => {
    if (target === 'web') {
      const extractSass = new ExtractTextPlugin({
        filename: '[name].[contenthash].css',
        disable: process.env.NODE_ENV === 'development'
      });

      const cssLoader = {
        loader: 'css-loader',
        options: {
          minimize: !dev,
          sourceMap: dev,
          importLoaders: 1
        }
      };

      const sassLoader = {
        loader: 'sass-loader',
        options: {
          sourceMap: dev
        }
      };

      if (dev) {
        // For development, include source map
        config.module.rules.push({
          test: /.scss$/,
          use: ['style-loader', cssLoader, sassLoader]
        });
      } else {
        // For production, extract CSS
        config.module.rules.push({
          test: /.scss$/,
          use: extractSass.extract({
            fallback: 'style-loader',
            use: [cssLoader, sassLoader]
          })
        });
        config.plugins.push(extractSass);
      }
    } else {
      config.module.rules.push({
        test: /.scss$/,
        use: ['ignore-loader']
      });
    }

    return config;
  }
};
