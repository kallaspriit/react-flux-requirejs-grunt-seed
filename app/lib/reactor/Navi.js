define([
	'logger',
	'router',
	'intent'
], function(
	logger,
	router,
	intent
) {
	'use strict';
	
	var log = logger.get('Navi');

	/**
	 * Navigation component.
	 *
	 * @constructor
	 */
	var Navi = function() {
		intent.emits(Navi.Action.NAVIGATE_TO_PATH);
	};

	Navi.Action = Navi.prototype.Action = {
		NAVIGATE_TO_PATH: 'NAVIGATE_TO_PATH'
	};

	/**
	 * Navigates to a path or a route.
	 *
	 * @param {string} routeOrPath Route name or path to navigate to
	 * @param {object} [parameters] Optional map of parameters
	 */
	Navi.prototype.go = function(routeOrPath, parameters) {
		var startingChar = routeOrPath.substr(0, 1),
			routePath;

		if (startingChar === '/' || startingChar === '#') {
			routePath = routeOrPath;
		} else {
			parameters = parameters || {};

			routePath = router.getRoutePath(routeOrPath, parameters);
		}

		log.info('navigating to path: ' + routePath);

		intent.emit(Navi.Action.NAVIGATE_TO_PATH, routePath);
	};

    return new Navi();
});