module.exports = {
  context: __dirname + "/app",
  entry: {
    javascript: "./index.js",
    html: "./index.html"
  },
  output: {
    filename: "app.js",
    path: __dirname + "/build",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader?stage=0"],
      },
      {
        test: /\.jsx$/,
        loader: 'jsx'
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ],
  },
}
