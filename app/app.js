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
		React: 'lib/react/react-with-addons'
	},

	// configuration of exports and dependencies
	shim: {
		jquery: {
			exports: '$'
		}
	}
});

// bootstrap the application
requirejs(['src/Application'], function(Application) {
	// register the app under window for easy inspection and debugging
	var app = window.app = new Application();

	app.bootstrap();
});