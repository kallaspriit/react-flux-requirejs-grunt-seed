// bootstrap the application
requirejs([
	'src/Application',
	'config',
	'stores',
	'routes',
	'activities'
], function(
	Application,
	config,
	stores,
	routes,
	activities
) {
	'use strict';

	// register the app under window for easy inspection and debugging
	var app = window.app = new Application(config, stores, routes, activities);

	app.init().bootstrap();
});