const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    site: [path.resolve(__dirname, "./src/javascripts/entry.js")],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "clientlib-site/[name].js",
  },
  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.(js)$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader'
      // },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "file-loader",
            options: { name: "[name].html" },
          },
          "extract-loader",
          {
            loader: "html-loader",
            options: {
              sources: {
                list: [
                  {
                    tag: "img",
                    attribute: "src",
                    type: "src",
                  },
                  {
                    tag: "img",
                    attribute: "lazy-src",
                    type: "src",
                  },
                ],
              },
              esModule: false,
            },
          },
          {
            loader: "pug-html-loader",
            options: {
              pretty: true,
            },
          },
        ],
      },
      {
        test: /\.otf/,
        type: 'asset/resource'
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: (url, resourcePath, context) => {
                const relativePath = path.relative(context, resourcePath).replace("src", "");
                return `clientlib-site/${relativePath}`
              },
              publicPath: (url, resourcePath, context) => {
                const relativePath = path.relative(context, resourcePath).replace("src", "");
                return `clientlib-site/${relativePath}`
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    fallback: { url: false },
    extensions: [".js"],
  },
  plugins: [
  ],
};
