// extend the class
Toggles.prototype.Automatic = function (parent) {

	// PROPERTIES

	this.parent = parent;
	this.config = parent.config;

	// METHODS

	this.init = function () {
		// set the event handlers for (un)pausing
		// start the interval
		// return the object
		return this;
	};

	this.start = function () {
		// cancel any interval
		// resume the interval
	};

	this.pause = function () {
		// cancel any interval
	};

	this.init();
};
