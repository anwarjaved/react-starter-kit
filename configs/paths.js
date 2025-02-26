const path = require("path");
const fs = require("fs");

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

function CheckSourceFileExist(fileName) {
  var fileAbsolutePath = resolveApp(path.join("src", fileName + ".tsx"));
  return fs.existsSync(fileAbsolutePath);
}

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.

// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders

// We will export `nodePaths` as an array of absolute paths.
// It will then be used by Webpack configs.
// Jest doesn’t need this because it already handles `NODE_PATH` out of the box.

// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.
// https://github.com/facebookincubator/create-react-app/issues/1023#issuecomment-265344421

var nodePaths = (process.env.NODE_PATH || "")
  .split(process.platform === "win32" ? ";" : ":")
  .filter(Boolean)
  .filter((folder) => !path.isAbsolute(folder))
  .map(resolveApp);

// config after eject: we're in ./config/
module.exports = {
  appBuild: resolveApp("dist"),
  appPublic: resolveApp("static"),
  appHtml: resolveApp("static/index.html"),
  tsConfig: resolveApp("tsconfig.json"),
  appIndexJs: resolveApp("src/Main"),
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp("src"),
  //yarnLockFile: resolveApp('yarn.lock'),
  //testsSetup: resolveApp('src/setupTests.js'),
  //appNodeModules: resolveApp('node_modules'),
  ownNodeModules: resolveApp("node_modules"),
  nodePaths: nodePaths,
  resolveApp: resolveApp,
  CheckSourceFileExist: CheckSourceFileExist,
};
