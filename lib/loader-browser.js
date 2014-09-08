module.exports = function(handlebars, path) {
    if (!handlebars) {
        handlebars = window.Handlebars;
    }

    var templateFunc = handlebars.template(require(path));
    return templateFunc;
};
