// 生产环境不需要build
  if (process.env.NODE_ENV === 'production') {
    process.exit(0);
  }
  
  require('shelljs/global');
  
  const path = require('path');
  const fs = require('fs');
  const exists = fs.existsSync;
  const writeFile = fs.writeFileSync;
  
  const defaults = require('lodash/defaultsDeep');
  const pkg = require(path.join(process.cwd(), 'package.json'));
  const dllConfig = defaults(pkg.dllPlugin);
  const outputPath = path.join(process.cwd(), dllConfig.path);
  const dllManifestPath = path.join(outputPath, 'package.json');
  
  mkdir('-p', outputPath);
  
  echo('构建 Webpack DLL...');
  
  if (!exists(dllManifestPath)) {
    writeFile(
      dllManifestPath,
      JSON.stringify(
        defaults({
          name: 'dlls',
          private: true,
          author: pkg.author,
          repository: pkg.repository,
          version: pkg.version,
        }),
        null,
        2,
      ),
      'utf8',
    );
  }
  
  exec(
    'cross-env BUILDING_DLL=true webpack --display-chunks --color --config internals/webpack/webpack.dll.babel.js --hide-modules',
  );
  