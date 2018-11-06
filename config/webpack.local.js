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
          'http://mock.eolinker.com/uNrvt624c0a75c8cb56b26bfca28ef23c58432f49216be5?uri=',
        ),
        AMAP_KEY: JSON.stringify('e15e343ed5f952efd7899005dc60900f'),
        AMAP_STYLE: JSON.stringify('amap://styles/47cf2cc474c7ad6c92072f0b267adff0?isPublic=true'),
      },
    }),
  ],
});
