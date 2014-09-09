var fs = require('fs');
var nodePath = require('path');

function lastModifiedSync(path) {
    try {
        return fs.statSync(path).mtime.getTime();
    } catch(e) {
        return -1;
    }
}

module.exports = function(handlebars, path) {

    function compileFile(callback) {
        var src = fs.readFileSync(path, 'utf8');
        var compiledSrc = handlebars.precompile(src);
        return 'module.exports=' + compiledSrc;
    }

    path = nodePath.resolve(process.cwd(), path);

    var compiledOutputFilename = path + '.js';

    // See if the template has already been compiled and if it is up-to-date...


    var inFileLastModified = lastModifiedSync(path);
    var outFileLastModified = lastModifiedSync(compiledOutputFilename);

    if (inFileLastModified === -1) {
        throw new Error('Template not found at path "' + path + '"');
    } else if (outFileLastModified === -1 || inFileLastModified > outFileLastModified) {
        // The compiled template has not been saved to disk

        // We need to compile the file

        var compiled = compileFile(path);

        fs.writeFileSync(compiledOutputFilename, compiled, 'utf8');
    }

    return handlebars.default.template(require(compiledOutputFilename));
};
