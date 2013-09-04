# useful.toggles.js: Collapsible Content

A collapsing "accordion" list to be used as an FAQ and a collection of content grouped together into tabs.

Try the <a href="http://www.woollymittens.nl/useful/default.php?url=toggles">demo</a>.

## How to use the script

The stylesheet is best included in the header of the document.

```html
<link rel="stylesheet" href="./css/tabs.css"/>
```

and / or

```html
<link rel="stylesheet" href="./css/accordion.css"/>
```

This include can be added to the header or placed inline before the script is invoked.

```html
<script src="./js/toggles.min.js"></script>
```

To enable the use of HTML5 tags in Internet Explorer 8 and lower, include *html5.js*. To provide an alternative for *document.querySelectorAll* in Internet Explorer 8 and lower, include *jQuery*. To enable CSS3 transition animations in Internet Explorer 9 and lower, include *jQuery UI* as well.

```html
<!--[if lte IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>
<![endif]-->
```

### Using vanilla JavaScript

This is the safest way of starting the script, but allows for only one target element at a time.

```javascript
var toggles = new useful.Toggles( document.getElementById('id'), {
	'buttons' : 'dt',
	'classes' : {
		'active' : 'accordion_active',
		'passive' : 'accordion_passive',
		'open' : 'accordion_open',
		'closed' : 'accordion_closed'
	},
	'grouped' : false,
	'toggle' : true,
	'index' : -1,
	'auto' : 8000
});
toggles.start();
```

**id : {string}** - The ID attribute of an element somewhere in the document.

**parent : {DOM node}** - The DOM element around which the functionality is centred.

**links : {string}** - A CSS Rule that describes the toggle buttons within *parent*.

**grouped : {boolean}** - Determines if opening one content area, causes the rest to close.

**toggle : {boolean}** - Determines if content areas can be closed as well as opened by the same button.

**index : {integer}** - Controls which toggle is active by default.

**auto : {integer}** (not implemented yet) - The interval in milliseconds of the automatic cycle.

**active : {string}** - The class name used to highlight toggle buttons.

**passive : {string}** - The class name used for the default state of the toggle buttons.

**open : {string}** - The class name that displays the content in an open state.

**closed' : {string}** - The class name that displays the content in a closed state.

### Using document.querySelectorAll

This method allows CSS Rules to be used to apply the script to one or more nodes at the same time.

```javascript
var toggleInstances = new useful.Instances(
	document.querySelectorAll('dl.accordion'),
	useful.Toggles,
	{
		'buttons' : 'dt',
		'classes' : {
			'active' : 'accordion_active',
			'passive' : 'accordion_passive',
			'open' : 'accordion_open',
			'closed' : 'accordion_closed'
		},
		'grouped' : false,
		'toggle' : true,
		'index' : -1,
		'auto' : 8000
	}
);
toggleInstances.wait();
```

**rule : {string}** - The CSS Rule for the intended target(s) of the script.

**handler : {function}** - The public function that starts the script.

**data : {object}** - Name-value pairs with configuration data.

### Using jQuery

This method is similar to the previous one, but uses jQuery for processing the CSS rule.

```javascript
var toggleInstances = [];
$('input.color').each(function (index, element) {
	toggleInstances[index] = new useful.Toggles( element, {
		'buttons' : 'dt',
		'classes' : {
			'active' : 'accordion_active',
			'passive' : 'accordion_passive',
			'open' : 'accordion_open',
			'closed' : 'accordion_closed'
		},
		'grouped' : false,
		'toggle' : true,
		'index' : -1,
		'auto' : 8000
	});
	toggleInstances[index].start();
});
```

## How to control the script

### Focus

```javascript
toggles.focus(index);
```

Activates a specific toggle element.

**index : {integer}** - The index of the thumbnail to centre and highlight.

## Prerequisites

To concatenate and minify the script yourself, the following prerequisites are required:
+ https://github.com/WoollyMittens/useful-transitions
+ https://github.com/WoollyMittens/useful-interactions
+ https://github.com/WoollyMittens/useful-polyfills

## License
This work is licensed under a Creative Commons Attribution 3.0 Unported License. The latest version of this and other scripts by the same author can be found at http://www.woollymittens.nl/
