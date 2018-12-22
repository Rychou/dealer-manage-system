const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('./path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'eval-source-map',

  devServer: {
    contentBase: path.appDist,
    historyApiFallback: true,
    hot: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热替换插件
    new webpack.DefinePlugin({
      'process.env': {
        BASE_URL: JSON.stringify(
          // 'http://mock.eolinker.com/Ki7sKHi5e8bf534512472244102647e6e5dbd900d64b53b?uri=',
          'http://192.168.1.17:8080',
        ),
      },
    }),
  ],
});
