define([
	'React',
	'logviking/ConsoleLog',
	'logviking/SocketLog',
	'stores',
	'config',
	'routes',
	'logger',
	'router',
	'navi',
	'intent',
	'components/RootComponent'
], function(
	React,
	ConsoleLog,
	SocketLog,
	stores,
	config,
	routes,
	logger,
	router,
	navi,
	intent,
	RootComponent
) {
	'use strict';
	
	var log = logger.get('Application');

	/**
	 * Application bootstrapper.
	 *
	 * @constructor
	 */
	var Application = function() {
		/* @type Router */
		this.router = router;

		/* @type Navi */
		this.navi = navi;

		/* @type Intent */
		this.intent = intent;
	};

	/**
	 * Bootstraps the application
	 */
	Application.prototype.bootstrap = function() {
		log.info('bootstrap');

		this._setupLogger();
		this._setupDummyData();
		this._setupRouter();
		this._setupRootComponent();
	};

	/**
	 * Sets up the logger.
	 *
	 * @private
	 */
	Application.prototype._setupLogger = function() {
		if (config.debug) {
			logger.addReporters(
				new ConsoleLog(),
				new SocketLog('localhost', 2222)
			);
		} else {
			logger.disable();
		}
	};

	/**
	 * Sets up stores dummy data.
	 *
	 * @private
	 */
	Application.prototype._setupDummyData = function() {
		stores.todo.addTodoItem({ text: 'first item ', isDone: true });
		stores.todo.addTodoItem({ text: 'second item ' });
		stores.todo.addTodoItem({ text: 'third item ' });
	};

	/**
	 * Sets up the router.
	 *
	 * @private
	 */
	Application.prototype._setupRouter = function() {
		this.router.on(this.router.Event.ROUTE_MATCHED, this._handleRouteMatched.bind(this));
		this.router.on(this.router.Event.URL_NOT_MATCHED, this._handleUrlNotMatched.bind(this));

		this.router.init(routes, config.router);
	};

	/**
	 * Sets up the application root component.
	 *
	 * @private
	 */
	Application.prototype._setupRootComponent = function() {
		React.renderComponent(
			new RootComponent(null),
			document.getElementById('application-wrap')
		);
	};

	/**
	 * Handles router matched route.
	 *
	 * @param {string} routeName Name of the matched route
	 * @param {object} routeInfo Route details as defined in the routes.js file
	 * @param {object} parameters Matched route parameters extracted from the URL
	 * @private
	 */
	Application.prototype._handleRouteMatched = function(routeName, routeInfo, parameters) {
		log.info('handle route match', routeName, routeInfo, parameters);
	};

	/**
	 * Called when an URL fails to match any routes.
	 *
	 * @param {string} url Url that failed to match any routes.
	 * @private
	 */
	Application.prototype._handleUrlNotMatched = function(url) {
		log.warn('current url "' + url + '" failed to match any routes');

		navi.go('index');
	};

    return Application;
});