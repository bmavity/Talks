var extensions = module.constructor._extensions;

extensions['.ass'] = function(module, filename) {
  var content = require('fs').readFileSync(filename, 'utf8');
  module._compile(content, filename);
};

require('./testdat');
