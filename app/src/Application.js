define([
	'logviking/ConsoleLog',
	'logviking/SocketLog',
	'config',
	'stores',
	'routes',
	'activities',
	'logger',
	'navi',
	'router',
	'dispatcher',
	'intent'
], function(
	ConsoleLog,
	SocketLog,
	config,
	stores,
	routes,
	activities,
	logger,
	navi,
	router,
	dispatcher,
	intent
) {
	'use strict';
	
	var log = logger.get('Application');

	/**
	 * Application bootstrapper.
	 *
	 * @constructor
	 */
	var Application = function() {
		// the main components are registered below for debugging on the console, don't rely on them in your app

		/* @type Object */
		this.config = config;

		/* @type Array */
		this.stores = stores;

		/* @type Object */
		this.routes = routes;

		/* @type Object */
		this.activities = activities;

		/* @type Logger */
		this.logger = logger;

		/* @type Navi */
		this.navi = navi;

		/* @type Router */
		this.router = router;

		/* @type Dispatcher */
		this.dispatcher = dispatcher;

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
		this._setupDispatcher();
		this._setupRouter();
	};

	/**
	 * Sets up the logger.
	 *
	 * @private
	 */
	Application.prototype._setupLogger = function() {
		if (config.debug) {
			log.info('setup logger in debug mode');

			logger.addReporters(
				new ConsoleLog(),
				new SocketLog('localhost', 2222)
			);
		} else {
			log.info('disable logger');

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
	 * Sets up the dispatcher.
	 *
	 * @private
	 */
	Application.prototype._setupDispatcher = function() {
		this.dispatcher.init(activities, '#application-wrap');
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
	 * Handles router matched route.
	 *
	 * @param {string} routeName Name of the matched route
	 * @param {object} routeInfo Route details as defined in the routes.js file
	 * @param {object} parameters Matched route parameters extracted from the URL
	 * @private
	 */
	Application.prototype._handleRouteMatched = function(routeName, routeInfo, parameters) {
		log.info('handle route match', routeName, routeInfo, parameters);

		this.dispatcher.dispatch(routeName, routeInfo, parameters);
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