define([
	'jquery',
	'environment'
], function(
	$,
	environment
) {
	'use strict';
	
	return $.extend(true, {
		debug: false,

		router: {
			defaultRoutePath: '/',
			useHtml5Mode: false
		}
	}, environment);
});