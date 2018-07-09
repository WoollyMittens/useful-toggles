// extend the class
Toggles.prototype.Main = function (config, context) {

	// PROPERTIES

	this.config = config;
	this.context = context;

	// METHODS

	this.init = function () {
		// setup the context
		this.config.outlets = {};
		this.config.outlets.parent = this.config.element;
		this.config.index = this.config.index || 0;
		// setup the components
		this.automatic = new this.context.Automatic(this);
		this.buttons = new this.context.Buttons(this);
		this.articles = new this.context.Articles(this);
		// return the object
		return this;
	};

	this.update = function () {
		// update the components
		this.buttons.update();
		this.articles.update();
	};

	this.focus = function (index) {
		// activate the element
		this.buttons.change(index);
	};

	this.init();
};
