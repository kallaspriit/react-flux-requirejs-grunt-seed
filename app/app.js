// requirejs configuration
requirejs.config({
	// base url for all resources
	baseURl: '',

	// paths configuration of source directories and components
	paths: {
		// main directories
		src: 'src',
		lib: 'lib',
		config: 'config',
		components: 'components-build',

		// library directories
		logviking: 'lib/logviking',
		reactor: 'lib/reactor',

		// specific components
		jquery: 'lib/jquery/jquery-2.1.1.min',
		React: 'lib/react/react-with-addons',
		EventEmitter: 'lib/eventemitter/EventEmitter',
		Director: 'lib/director/director',

		// shortcuts
		logger: 'lib/logviking/Logger',
		intent: 'lib/reactor/Intent'
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
requirejs(['src/Application'], function(Application) {
	// register the app under window for easy inspection and debugging
	var app = window.app = new Application();

	app.bootstrap();
});