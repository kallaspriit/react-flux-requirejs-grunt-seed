// requirejs configuration
requirejs.config({
	// base url for all resources
	baseURl: '',

	// paths configuration of source directories and components
	paths: {
		// main directories
		src: 'src',
		lib: 'lib',
		components: 'components-build',

		// library directories
		logviking: 'lib/logviking',

		// specific components
		jquery: 'lib/jquery/jquery-2.1.1.min',
		React: 'lib/react/react-with-addons',
		EventEmitter: 'lib/eventemitter/EventEmitter',
		Director: 'lib/director/director',
		AbstractActivity: 'lib/reactor/AbstractActivity',

		// shortcuts to singletons
		logger: 'lib/logviking/Logger',
		intent: 'lib/reactor/Intent',
		router: 'lib/reactor/Router',
		navi: 'lib/reactor/Navi',
		dispatcher: 'lib/reactor/Dispatcher',
		config: 'config/config',
		environment: 'config/environment'
	},

	// configuration of exports and dependencies
	shim: {
		jquery: {
			exports: '$'
		},
		Director: {
			exports: 'Router'
		}
	}
});

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