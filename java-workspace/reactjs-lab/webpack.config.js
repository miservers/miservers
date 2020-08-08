const webpack = require("webpack");
const path = require("path");

let config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./bundle.js"
  },
  
  module: {
    rules: [
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true,
            },
          },
        ],
      },
      
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules',
        include: /flexboxgrid/
      },
      
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          }, 
          {
            loader: 'css-loader', // translates CSS into CommonJS
          }, 
          {
            loader: 'less-loader', // compiles Less to CSS
           },
         ],
     },
   ], 
  },   
}

module.exports = config;

