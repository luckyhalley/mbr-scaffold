/**
 * weppack dll 生成, 加快开发打包效率
 */
const { join } = require('path');
const defaults = require('lodash/defaultsDeep');
const webpack = require('webpack');
const pkg = require(join(process.cwd(), 'package.json'));
const pullAll = require('lodash/pullAll');
const uniq = require('lodash/uniq');

if (!pkg.dllPlugin) {
  process.exit(0);
}
const dllPlugin = {
  entry(pkg) {
    const dependencyNames = Object.keys(pkg.dependencies);
    const exclude =
      pkg.dllPlugin.exclude;
    const include =
      pkg.dllPlugin.include;
    const includeDependencies = uniq(dependencyNames.concat(include));
    return {
      deps: pullAll(includeDependencies, exclude),
    };
  }
}
const dllConfig = pkg.dllPlugin;
const outputPath = join(process.cwd(), dllConfig.path);

module.exports = require('./webpack.base.babel')({
  mode: 'development',
  context: process.cwd(),
  entry: dllPlugin.entry(pkg),
  optimization: {
    minimize: false,
  },
  devtool: 'eval',
  output: {
    filename: '[name].dll.js',
    path: outputPath,
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: join(outputPath, '[name].json'),
    }),
  ],
  performance: {
    hints: false,
  },
});
