'use strict';

const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

module.exports = {
  mode: 'production',
  devtool: false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
    globalObject: 'this',
  },
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      modulox: path.resolve('./node_modules/@javascriptfox/modulox'),
    },
  },
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        oneOf: [
          {
            test: /\.(js|mjs|jsx)$/,
            include: path.resolve(__dirname, 'src'),
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides'
              ),
              plugins: [
                [
                  require.resolve('babel-plugin-named-asset-import'),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent:
                          '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                      },
                    },
                  },
                ],
              ],
              cacheDirectory: true,
              cacheCompression: false,
              compact: true,
            },
          },
          {
            test: /\.(js|mjs|jsx)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: true,
              configFile: false,
              compact: false,
              presets: [
                [
                  require.resolve('babel-preset-react-app/dependencies'),
                  { helpers: true },
                ],
              ],
              cacheDirectory: true,
              cacheCompression: false,
              sourceMaps: false,
              inputSourceMap: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [new CompressionPlugin()],
  node: {
    fs: 'empty',
  },
  externals: {
    react: 'commonjs react',
  },
};
