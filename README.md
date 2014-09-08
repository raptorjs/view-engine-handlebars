view-engine-handlebars
==================
Handlebars [view engine](https://github.com/patrick-steele-idem/view-engine)

# Installation

```
npm install view-engine-handlebars --save
```

# Usage

Enable the Handlebars view engine:
```javascript
require('view-engine').configure({
    engines: {
        'view-engine-handlebars': {
            extensions: ['hbs']
        }
    }
})
```

The Handlebars view engine is now ready to be used elsewhere in your code (either client-side or server-side):

```javascript
var templatePath = require.resolve('./hello.hbs');
var template = require('view-engine').load(templatePath);

// Callback-style
template.render({ name: 'John'}, function(err, data) {
    if (err) {
        console.log('Failed to render: ' + err);
        return;
    }

    console.log('Output: ' + data);
});

// Streaming-style
var out = require('fs').createOutputStream('hello.out', {encoding: 'utf8'});
template.stream({ name: 'John'}).pipe(out);

// Render to an existing render context
template.render({ name: 'John'}, context);
```

See the documentation for the [view-engine](https://github.com/patrick-steele-idem/view-engine) module for more information.
