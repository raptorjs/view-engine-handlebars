var req = require;
var loader = require('./loader');

// dust.debugLevel = 'DEBUG';

module.exports = function createEngine(config, viewEngine) {
    var handlebars = config.handlebars || req('handlebars');
    config.handlebars = handlebars;

    return {
        context: function(templateFunc, templateData, context) {
            if (!templateData) {
                templateData = {};
            }

            var html = templateFunc(templateData);
            context.write(html);
        },
        buildTemplateData: function(path, templateData, context) {
            templateData.stream = context.stream;
            templateData.templatePath = path;
            return templateData;
        },
        load: function(path) {
            return loader(handlebars, path);
        }
    };
};
