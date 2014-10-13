define([
	'logger',
	'router'
], function(
	logger,
	router
) {
	'use strict';
	
	var log = logger.get('Navi');

	var Navi = function() {};
	
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