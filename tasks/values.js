function betterName(name) {
  return name.match(/[A-Za-z0-9]+/g).map(function(s) {
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
  }).join('');
}

function value(isConstant, key, val) {
  var content = '.' + (isConstant ? 'constant' : 'value');
  content += '(' + JSON.stringify(betterName(key)) + ',';
  content += JSON.stringify(val) + ')';
  return content;
}

function isObject(what) {
  return Object.prototype.toString.call(what) === '[object Object]';
}

function isString(what) {
  return Object.prototype.toString.call(what) === '[object String]';
}

function isFunction(what) {
  return Object.prototype.toString.call(what) === '[object Function]';
}

function values(grunt) {

  function fatal() {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    grunt.fail.fatal.apply(undefined, arguments);
  }

  grunt.registerMultiTask(
    'values',
    'Generate Angular.js values',
    function() {

    var files    = this.files;
    var options  = this.options();
    var target   = this.target;

    var optFiles = options.files || {};
    var isYAML   = /\.ya?ml$/i;
    var isJSON   = /\.json$/i;

    if (!isObject(optFiles)) fatal('options.files is not an object.');
    if (isString(options.module)) target = options.module;

    var isConstant = !!options.constant;

    for (var i = 0; i < files.length; i++) {
      var dest = files[i].dest;
      grunt.log.write('Writing to ' + dest.cyan + ' ... ');

      var content = ';' + target;
      for (var j = 0; j < files[i].src.length; j++) {
        var src = files[i].src[j];
        var data;
        if (isYAML.test(src)) {
          data = grunt.file.readYAML(src);
        } else {
          data = grunt.file.read(src);
        }
        if (isJSON.test(src)) {
          data = JSON.parse(data);
        }
        content += value(isConstant, src, data);
      }

      var optSrcs = optFiles[dest] || {};
      if (!isObject(optSrcs)) fatal('options.files[' + JSON.stringify(dest) +
        '] is not an object.');

      for (var optSrc in optSrcs) {
        var data = optSrcs[optSrc];
        if (isFunction(data)) data = data();
        content += value(isConstant, optSrc, data);
      }

      content += ';';
      grunt.file.write(dest, content);
      grunt.log.ok();
    }

  });

};

module.exports = values;
