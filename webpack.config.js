var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'sourcemap',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', // WebpackDevServer 
    './app/entry.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      foundation: 'foundation-sites/js/foundation.core'
    }
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  module: {
    loaders: [
      { test: path.join(__dirname, 'app'), loaders: ['react-hot', 'babel-loader'], exclude: /(node_modules|bower_components)/ },
      // { test: require.resolve("jquery"), loader: "expose?$!expose?jQuery" }
      { test: /jquery\.js$/, loader: 'expose?$' },
      { test: /jquery\.js$/, loader: 'expose?jQuery' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.scss$/, loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap'] },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url?file-loader?limit=10000!img?progressive=true' },
      // {
      //   test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
      //   loader: 'url?limit=10000&mimetype=application/font-woff'
      // },
      // {
      //   test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
      //   loader: 'url?limit=10000&mimetype=application/octet-stream'
      // },
      // {
      //   test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
      //   loader: 'file'
      // },
      // {
      //   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
      //   loader: 'url?limit=10000&mimetype=image/svg+xml'
      // }


    ],
    preLoaders: [
      { test: /\jsx?$/, loader: 'eslint-loader', exclude: /node_modules/ }
    ]
  },
  // For browser support
  postcss: function (webpack) {
    return [
      autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']})
    ];
  },
  // For use of relative paths in the browser
  sassLoader: {
    includePaths: [path.resolve(__dirname, 'node_modules')]
  }

};
