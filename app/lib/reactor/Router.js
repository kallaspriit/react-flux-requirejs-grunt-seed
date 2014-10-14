define([
	'Director',
	'EventEmitter',
	'jquery',
	'logger'
], function(
	Director,
	EventEmitter,
	$,
	logger
) {
	'use strict';
	
	var log = logger.get('Router');

	// based on Director - https://github.com/flatiron/director
	var Router = function() {
		EventEmitter.call(this);

		this._router = null;
		this._routes = {};
		this._config = {
			useHtml5Mode: false
		};
	};

	Router.prototype = Object.create(EventEmitter.prototype);

	Router.Event = Router.prototype.Event = {
		ROUTE_MATCHED: 'ROUTE_MATCHED',
		URL_NOT_MATCHED: 'URL_NOT_MATCHED'
	};
	
	Router.prototype.init = function(routes, config) {
		log.info('init');

		this._routes = routes;

		if (typeof config === 'object' && config !== null) {
			$.extend(this._config, config);
		}

		var configuration = this._getConfiguration(),
			routeHandlers = {},
			routeName,
			route;

		for (routeName in routes) {
			route = routes[routeName];

			routeHandlers[route.path] = this._createRouteHandler(routeName, route);
		}

		this._router = new Director(routeHandlers);
		this._router.configure(configuration);
	};

	Router.prototype.start = function() {
		this._router.init(this._config.defaultRoutePath);
	};

	Router.prototype.isUsingHtml5Mode = function() {
		return this._config.useHtml5Mode;
	};

	Router.prototype.setPath = function(routePath) {
		log.info('setting route path: ' + routePath);

		this._router.setRoute(routePath);
	};

	Router.prototype.setRoute = function(routeName, parameters) {
		var routePath = this.getRoutePath(routeName, parameters);

		log.info('setting route: ' + routeName + ' (' + routePath + ')', parameters);

		this.setPath(routePath);
	};

	Router.prototype.getRoutePath = function(routeName, parameters) {
		if (typeof this._routes[routeName] === 'undefined') {
			throw new Error('Route called "' + routeName + '" not found');
		}

		var routeInfo = this._routes[routeName],
			routePath = routeInfo.path,
			parameterName;

		parameters = parameters || {};

		for (parameterName in parameters) {
			routePath = routePath.replace(':' + parameterName, parameters[parameterName]);
		}

		return routePath;
	};

	Router.prototype._getConfiguration = function() {
		return {
			notfound: this._onUrlNotMatched.bind(this),
			html5history: this._config.useHtml5Mode
		};
	};

	Router.prototype._createRouteHandler = function(routeName, routeInfo) {
		return function() {
			var parameters = Array.prototype.slice.call(arguments, 0);

			log.info('matched route "' + routeName + '"', routeInfo);

			this.emit(this.Event.ROUTE_MATCHED, routeName, routeInfo, parameters);
		}.bind(this);
	};

	Router.prototype._onUrlNotMatched = function() {
		log.warn('current url failed to match any routes');

		this.emit(this.Event.URL_NOT_MATCHED, this._router.getRoute());
	};

    return new Router();
});