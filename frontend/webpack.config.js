const Dotenv = require('dotenv-webpack');

module.exports = {
  // other configuration settings...
   plugins: [
    new Dotenv()
  ],
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "fs": false
    }
  }
};

