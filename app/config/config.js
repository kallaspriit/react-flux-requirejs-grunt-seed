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
			useHtml5Mode: true
		}
	}, environment);
});