const path = require('path');

module.exports = {
  entry: {
    index: './src/pwa/index.js',
    about_service_worker: './src/pwa/print.js',
  },
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/pwa/dist/'),
    clean: true,
  },
};
