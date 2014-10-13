define([
	'logger',
	'router'
], function(
	logger,
	router
) {
	'use strict';
	
	var log = logger.get('Navi');

	/**
	 * Navigation component.
	 *
	 * @constructor
	 */
	var Navi = function() {};

	/**
	 * Navigates to a path or a route.
	 *
	 * @param {string} routeOrPath Route name or path to navigate to
	 * @param {object} [parameters] Optional map of parameters
	 */
	Navi.prototype.go = function(routeOrPath, parameters) {
		var startingChar = routeOrPath.substr(0, 1);

		if (startingChar === '/' || startingChar === '#') {
			log.info('navigating to path: ' + routeOrPath);

			router.setPath(routeOrPath);
		} else {
			parameters = parameters || {};

			log.info('navigating to route: ' + routeOrPath, parameters);

			router.setRoute(routeOrPath, parameters);
		}
	};

    return new Navi();
});