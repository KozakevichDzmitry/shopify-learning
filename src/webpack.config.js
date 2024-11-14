const path = require('path');
const webpack = require('webpack');

// include the js minification plugin
const TerserPlugin = require('terser-webpack-plugin');
// include the css extraction and minification plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");


const entryPoints = {
  'header': './js/header',
  'mission': './styles/mission.scss',
};

module.exports = (env, argv) => {

  const isDev = argv.mode === 'development'

  return {
    mode: isDev? 'development' : "production",
    entry: entryPoints,
    output: {
      filename: '../assets/[name].js',
      path: path.resolve(__dirname)
    },
    performance: {
      hints: false,
      maxEntrypointSize: 1024,
      maxAssetSize: 1024
    },
    module: {
      rules: [
        // perform js babelization on all .js files
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          }
        },
        // compile all .scss files to plain old css
        {
          test: /\.(sass|scss)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', {
            loader: "sass-loader",
            options: {
              api: "modern-compiler",
            },
          },]
        },
        {
          test: /\.(woff(2)?|ttf|eot)$/,
          type: 'asset/resource',
          generator: {
            filename: '../assets/fonts/[name][ext]',
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: '../assets/images/[name][ext]'
          }
        }
      ]
    },
    plugins: [
      // extract css into dedicated file
      new MiniCssExtractPlugin({
        filename: '../assets/[name].css'
      }),
      isDev && new BrowserSyncPlugin(
          {
            open: true,
            proxy: 'http://127.0.0.1:9292',
          },
          // Prevent BrowserSync from reloading the page and let Webpack take care of this
          {
            reload: true,
          },
      ),
    ],
    optimization: {
      minimize: !isDev,
      minimizer: [
        // enable the js minification plugin
        !isDev && new TerserPlugin ({
          parallel: true
        }),
        // enable the css minification plugin
        !isDev && new CssMinimizerPlugin()
      ]
    }
  };
}

