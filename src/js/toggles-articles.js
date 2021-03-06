// extend the class
Toggles.prototype.Articles = function (parent) {

	// PROPERTIES

	this.parent = parent;
	this.config = parent.config;

	// METHODS

	this.init = function () {
		// store the articles
		this.config.outlets.articles = [];
		// for all the links
		for (var a = 0, b = this.config.outlets.buttons.length; a < b; a += 1) {
			// if this link has a href and an #
			if (this.config.outlets.buttons[a].href && this.config.outlets.buttons[a].href.match('#')) {
				// store the referenced article
				this.config.outlets.articles[a] = document.getElementById(this.config.outlets.buttons[a].href.split('#')[1]);
			// else if this link is a button with a value
			} else if (this.config.outlets.buttons[a].value && this.config.outlets.buttons[a].value.match('#')) {
				// store the referenced article
				this.config.outlets.articles[a] = document.getElementById(this.config.outlets.buttons[a].value.split('#')[1]);
			// else
			} else {
				// store the next sibling as the article
				var target = this.config.outlets.buttons[a].nextSibling, tries = 0;
				while (target.nodeName.match(/#/) && tries < 50) {
					target = target.nextSibling;
					tries += 1;
				}
				this.config.outlets.articles[a] = target;
			}
			// apply the default class name
			this.config.outlets.articles[a].className += ' ' + this.config.classes.closed;
		}
		// initial update
		this.update();
		// return the object
		return this;
	};

	this.update = function () {
		// formulate regular expressions for the class names
		var active = new RegExp(this.config.classes.active, 'gi');
		// for each link
		for (var a = 0, b = this.config.outlets.buttons.length; a < b; a += 1) {
			// if the element is active
			if (this.config.outlets.buttons[a].className.match(active)) {
				// open its content section
				transitions.byClass(this.config.outlets.articles[a], this.config.classes.closed, this.config.classes.open);
			// else
			} else {
				// close its content section
				transitions.byClass(this.config.outlets.articles[a], this.config.classes.open, this.config.classes.closed);
			}
		}
	};

	this.init();
};
