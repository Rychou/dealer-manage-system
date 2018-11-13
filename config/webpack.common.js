const path = require('./path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const fs = require('fs');

module.exports = {
  entry: {
    app: path.appSrc,
  },

  output: {
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
    path: path.appDist,
    publicPath: '/', // 解决地址栏输入url报错BUG，另一种解决方案看 Line 87
  },

  resolve: {
    alias: {
      '@': require('path').resolve(fs.realpathSync(process.cwd()), 'src'),
      request: require('path').resolve(fs.realpathSync(process.cwd()), 'src/utils/request'),
      Common: require('path').resolve(fs.realpathSync(process.cwd()), 'src/Common'),
      utils: require('path').resolve(fs.realpathSync(process.cwd()), 'src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        include: path.appSrc,
        loader: 'babel-loader',
      },

      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(css)$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'fonts/[name].[hash].[ext]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.appPath,
      verbose: true,
    }),

    new HtmlWebpackPlugin({
      inject: false,
      template: HtmlWebpackTemplate,
      // baseHref: '/', // 相当于<base href="/">，为了解决直接输入'url'出现报错的Bug。参考：https://stackoverflow.com/questions/45133342/nested-react-router-4-routes-not-working-on-webpack-3?answertab=active#tab-top
      title: '经销商管理平台',
      appMountId: 'app',
      links: ['http://at.alicdn.com/t/font_881369_p7ak1sxfd9a.css'],
    }),
  ],

  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -20,
        },
      },
    },
  },
};
