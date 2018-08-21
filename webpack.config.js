const path = require('path');
const webpack = require('webpack');

// const glob = require('glob');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');

const DEFAULT_NODE_ENV = 'production';
const NODE_ENV = (process.env.NODE_ENV || DEFAULT_NODE_ENV).trim();
const mode = NODE_ENV === 'development' ? 'development' : DEFAULT_NODE_ENV;
const isProd = mode === 'production';
const isDev = !isProd;

let entry = {
  main: [
    './src/index.js',
    './src/about.js'
  ],
  // css: [
  //   glob.sync("./src/**/*.css")
  // ]
};

// let externals = {
//   'react': 'React',
//   'react-dom': 'ReactDOM',
// };

let output = {
  path: path.join(__dirname, 'dist', 'public'),
  filename: '[name].[contenthash].js',
  chunkFilename: '[name].[contenthash].js',
  hashDigestLength: 5, // default 20
  publicPath: '/'
};

let resolve = {
  modules: [
    path.join(__dirname, 'src'),
    'node_modules'
  ],
  extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.coffee', '.csx']
};

let plugins = [
  new CleanWebpackPlugin(['dist']),
  new webpack.WatchIgnorePlugin([
    path.join(__dirname, 'node_modules')
  ]),
  new webpack.NamedModulesPlugin(),
  new webpack.HashedModuleIdsPlugin(),
  // new webpack.DefinePlugin({
  //   'NODE_ENV': JSON.stringify(NODE_ENV),
  //   'process.env': {
  //     'NODE_ENV': JSON.stringify(NODE_ENV)
  //   }
  // }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "[name].[contenthash].css",
    chunkFilename: "[id].css"
  }),
  new HtmlWebpackPlugin({
    inject: true,
    hash: true,
    template: './src/index.html',
    filename: 'index.html',
    chunksSortMode: 'dependency',
    minify: {
      collapseWhitespace : false
    }
  }),
  new ManifestPlugin(),
];

let webpackConfigModule = {
  rules: [
    {
      test: /\.js$/,
      use: [{
          loader: 'babel-loader'
      }],
      exclude: [/node_modules/, /dist/]
    },

    {
      test: /\.css$/,
      exclude: [/build/],
      use: isDev
        ? [
            { loader: 'style-loader' },
            // { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            { loader: 'postcss-loader' }
        ]: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' }
        ]
    },

    {
      test: /\.(jpe?g|png|gif|svg)$/,
      loader: 'image-webpack-loader',
      // This will apply the loader before the other ones
      enforce: 'pre',
    },

    {
      test: /\.(jpe?g|png|gif)$/,
      loader: 'url-loader',
      options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024,
      },
    },

    {
      test: /\.svg$/,
      loader: 'svg-url-loader',
      options: {
        // Inline files smaller than 10 kB (10240 bytes)
        limit: 10 * 1024,
        // Remove the quotes from the url
        // (they’re unnecessary in most cases)
        noquotes: true,
        iesafe: true
      },
    },
  ]
};

let optimization = {
  minimize: isProd,
  nodeEnv: NODE_ENV,
  concatenateModules: isProd,
  runtimeChunk: true,
  noEmitOnErrors: true,
  splitChunks: {
      chunks: 'all'
  }
};

let watch = isDev;

// let devtool = isProd ? 'source-map' : 'cheap-module-eval-source-map';
let devtool = 'source-map';

let devServer = {
  host: 'localhost',
  port: '9000',
  contentBase: [
      path.resolve(__dirname, 'dist', 'public')
  ],
  // hot: true,
  historyApiFallback: true,
  overlay: true
}

function webpackConfig(env, argv) {
  return {
    mode,
    entry,
    // externals,
    output,
    resolve,
    module: webpackConfigModule,
    plugins,
    watch,
    devtool,
    optimization,
    devServer
  }
}

module.exports = [ webpackConfig ];
