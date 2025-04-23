const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './worker.js',  // 修改为正确的入口文件路径
  output: {
    filename: 'worker.js',
    path: path.join(__dirname, 'dist'),
  },
  target: 'webworker',
  mode: 'production',
  resolve: {
    fallback: {
      "zlib": require.resolve("browserify-zlib"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert/"),
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ]
}; 