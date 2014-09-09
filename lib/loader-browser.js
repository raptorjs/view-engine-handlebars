module.exports = function(handlebars, path) {
    if (!handlebars) {
        handlebars = window.Handlebars;
    }

    if (handlebars.default) {
        handlebars = handlebars.default;
    }

    var templateFunc = handlebars.template(require(path));
    return templateFunc;
};
