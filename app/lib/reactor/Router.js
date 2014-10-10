define([
	'logger',
	'Director'
], function(logger, Director) {
	'use strict';
	
	var log = logger.get('Router');

	// based on Director - https://github.com/flatiron/director
	var Router = function() {
		this._router = null;
		this._routes = {};
		this._config = {
			useHtml5Mode: true
		}
	};
	
	Router.prototype.init = function(routes, handlerCallback) {
		log.info('init');

		this._routes = routes;

		var configuration = this._getConfiguration(),
			routeHandlers = {},
			routeName,
			route;

		for (routeName in routes) {
			route = routes[routeName];

			routeHandlers[route.path] = this._createRouteHandler(routeName, route, handlerCallback);
		}

		this._router = new Director(routeHandlers);
		this._router.configure(configuration);
		this._router.init();
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

	Router.prototype._createRouteHandler = function(routeName, routeInfo, handlerCallback) {
		return function() {
			var parameters = Array.prototype.slice.call(arguments, 0);

			log.info('matched route "' + routeName + '"', routeInfo);

			if (typeof handlerCallback === 'function') {
				handlerCallback(routeName, routeInfo, parameters);
			}
		}
	};

	Router.prototype._onUrlNotMatched = function() {
		debugger;
	};

    return new Router();
});