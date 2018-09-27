const startIntervalUpdate = (theModule) => {
	if (theModule.config.updateInterval > 0) {
		window.console.log(`Starting Interval Updates: ${theModule.name}[${theModule.identifier}] every ${theModule.config.updateInterval} ms`);
		theModule.intervalId = setInterval(() => theModule.updateDom(), theModule.config.updateInterval);
	}
};

const stopIntervalUpdate = (theModule) => {
	const intervalId = theModule.intervalId;
	theModule.intervalId = null;
	if (intervalId) {
		clearInterval(intervalId);
		window.console.log(`Stopped Interval Updates: ${theModule.name}[${theModule.identifier}] every ${theModule.config.updateInterval} ms`);
	}
};

Module.register('MMM-Webview', {
	// Default module config.
	defaults: {
		updateInterval: 0,
		getURL: () => "http://magicmirror.builders/",
	},

	resume: function () {
		this.updateDom();
		startIntervalUpdate(this)
	},

	suspend: function () {
		stopIntervalUpdate(this);
	},

	start: function () {
		window.console.log(`Start: ${this.name}[${this.identifier}]`);
		this.updateDom();
		startIntervalUpdate(this);
	},
	stop: function () {
		window.console.log(`Stop: ${this.name}[${this.identifier}]`);
		stopIntervalUpdate(this)
	},

	getDom: function () {
		var webview = document.createElement("webview");
		webview.setAttribute('src', this.config.getURL());
		if (this.config.cssClassname) webview.className = this.config.cssClassname;
		window.console.log(`getDom: ${this.name}[${this.identifier}]  ${webview.outerHTML}`);
		return webview;
	},
});

