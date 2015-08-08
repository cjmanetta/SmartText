module.exports = {
  context: __dirname + "/app",
  entry: {
    javascript: "./public/javascripts/app.js",
  },
  output: {
    filename: "bundle.js",
    path: __dirname + "/app/public/javascripts/distribution",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      },
      {
        test: /\.jsx$/,
        loader: 'jsx'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  }
};

