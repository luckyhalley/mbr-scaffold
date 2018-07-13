/**
 * dev webpack配置
 */
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const webpack = require('webpack');
const logger = require('../../server/logger');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const pkg = require(path.resolve(process.cwd(), 'package.json'));
const { dllPlugin } = pkg;

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    inject: true,
    template: 'app/index.html',
  }),
  new CircularDependencyPlugin({
    exclude: /a\.js|node_modules/,
    failOnError: false,
  }),
];

/**
 * 用dllPlugin将不经常变更的dependencies依赖注入
 */
if (dllPlugin) {
  glob.sync(`${dllPlugin.path}/*.dll.js`).forEach(dllPath => {
    plugins.push(
      new AddAssetHtmlPlugin({
        filepath: dllPath,
        includeSourcemap: false,
      }),
    );
  });
}

module.exports = require('./webpack.base.babel')({
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(process.cwd(), 'app/app.js'),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  optimization: {
    minimize: false,
  },
  plugins: dependencyHandlers().concat(plugins),
  devtool: 'eval-source-map',
  performance: {
    hints: false,
  },
});

/**
 * 开发环境dllPlugin依赖处理
 */
function dependencyHandlers() {
  if (process.env.BUILDING_DLL) {
    return [];
  }
  // package.json 不存在 dllPlugin
  if (!dllPlugin) {
    return [];
  }

  const dllPath = path.resolve(
    process.cwd(),
    dllPlugin.path,
  );

  /**
   * package.json 存在 dllPlugin
   * 检查 dllManifests
   */
  if (!dllPlugin.dlls) {
    const manifestPath = path.resolve(dllPath, 'deps.json');

    if (!fs.existsSync(manifestPath)) {
      logger.error(
        'dll发生变化，先运行`npm run build:dll`',
      );
      process.exit(0);
    }
    return [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(manifestPath),
      }),
    ];
  }
  const dllManifests = Object.keys(dllPlugin.dlls).map(name =>
    path.join(dllPath, `/${name}.json`),
  );

  return dllManifests.map(manifestPath => {
    if (!fs.existsSync(path)) {
      if (!fs.existsSync(manifestPath)) {
        logger.error('先运行`npm run build:dll`');
        process.exit(0);
      }
    }
    return new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(manifestPath),
    });
  });
}
