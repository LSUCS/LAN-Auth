var _ = require("lodash");

function store(out, path, val) {
  var finalPath = path.slice(0);
  if (val) {
    finalPath.push(val);
  }
  var key = finalPath.join("_");
  out[key] = key;
}

function processTree(out, tree, path) {
  if (tree instanceof Array) {
    store(out, path);
    _.each(tree, function (val) {
      store(out, path, val);
    });
  } else if (tree instanceof Object) {
    _.each(tree, function (subTree, key) {
      var newPath = path.slice(0);
      newPath.push(key);
      processTree(out, subTree, newPath);
    });
  } else {
    store(out, path, tree);
  }
}

function flattenConstants(constants) {
  var out = {};
  processTree(out, constants, []);
  return out;
}

module.exports = flattenConstants;