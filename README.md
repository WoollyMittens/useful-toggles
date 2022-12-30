# toggles.js: Collapsible Content

A collapsing "accordion" list to be used as an FAQ and a collection of content grouped together into tabs.

## How to include the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="./css/toggles-accordion.css"/>
<link rel="stylesheet" href="./css/toggles-tabs.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="lib/transitions.js"></script>
<script src="js/toggles.js"></script>
```

Or use [Require.js](https://requirejs.org/).

```js
requirejs([
	'lib/transitions.js',
	'js/toggles.js'
], function(transitions, Toggles) {
	...
});
```

Or import into an MVC framework.

```js
var transitions = require('lib/transitions.js');
var Toggles = require('js/toggles.js');
```

## How to start the script

### Using vanilla JavaScript

```javascript
var toggles = new Toggles({
	'elements' : document.querySelectorAll('dl.accordion'),
	'buttons' : 'dt',
	'classes' : {
		'active' : 'accordion_active',
		'passive' : 'accordion_passive',
		'open' : 'accordion_open',
		'closed' : 'accordion_closed'
	},
	'grouped' : false,
	'toggle' : true,
	'index' : -1
});
```

**elements : {DOM objects}** - A collection of DOM objects to be affected by the script.

**id : {string}** - The ID attribute of an element somewhere in the document.

**grouped : {boolean}** - Determines if opening one content area, causes the rest to close.

**toggle : {boolean}** - Determines if content areas can be closed as well as opened by the same button.

**index : {integer}** - Controls which toggle is active by default.

**auto : {integer}** (not implemented yet) - The interval in milliseconds of the automatic cycle.

**classes : {object}** - Collection of class names for the operation of the script.
+ *active : {string}* - The class name used to highlight toggle buttons.
+ *passive : {string}* - The class name used for the default state of the toggle buttons.
+ *open : {string}* - The class name that displays the content in an open state.
+ *closed' : {string}* - The class name that displays the content in a closed state.

## How to control the script

### Focus

```javascript
toggles.instances[number].focus(index);
```

Activates a specific toggle element.

**number : {integer}** - The instance number of the script.

**index : {integer}** - The index of the thumbnail to centre and highlight.

## How to build the script

This project uses node.js from http://nodejs.org/

This project uses gulp.js from http://gulpjs.com/

The following commands are available for development:
+ `npm install` - Installs the prerequisites.
+ `gulp import` - Re-imports libraries from supporting projects to `./src/libs/` if available under the same folder tree.
+ `gulp dev` - Builds the project for development purposes.
+ `gulp dist` - Builds the project for deployment purposes.
+ `gulp watch` - Continuously recompiles updated files during development sessions.
+ `gulp serve` - Serves the project on a temporary web server at http://localhost:8500/.
+ `gulp php` - Serves the project on a temporary php server at http://localhost:8500/.

## License

This work is licensed under a [MIT License](https://opensource.org/licenses/MIT). The latest version of this and other scripts by the same author can be found on [Github](https://github.com/WoollyMittens) and at [WoollyMittens.nl](https://www.woollymittens.nl/).
