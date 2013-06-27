/*
	Source:
	van Creij, Maurice (2012). "useful.toggles.js: Simple collapsible content", version 20120606, http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.

	Prerequisites:
	<script src="./js/useful.js"></script>
	<!--[if IE]>
		<script src="./js/html5.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>
	<![endif]-->
*/

(function (useful) {

	// invoke strict mode
	"use strict";

	// private functions
	var toggles = {};
	toggles = {
		// sets the initial toggle state
		setup : function (view, model) {
			// setup the parent
			model.outlets = {};
			model.outlets.parent = view;
			model.index = model.index || 0;
			// setup the components
			toggles.automatic.setup(model);
			toggles.buttons.setup(model);
			toggles.articles.setup(model);
		},
		update : function (model) {
			// update the parent
			// update the components
			toggles.buttons.update(model);
			toggles.articles.update(model);
		},
		automatic : {
			setup : function () {
				// set the event handlers for (un)pausing
				// start the interval
			},
			start : function () {
				// cancel any interval
				// resume the interval
			},
			pause : function () {
				// cancel any interval
			}
		},
		buttons : {
			setup : function (model) {
				// store the links in this group
				model.outlets.buttons = useful.css.select(model.buttons, model.outlets.parent);
				// for each link
				for (var a = 0, b = model.outlets.buttons.length; a < b; a += 1) {
					// apply the default class name
					model.outlets.buttons[a].className += ' ' + model.classes.passive;
					// set the event handlers
					toggles.buttons.events.clicked(model.outlets.buttons[a], a, model);
				}
				// initial update
				toggles.buttons.update(model);
			},
			events : {
				clicked : function (element, index, model) {
					useful.events.add(element, 'click', function (event) {
						toggles.buttons.change(event, index, model);
					});
				}
			},
			change : function (event, index, model) {
				// update the index
				model.index = index;
				// redraw the parent
				toggles.update(model);
				// cancel the click
				useful.events.cancel(event);
			},
			update : function (model) {
				// formulate regular expressions for the class names
				var passive = new RegExp(model.classes.passive, 'gi');
				var active = new RegExp(model.classes.active, 'gi');
				// for each link
				for (var a = 0, b = model.outlets.buttons.length; a < b; a += 1) {
					// if this is the active index
					if (a === model.index) {
						// if toggling is allowed
						if (model.toggle) {
							// toggle the class name
							model.outlets.buttons[a].className = (model.outlets.buttons[a].className.match(active)) ?
								model.outlets.buttons[a].className.replace(active, model.classes.passive) :
								model.outlets.buttons[a].className.replace(passive, model.classes.active);
						// else
						} else {
							// activate the link
							model.outlets.buttons[a].className = model.outlets.buttons[a].className.replace(passive, model.classes.active);
						}
					// else if grouping is allowed
					} else if (model.grouped) {
						// deactivate the link
						model.outlets.buttons[a].className = model.outlets.buttons[a].className.replace(active, model.classes.passive);
					}
				}
			}
		},
		articles : {
			setup : function (model) {
				// store the articles
				model.outlets.articles = [];
				// for all the links
				for (var a = 0, b = model.outlets.buttons.length; a < b; a += 1) {
					// if this link has a href and an #
					if (model.outlets.buttons[a].href && model.outlets.buttons[a].href.match('#')) {
						// store the referenced article
						model.outlets.articles[a] = document.getElementById(model.outlets.buttons[a].href.split('#')[1]);
					// else if this link is a button with a value
					} else if (model.outlets.buttons[a].value && model.outlets.buttons[a].value.match('#')) {
						// store the referenced article
						model.outlets.articles[a] = document.getElementById(model.outlets.buttons[a].value.split('#')[1]);
					// else
					} else {
						// store the next sibling as the article
						var target = model.outlets.buttons[a].nextSibling, tries = 0;
						while (target.nodeName.match(/#/) && tries < 50) {
							target = target.nextSibling;
							tries += 1;
						}
						model.outlets.articles[a] = target;
					}
					// apply the default class name
					model.outlets.articles[a].className += ' ' + model.classes.closed;
				}
				// initial update
				toggles.articles.update(model);
			},
			update : function (model) {
				// formulate regular expressions for the class names
				var active = new RegExp(model.classes.active, 'gi');
				// for each link
				for (var a = 0, b = model.outlets.buttons.length; a < b; a += 1) {
					// if the element is active
					if (model.outlets.buttons[a].className.match(active)) {
						// open its content section
						useful.css.setClass(model.outlets.articles[a], model.classes.closed, model.classes.open);
					// else
					} else {
						// close its content section
						useful.css.setClass(model.outlets.articles[a], model.classes.open, model.classes.closed);
					}
				}
			}
		}
	};

	// public functions
	useful.events = useful.events || {};
	useful.events.add = function (element, eventName, eventHandler) {
		// exceptions
		eventName = (navigator.userAgent.match(/Firefox/i) && eventName.match(/mousewheel/i)) ? 'DOMMouseScroll' : eventName;
		// prefered method
		if ('addEventListener' in element) {
			element.addEventListener(eventName, eventHandler, false);
		}
		// alternative method
		else if ('attachEvent' in element) {
			element.attachEvent('on' + eventName, function (event) { eventHandler(event); });
		}
		// desperate method
		else {
			element['on' + eventName] = eventHandler;
		}
	};
	useful.events.cancel = function (event) {
		if (event) {
			if (event.preventDefault) { event.preventDefault(); }
			else if (event.preventManipulation) { event.preventManipulation(); }
			else { event.returnValue = false; }
		}
	};

	useful.models = useful.models || {};
	useful.models.clone = function (model) {
		var clonedModel, ClonedModel;
		// if the method exists
		if (typeof(Object.create) !== 'undefined') {
			clonedModel = Object.create(model);
		}
		// else use a fall back
		else {
			ClonedModel = function () {};
			ClonedModel.prototype = model;
			clonedModel = new ClonedModel();
		}
		// return the clone
		return clonedModel;
	};
	useful.models.trim = function (string) {
		return string.replace(/^\s+|\s+$/g, '');
	};

	useful.css = useful.css || {};
	useful.css.select = function (input, parent) {
		var a, b, elements;
		// validate the input
		parent = parent || document;
		input = (typeof input === 'string') ? {'rule' : input, 'parent' : parent} : input;
		input.parent = input.parent || document;
		input.data = input.data || {};
		// use querySelectorAll to select elements, or defer to jQuery
		elements = (typeof(document.querySelectorAll) !== 'undefined') ?
			input.parent.querySelectorAll(input.rule) :
			(typeof(jQuery) !== 'undefined') ? jQuery(input.parent).find(input.rule).get() : [];
		// if there was a handler
		if (typeof(input.handler) !== 'undefined') {
			// for each element
			for (a = 0 , b = elements.length; a < b; a += 1) {
				// run the handler and pass a unique copy of the data (in case it's a model)
				input.handler(elements[a], useful.models.clone(input.data));
			}
		// else assume the function was called for a list of elements
		} else {
			// return the selected elements
			return elements;
		}
	};
	useful.css.compatibility = function () {
		var eventName, newDiv, empty;
		// create a test div
		newDiv = document.createElement('div');
		// use various tests for transition support
		if (typeof(newDiv.style.MozTransition) !== 'undefined') { eventName = 'transitionend'; }
		try { document.createEvent('OTransitionEvent'); eventName = 'oTransitionEnd'; } catch (e) { empty = null; }
		try { document.createEvent('WebKitTransitionEvent'); eventName = 'webkitTransitionEnd'; } catch (e) { empty = null; }
		try { document.createEvent('transitionEvent'); eventName = 'transitionend'; } catch (e) { empty = null; }
		// remove the test div
		newDiv = empty;
		// pass back working event name
		return eventName;
	};
	useful.css.setClass = function (element, removedClass, addedClass, endEventHandler, jQueryDuration, jQueryEasing) {
		var replaceThis, replaceWith, endEventName, endEventFunction;
		// validate the input
		endEventHandler = endEventHandler || function () {};
		endEventName = useful.css.compatibility();
		// turn the classnames into regular expressions
		replaceThis = new RegExp(useful.models.trim(removedClass).replace(/ {2,}/g, ' ').split(' ').join('|'), 'g');
		replaceWith = new RegExp(addedClass, 'g');
		// if CSS3 transitions are available
		if (typeof endEventName !== 'undefined') {
			// set the onComplete handler and immediately remove it afterwards
			element.addEventListener(endEventName, endEventFunction = function () {
				endEventHandler();
				element.removeEventListener(endEventName, endEventFunction, true);
			}, true);
			// replace the class name
			element.className = useful.models.trim(element.className.replace(replaceThis, '') + ' ' + addedClass).replace(/ {2,}/g, ' ');
		// else if jQuery UI is available
		} else if (typeof jQuery !== 'undefined' && typeof jQuery.ui !== 'undefined') {
			// retrieve any extra information for jQuery
			jQueryDuration = jQueryDuration || 500;
			jQueryEasing = jQueryEasing || 'swing';
			// use switchClass from jQuery UI to approximate CSS3 transitions
			jQuery(element).switchClass(removedClass.replace(replaceWith, ''), addedClass, jQueryDuration, jQueryEasing, endEventHandler);
		// if all else fails
		} else {
			// just replace the class name
			element.className = useful.models.trim(element.className.replace(replaceThis, '') + ' ' + addedClass).replace(/ {2,}/g, ' ');
			// and call the onComplete handler
			endEventHandler();
		}
	};

	useful.toggles = {};
	useful.toggles.setup = toggles.setup;

}(window.useful = window.useful || {}));
