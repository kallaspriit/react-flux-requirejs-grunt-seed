define([
	'logviking/ConsoleLog',
	'logviking/SocketLog',
	'logger',
	'navi',
	'router',
	'dispatcher',
	'intent'
], function(
	ConsoleLog,
	SocketLog,
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
	var Application = function(config, stores, routes, activities) {
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
	 * Initializes the application.
	 *
	 * @returns Application
	 */
	Application.prototype.init = function() {
		log.info('initializing');

		this._setupLogger();
		this._setupDummyData();
		this._setupNavi();
		this._setupDispatcher();
		this._setupRouter();

		return this;
	};

	/**
	 * Bootstraps the application.
	 *
	 * @returns Application
	 */
	Application.prototype.bootstrap = function() {
		log.info('bootstrapping');

		this.router.start();

		return this;
	};

	/**
	 * Sets up the logger.
	 *
	 * @private
	 */
	Application.prototype._setupLogger = function() {
		if (this.config.debug) {
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
		log.info('setup dummy data');

		this.stores.todo.addTodoItem({ text: 'first item ', isDone: true });
		this.stores.todo.addTodoItem({ text: 'second item ' });
		this.stores.todo.addTodoItem({ text: 'third item ' });
	};

	/**
	 * Sets up the navigator.
	 *
	 * @private
	 */
	Application.prototype._setupNavi = function() {
		log.info('setup navigator');

		intent.on(intent.NAVIGATE_TO_PATH, this._handleNavigateToPath.bind(this));
	};

	/**
	 * Sets up the dispatcher.
	 *
	 * @private
	 */
	Application.prototype._setupDispatcher = function() {
		log.info('setup dispatcher');

		this.dispatcher.init(this.activities, '#application-wrap');
	};

	/**
	 * Sets up the router.
	 *
	 * @private
	 */
	Application.prototype._setupRouter = function() {
		log.info('setup router');

		this.router.on(this.router.Event.ROUTE_MATCHED, this._handleRouteMatched.bind(this));
		this.router.on(this.router.Event.URL_NOT_MATCHED, this._handleUrlNotMatched.bind(this));

		this.router.init(this.routes, this.config.router);
	};

	/**
	 * Handles intent to navigate to a path.
	 *
	 * @param {string} path Path to navigate to
	 * @private
	 */
	Application.prototype._handleNavigateToPath = function(path) {
		log.info('handling navigate to path: ' + path);

		this.router.setPath(path);
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
		log.info('handle route match for "' + routeName + '"', routeInfo, parameters);

		//try {
			this.dispatcher.dispatch(routeName, routeInfo, parameters);
		/*} catch (e) {
			log.error('dispatching route "' + routeName + '" failed: ' + e.message);

			if (this.config.debug) {
				throw e;
			} else {
				navi.go('index');
			}
		}*/
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