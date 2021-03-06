// extend the class
Toggles.prototype.Buttons = function (parent) {

	// PROPERTIES

	this.parent = parent;
	this.config = parent.config;

	// METHODS

	this.init = function () {
		// store the links in this group
		this.config.outlets.buttons = transitions.select(this.config.buttons, this.config.outlets.parent);
		// for each link
		for (var a = 0, b = this.config.outlets.buttons.length; a < b; a += 1) {
			// apply the default class name
			this.config.outlets.buttons[a].className += ' ' + this.config.classes.passive;
			// set the event handlers
			this.config.outlets.buttons[a].addEventListener('click', this.onClicked.bind(this, a), false);
		}
		// initial update
		this.update();
		// return the object
		return this;
	};

	this.onClicked = function (index, event) {
		// change the active index
		this.change(index);
		// cancel the click
		event.preventDefault();
	};

	this.change = function (index) {
		// update the index
		this.config.index = index;
		// redraw the parent
		this.parent.update();
	};

	this.update = function () {
		// formulate regular expressions for the class names
		var passive = new RegExp(this.config.classes.passive, 'gi');
		var active = new RegExp(this.config.classes.active, 'gi');
		// for each link
		for (var a = 0, b = this.config.outlets.buttons.length; a < b; a += 1) {
			// if this is the active index
			if (a === this.config.index) {
				// if toggling is allowed
				if (this.config.toggle) {
					// toggle the class name
					this.config.outlets.buttons[a].className = (this.config.outlets.buttons[a].className.match(active)) ?
						this.config.outlets.buttons[a].className.replace(active, this.config.classes.passive):
						this.config.outlets.buttons[a].className.replace(passive, this.config.classes.active);
				// else
				} else {
					// activate the link
					this.config.outlets.buttons[a].className = this.config.outlets.buttons[a].className.replace(passive, this.config.classes.active);
				}
			// else if grouping is allowed
			} else if (this.config.grouped) {
				// deactivate the link
				this.config.outlets.buttons[a].className = this.config.outlets.buttons[a].className.replace(active, this.config.classes.passive);
			}
		}
	};

	this.init();
};
